import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../lib/awsClients.js";

export async function getUploadUrl(req: Request, res: Response) {
  try {
    const bucket = process.env.DOCUMENT_BUCKET;
    if (!bucket) return res.status(500).json({ message: "DOCUMENT_BUCKET missing" });

    const { fileName, contentType } = req.body || {};
    if (!fileName || !contentType) return res.status(400).json({ message: "fileName and contentType required" });

    const key = `uploads/${Date.now()}-${fileName}`;
    const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
    const uploadUrl = await getSignedUrl(s3, cmd, { expiresIn: 300 });

    res.status(200).json({ uploadUrl, key });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to create upload url" });
  }
}
