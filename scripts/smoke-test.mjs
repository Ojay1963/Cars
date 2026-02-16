import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { MongoClient } from "mongodb";

const baseMongoUri = process.env.MONGODB_URI;
if (!baseMongoUri) {
  console.error("SMOKE TEST FAILED: MONGODB_URI is required.");
  console.error("Set MONGODB_URI in your environment, then rerun npm run smoke:test.");
  process.exit(1);
}

const port = Number(process.env.SMOKE_PORT || 4510);
const dbName = process.env.SMOKE_DB_NAME || `ojay_smoke_${Date.now()}`;
const adminEmail = process.env.ADMIN_EMAIL || "admin@ojaymotors.ng";
const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
const adminAuthSecret = process.env.ADMIN_AUTH_SECRET || "dev-admin-secret";
const baseUrl = `http://127.0.0.1:${port}`;

const serverProcess = spawn(
  process.execPath,
  ["server/index.js"],
  {
    env: {
      ...process.env,
      PORT: String(port),
      MONGODB_URI: baseMongoUri,
      MONGODB_DB_NAME: dbName,
      ADMIN_EMAIL: adminEmail,
      ADMIN_PASSWORD: adminPassword,
      ADMIN_AUTH_SECRET: adminAuthSecret
    },
    stdio: ["ignore", "pipe", "pipe"]
  }
);

let serverStdErr = "";
serverProcess.stderr.on("data", (chunk) => {
  serverStdErr += chunk.toString();
});

const checks = [];
const recordCheck = (name, pass, details = "") => {
  checks.push({ name, pass, details });
  const mark = pass ? "PASS" : "FAIL";
  console.log(`[${mark}] ${name}${details ? ` - ${details}` : ""}`);
};

async function requestJson(path, { method = "GET", body, token } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  let json = {};
  try {
    json = await response.json();
  } catch {
    json = {};
  }
  return { status: response.status, json };
}

async function waitForServerReady() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await requestJson("/api/health");
      if (response.status === 200) return true;
    } catch {
      // no-op
    }
    await delay(500);
  }
  return false;
}

async function run() {
  const ready = await waitForServerReady();
  if (!ready) {
    recordCheck("server startup", false, "Server did not become ready.");
    throw new Error("Server startup failed.");
  }
  recordCheck("server startup", true);

  const health = await requestJson("/api/health");
  recordCheck("health endpoint", health.status === 200 && health.json.ok === true);

  const pricing = await requestJson("/api/pricing-snapshot");
  recordCheck(
    "public pricing endpoint",
    pricing.status === 200 && Array.isArray(pricing.json.data) && pricing.json.data.length > 0
  );

  const unauthorizedOverview = await requestJson("/api/admin/overview");
  recordCheck("admin endpoint unauthorized without token", unauthorizedOverview.status === 401);

  const badLogin = await requestJson("/api/admin/login", {
    method: "POST",
    body: { email: adminEmail, password: "wrong-password" }
  });
  recordCheck("admin login rejects invalid credentials", badLogin.status === 401);

  const goodLogin = await requestJson("/api/admin/login", {
    method: "POST",
    body: { email: adminEmail, password: adminPassword }
  });
  const token = goodLogin.json.token || "";
  recordCheck("admin login accepts valid credentials", goodLogin.status === 200 && !!token);

  const contactCreate = await requestJson("/api/contact", {
    method: "POST",
    body: {
      firstName: "Smoke",
      lastName: "Tester",
      email: "smoke@example.com",
      subject: "General Inquiry",
      message: "Running smoke test."
    }
  });
  recordCheck("contact submission", contactCreate.status === 201 && contactCreate.json.ok === true);

  const appointmentCreate = await requestJson("/api/appointments", {
    method: "POST",
    body: {
      fullName: "Smoke Tester",
      phone: "08000000000",
      vehicle: "2020 Honda Civic",
      serviceType: "Oil Change",
      preferredDate: "2026-03-01",
      details: "Smoke test booking."
    }
  });
  recordCheck(
    "appointment submission",
    appointmentCreate.status === 201 && appointmentCreate.json.ok === true
  );

  const overview = await requestJson("/api/admin/overview", { token });
  const appointment = overview.json?.appointments?.[0];
  recordCheck(
    "admin overview with token",
    overview.status === 200 &&
      overview.json?.stats?.totalContacts >= 1 &&
      overview.json?.stats?.totalAppointments >= 1
  );

  if (appointment?.id) {
    const patch = await requestJson(`/api/appointments/${appointment.id}`, {
      method: "PATCH",
      token,
      body: { status: "confirmed" }
    });
    recordCheck(
      "appointment status update",
      patch.status === 200 && patch.json?.data?.status === "confirmed"
    );
  } else {
    recordCheck("appointment status update", false, "No appointment found for update.");
  }

  const contactsList = await requestJson("/api/contact", { token });
  recordCheck(
    "admin contact listing",
    contactsList.status === 200 && Array.isArray(contactsList.json.data)
  );
}

async function cleanup() {
  if (!serverProcess.killed) {
    serverProcess.kill("SIGTERM");
  }
  await delay(300);

  try {
    const client = new MongoClient(baseMongoUri);
    await client.connect();
    await client.db(dbName).dropDatabase();
    await client.close();
  } catch {
    // no-op
  }
}

try {
  await run();
} catch (error) {
  console.error("Smoke test execution failed:", error.message);
  if (serverStdErr.trim()) {
    console.error(serverStdErr.trim());
  }
} finally {
  await cleanup();
}

const failed = checks.filter((check) => !check.pass);
console.log(`\nSmoke test summary: ${checks.length - failed.length}/${checks.length} passed.`);
if (failed.length > 0) {
  process.exit(1);
}
