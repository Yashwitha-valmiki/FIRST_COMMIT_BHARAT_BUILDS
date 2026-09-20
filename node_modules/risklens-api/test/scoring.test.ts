import { describe, it, expect } from "vitest";
import { computeOverallRisk, mapRiskBand } from "../src/domain/scoring/scoreRisk.js";

describe("scoring", () => {
  it("computes within bounds", () => {
    const s = computeOverallRisk({
      FINANCIAL: 80, LEGAL_LIABILITY: 70, EXIT_LOCKIN: 60, PRIVACY_DATA: 40,
      AMBIGUITY: 50, COMPLIANCE_DEADLINE: 40, FRAUD_SUSPICION: 30, JURISDICTION_COMPLEXITY: 20
    });
    expect(s).toBeGreaterThanOrEqual(0);
    expect(s).toBeLessThanOrEqual(100);
  });

  it("maps risk band", () => {
    expect(mapRiskBand(10).label).toBe("SAFE");
    expect(mapRiskBand(90).label).toBe("CRITICAL");
  });
});
