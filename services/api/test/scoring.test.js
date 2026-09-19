import assert from "node:assert/strict";
import { computeOverallRisk } from "../dist/domain/scoring/scoreRisk.js";

const score = computeOverallRisk({
  FINANCIAL: 80,
  LEGAL_LIABILITY: 70,
  EXIT_LOCKIN: 60,
  PRIVACY_DATA: 40,
  AMBIGUITY: 50,
  COMPLIANCE_DEADLINE: 45,
  FRAUD_SUSPICION: 30,
  JURISDICTION_COMPLEXITY: 20
});

assert.equal(typeof score, "number");
assert.equal(score >= 0 && score <= 100, true);
console.log("scoring test passed");
