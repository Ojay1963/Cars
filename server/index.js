import http from "node:http";
import crypto from "node:crypto";
import { MongoClient, ObjectId } from "mongodb";
import { pathToFileURL } from "node:url";

const servicePricingSnapshot = [
  { title: "Inspection & Report", min: 20000, max: 35000, note: "Pre-purchase" },
  { title: "Detailing", min: 40000, max: 90000, note: "Interior + exterior" },
  { title: "Brake Service", min: 35000, max: 70000, note: "Per axle" },
  { title: "AC Service", min: 25000, max: 60000, note: "Recharge + check" }
];

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const allowedAppointmentStatuses = ["pending", "confirmed", "completed", "cancelled"];
const authTokenTtlMs = 1000 * 60 * 60 * 12;

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "ojay_motors";
const adminEmail = (process.env.ADMIN_EMAIL || "admin@ojaymotors.ng").trim().toLowerCase();
const adminPassword = (process.env.ADMIN_PASSWORD || "ChangeMe123!").trim();
const adminAuthSecret = (process.env.ADMIN_AUTH_SECRET || "dev-admin-secret").trim();
let mongoClient;
let dbConnectionPromise;

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  res.end(JSON.stringify(payload));
};

const createAuthToken = (email) => {
  const payload = {
    email,
    exp: Date.now() + authTokenTtlMs
  };
  const rawPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", adminAuthSecret)
    .update(rawPayload)
    .digest("base64url");
  return `${rawPayload}.${signature}`;
};

const verifyAuthToken = (token) => {
  if (!token || !token.includes(".")) return null;
  const [rawPayload, signature] = token.split(".");
  const expectedSignature = crypto
    .createHmac("sha256", adminAuthSecret)
    .update(rawPayload)
    .digest("base64url");

  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(Buffer.from(rawPayload, "base64url").toString("utf8"));
    if (!payload?.exp || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};

const getBearerToken = (req) => {
  const authHeader = req.headers.authorization || "";
  const prefix = "Bearer ";
  if (!authHeader.startsWith(prefix)) return "";
  return authHeader.slice(prefix.length).trim();
};

const requireAdmin = (req, res) => {
  const token = getBearerToken(req);
  const payload = verifyAuthToken(token);
  if (!payload || payload.email !== adminEmail) {
    sendJson(res, 401, { error: "Unauthorized." });
    return null;
  }
  return payload;
};

const serializeContact = (record) => ({
  id: record._id.toString(),
  firstName: record.firstName,
  lastName: record.lastName,
  email: record.email,
  subject: record.subject,
  message: record.message,
  createdAt: record.createdAt
});

const serializeAppointment = (record) => ({
  id: record._id.toString(),
  fullName: record.fullName,
  phone: record.phone,
  vehicle: record.vehicle,
  serviceType: record.serviceType,
  preferredDate: record.preferredDate,
  details: record.details,
  status: record.status,
  createdAt: record.createdAt
});

const getCollections = async () => {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!dbConnectionPromise) {
    mongoClient = new MongoClient(mongoUri);
    dbConnectionPromise = mongoClient.connect();
  }

  await dbConnectionPromise;
  const db = mongoClient.db(dbName);
  return {
    contacts: db.collection("contacts"),
    appointments: db.collection("appointments")
  };
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });

export const createServer = () =>
  http.createServer(async (req, res) => {
    const url = new URL(req.url || "/", "http://localhost");
    const { pathname } = url;

    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      });
      res.end();
      return;
    }

    try {
      if (req.method === "GET" && pathname === "/api/health") {
        sendJson(res, 200, {
          ok: true,
          service: "ojay-motors-api",
          db: mongoUri ? "configured" : "missing MONGODB_URI",
          admin: {
            email: adminEmail,
            authSecret: adminAuthSecret === "dev-admin-secret" ? "default" : "configured"
          },
          timestamp: new Date().toISOString()
        });
        return;
      }

      if (req.method === "GET" && pathname === "/api/pricing-snapshot") {
        sendJson(res, 200, { data: servicePricingSnapshot });
        return;
      }

      if (req.method === "GET" && pathname === "/api/appointments") {
        if (!requireAdmin(req, res)) return;
        const { appointments } = await getCollections();
        const limit = Math.min(Number(url.searchParams.get("limit") || 100), 500);
        const records = await appointments
          .find({})
          .sort({ createdAt: -1 })
          .limit(Number.isFinite(limit) ? limit : 100)
          .toArray();
        sendJson(res, 200, { count: records.length, data: records.map(serializeAppointment) });
        return;
      }

      if (req.method === "GET" && pathname === "/api/contact") {
        if (!requireAdmin(req, res)) return;
        const { contacts } = await getCollections();
        const limit = Math.min(Number(url.searchParams.get("limit") || 100), 500);
        const records = await contacts
          .find({})
          .sort({ createdAt: -1 })
          .limit(Number.isFinite(limit) ? limit : 100)
          .toArray();
        sendJson(res, 200, { count: records.length, data: records.map(serializeContact) });
        return;
      }

      if (req.method === "GET" && pathname === "/api/admin/overview") {
        if (!requireAdmin(req, res)) return;
        const { contacts, appointments } = await getCollections();
        const [recentContacts, recentAppointments, contactCount, appointmentCount] =
          await Promise.all([
            contacts.find({}).sort({ createdAt: -1 }).limit(25).toArray(),
            appointments.find({}).sort({ createdAt: -1 }).limit(25).toArray(),
            contacts.countDocuments(),
            appointments.countDocuments()
          ]);
        const pendingCount = await appointments.countDocuments({ status: "pending" });
        sendJson(res, 200, {
          stats: {
            totalContacts: contactCount,
            totalAppointments: appointmentCount,
            pendingAppointments: pendingCount
          },
          contacts: recentContacts.map(serializeContact),
          appointments: recentAppointments.map(serializeAppointment)
        });
        return;
      }

      if (req.method === "POST" && pathname === "/api/admin/login") {
        const body = await parseBody(req);
        const email = (body.email || "").trim().toLowerCase();
        const password = (body.password || "").trim();

        if (!email || !password) {
          sendJson(res, 400, { error: "Email and password are required." });
          return;
        }

        if (email !== adminEmail || password !== adminPassword) {
          sendJson(res, 401, { error: "Invalid admin credentials." });
          return;
        }

        sendJson(res, 200, {
          ok: true,
          token: createAuthToken(email),
          admin: { email }
        });
        return;
      }

      if (req.method === "GET" && pathname === "/api/admin/session") {
        const payload = requireAdmin(req, res);
        if (!payload) return;
        sendJson(res, 200, { ok: true, admin: { email: payload.email } });
        return;
      }

      if (req.method === "POST" && pathname === "/api/contact") {
        const body = await parseBody(req);
        const firstName = (body.firstName || "").trim();
        const lastName = (body.lastName || "").trim();
        const email = (body.email || "").trim();
        const subject = (body.subject || "General Inquiry").trim();
        const message = (body.message || "").trim();

        if (!firstName || !lastName || !email || !message) {
          sendJson(res, 400, { error: "Please complete all required fields." });
          return;
        }

        if (!isEmail(email)) {
          sendJson(res, 400, { error: "Please enter a valid email address." });
          return;
        }

        const record = {
          firstName,
          lastName,
          email,
          subject,
          message,
          createdAt: new Date()
        };
        const { contacts } = await getCollections();
        await contacts.insertOne(record);
        sendJson(res, 201, {
          ok: true,
          message: "Message received. Our team will contact you within 24 hours."
        });
        return;
      }

      if (req.method === "POST" && pathname === "/api/appointments") {
        const body = await parseBody(req);
        const fullName = (body.fullName || "").trim();
        const phone = (body.phone || "").trim();
        const vehicle = (body.vehicle || "").trim();
        const serviceType = (body.serviceType || "").trim();
        const preferredDate = (body.preferredDate || "").trim();
        const details = (body.details || "").trim();

        if (!fullName || !phone || !vehicle || !serviceType || !preferredDate) {
          sendJson(res, 400, { error: "Please fill all required booking fields." });
          return;
        }

        const record = {
          fullName,
          phone,
          vehicle,
          serviceType,
          preferredDate,
          details,
          status: "pending",
          createdAt: new Date()
        };
        const { appointments } = await getCollections();
        await appointments.insertOne(record);
        sendJson(res, 201, {
          ok: true,
          message: "Appointment confirmed. A service advisor will contact you shortly."
        });
        return;
      }

      const appointmentStatusMatch =
        req.method === "PATCH"
          ? pathname.match(/^\/api\/appointments\/([a-fA-F0-9]{24})$/)
          : null;

      if (appointmentStatusMatch) {
        if (!requireAdmin(req, res)) return;
        const { status } = await parseBody(req);
        if (!allowedAppointmentStatuses.includes(status)) {
          sendJson(res, 400, { error: "Invalid appointment status." });
          return;
        }

        const { appointments } = await getCollections();
        const appointmentId = new ObjectId(appointmentStatusMatch[1]);
        const updateResult = await appointments.findOneAndUpdate(
          { _id: appointmentId },
          {
            $set: {
              status,
              updatedAt: new Date()
            }
          },
          { returnDocument: "after" }
        );

        const updatedAppointment = updateResult?.value || updateResult;

        if (!updatedAppointment) {
          sendJson(res, 404, { error: "Appointment not found." });
          return;
        }

        sendJson(res, 200, { ok: true, data: serializeAppointment(updatedAppointment) });
        return;
      }

      sendJson(res, 404, { error: "Route not found." });
    } catch (error) {
      sendJson(res, 500, {
        error: "Server error",
        details: error.message || "Unexpected error"
      });
    }
  });

const isMainModule = () => {
  if (!process.argv[1]) return false;
  return import.meta.url === pathToFileURL(process.argv[1]).href;
};

if (isMainModule()) {
  const port = Number(process.env.PORT || 4000);
  const server = createServer();
  server.listen(port, async () => {
    try {
      await getCollections();
      // eslint-disable-next-line no-console
      console.log(`API server listening on http://localhost:${port}`);
      // eslint-disable-next-line no-console
      console.log(`Connected to MongoDB database "${dbName}".`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`MongoDB connection failed: ${error.message}`);
    }
  });
}
