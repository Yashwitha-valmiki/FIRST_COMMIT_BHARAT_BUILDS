import Ajv from "ajv";
import { analysisResponseSchema } from "../schemas/analysisResponseSchema.js";

const ajv = new Ajv({ allErrors: true, strict: false });
const validateAnalysis = ajv.compile(analysisResponseSchema);

export function assertValidAnalysis(payload: unknown) {
  const ok = validateAnalysis(payload);
  if (!ok) {
    const msg = ajv.errorsText(validateAnalysis.errors);
    throw new Error(`Analysis schema validation failed: ${msg}`);
  }
}
