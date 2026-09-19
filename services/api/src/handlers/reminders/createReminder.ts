import { Request, Response } from "express";

/**
 * TODO: integrate EventBridge Scheduler + SES.
 */
export async function createReminder(req: Request, res: Response) {
  try {
    const { documentId, remindAt, email, note } = req.body || {};
    if (!documentId || !remindAt || !email) {
      return res.status(400).json({ message: "documentId, remindAt, email required" });
    }
    return res.status(201).json({
      reminderId: `rem_${Date.now()}`,
      documentId,
      remindAt,
      email,
      note: note || "",
      status: "SCHEDULED_STUB"
    });
  } catch (e) {
    return res.status(500).json({ message: "failed to create reminder" });
  }
}
