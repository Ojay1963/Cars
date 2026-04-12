import { useEffect, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import { getJson, patchJson, postJson } from "../utils/api.js";

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];
const adminTokenStorageKey = "ojay_admin_token";

const formatDateTime = (value) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short"
  });
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(adminTokenStorageKey) || "");
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [overview, setOverview] = useState({
    stats: {
      totalContacts: 0,
      totalAppointments: 0,
      pendingAppointments: 0
    },
    contacts: [],
    appointments: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [savingId, setSavingId] = useState("");

  const loadOverview = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getJson("/api/admin/overview", { token });
      setOverview(data);
      setStatusMessage("");
    } catch (error) {
      if (error.status === 401) {
        setToken("");
        localStorage.removeItem(adminTokenStorageKey);
        setStatusMessage("Session expired. Please log in again.");
        return;
      }
      setStatusMessage(error.message || "Failed to load admin data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleCredentialChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!credentials.email || !credentials.password) {
      setStatusMessage("Enter admin email and password.");
      return;
    }

    try {
      setIsLoggingIn(true);
      setStatusMessage("");
      const data = await postJson("/api/admin/login", credentials);
      localStorage.setItem(adminTokenStorageKey, data.token);
      setToken(data.token);
      setCredentials({ email: "", password: "" });
      setStatusMessage("Logged in.");
    } catch (error) {
      setStatusMessage(error.message || "Login failed.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(adminTokenStorageKey);
    setToken("");
    setOverview({
      stats: {
        totalContacts: 0,
        totalAppointments: 0,
        pendingAppointments: 0
      },
      contacts: [],
      appointments: []
    });
    setStatusMessage("Logged out.");
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      setSavingId(appointmentId);
      setStatusMessage("");
      await patchJson(`/api/appointments/${appointmentId}`, { status }, { token });
      setOverview((prev) => {
        const updatedAppointments = prev.appointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status } : appointment
        );
        const pendingAppointments = updatedAppointments.filter(
          (appointment) => appointment.status === "pending"
        ).length;
        return {
          ...prev,
          stats: {
            ...prev.stats,
            pendingAppointments
          },
          appointments: updatedAppointments
        };
      });
      setStatusMessage("Appointment status updated.");
    } catch (error) {
      setStatusMessage(error.message || "Failed to update status.");
    } finally {
      setSavingId("");
    }
  };

  if (!token) {
    return (
      <section className="section admin-page">
        <div className="container">
          <div className="admin-login-card">
            <SectionHeading
              eyebrow="Admin"
              title="Secure dashboard access"
              description="Log in to review leads, appointment requests, and the latest contact activity."
            />
            <form className="admin-login-form" onSubmit={handleLogin}>
              <label>
                Admin Email
                <input
                  type="email"
                  name="email"
                  placeholder="admin@ojaymotors.ng"
                  value={credentials.email}
                  onChange={handleCredentialChange}
                />
              </label>
              <label>
                Password
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={handleCredentialChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M1.5 12s3.8-6 10.5-6 10.5 6 10.5 6-3.8 6-10.5 6S1.5 12 1.5 12Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      {!showPassword ? null : (
                        <path
                          d="M4 20 20 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </label>
              <button
                type="submit"
                className="button button-primary button-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </button>
            </form>
            {statusMessage ? <p className="admin-status">{statusMessage}</p> : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section admin-page">
      <div className="container">
        <div className="section-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Monitor inbound messages and service bookings in one cleaner workspace.</p>
          </div>
          <div className="admin-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={loadOverview}
              disabled={isLoading}
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
            <button type="button" className="button button-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {statusMessage ? <p className="admin-status">{statusMessage}</p> : null}

        <div className="admin-stats-grid">
          <article className="admin-stat-card">
            <span>Total Contacts</span>
            <strong>{overview.stats.totalContacts}</strong>
          </article>
          <article className="admin-stat-card">
            <span>Total Appointments</span>
            <strong>{overview.stats.totalAppointments}</strong>
          </article>
          <article className="admin-stat-card">
            <span>Pending Appointments</span>
            <strong>{overview.stats.pendingAppointments}</strong>
          </article>
        </div>

        <div className="admin-grid">
          <section className="admin-card">
            <h2>Recent Contact Messages</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.contacts.length === 0 ? (
                    <tr>
                      <td colSpan={5}>No contact messages yet.</td>
                    </tr>
                  ) : (
                    overview.contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>{contact.firstName} {contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>{contact.subject}</td>
                        <td>{contact.message}</td>
                        <td>{formatDateTime(contact.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="admin-card">
            <h2>Recent Appointments</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Vehicle</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {overview.appointments.length === 0 ? (
                    <tr>
                      <td colSpan={6}>No appointments yet.</td>
                    </tr>
                  ) : (
                    overview.appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.fullName}</td>
                        <td>{appointment.phone}</td>
                        <td>{appointment.vehicle}</td>
                        <td>{appointment.serviceType}</td>
                        <td>{appointment.preferredDate}</td>
                        <td>
                          <select
                            value={appointment.status}
                            onChange={(event) =>
                              handleStatusChange(appointment.id, event.target.value)
                            }
                            disabled={savingId === appointment.id}
                          >
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
