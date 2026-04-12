type LeadNotificationPayload = {
  type: "contact" | "inquiry";
  title: string;
  recipient?: string | null;
  metadata: Record<string, string | number | boolean | null | undefined>;
};

export async function sendLeadNotification(payload: LeadNotificationPayload) {
  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      return;
    } catch (error) {
      console.error("Lead webhook notification failed", error);
    }
  }

  console.info("Lead notification", payload);
}
