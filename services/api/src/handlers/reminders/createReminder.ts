import { Request, Response } from "express";
import { createOneTimeReminder } from "../../domain/reminders/scheduler.js";

export async function createReminder(req: Request, res: Response) {
  try {
    const { documentId, remindAt, email, note } = req.body || {};
    if (!documentId || !remindAt || !email) {
      return res.status(400).json({ message: "documentId, remindAt, email required" });
    }

    const targetArn = process.env.REMINDER_TARGET_ARN;
    const roleArn = process.env.SCHEDULER_ROLE_ARN;
    if (!targetArn || !roleArn) {
      return res.status(500).json({ message: "Reminder infra env missing" });
    }

    const scheduleName = `risklens-rem-${documentId}-${Date.now()}`;
    await createOneTimeReminder({
      scheduleName,
      atIso: new Date(remindAt).toISOString(),
      targetArn,
      roleArn,
      payload: { documentId, email, note: note || "" }
    });

    return res.status(201).json({ reminderId: scheduleName, status: "SCHEDULED" });
  } catch (e:any) {
    console.error(e);
    return res.status(500).json({ message: e?.message || "failed to create reminder" });
  }
}
