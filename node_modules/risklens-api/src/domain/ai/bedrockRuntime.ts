import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { bedrock } from "../../lib/awsClients.js";
import { config } from "../../lib/config.js";

export async function callBedrock(prompt: string) {
  const body = JSON.stringify({
    inputText: prompt,
    textGenerationConfig: {
      maxTokenCount: 1500,
      temperature: 0.1,
      topP: 0.9
    }
  });

  const cmd = new InvokeModelCommand({
    modelId: config.BEDROCK_MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body
  });

  const out = await bedrock.send(cmd);
  return Buffer.from(out.body).toString("utf-8");
}
