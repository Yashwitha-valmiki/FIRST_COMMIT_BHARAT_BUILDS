import { computeOverallRisk, mapRiskBand } from "../scoring/scoreRisk.js";

export async function runAnalysisPipeline(params: {
  fullText: string;
  userRole: string;
  outputLanguage: string;
}) {
  const t = params.fullText.toLowerCase();

  const categoryScores = {
    FINANCIAL: t.includes("penalty") ? 75 : 30,
    LEGAL_LIABILITY: t.includes("liable") ? 70 : 35,
    EXIT_LOCKIN: t.includes("lock-in") || t.includes("lock in") ? 80 : 25,
    PRIVACY_DATA: t.includes("data") ? 55 : 25,
    AMBIGUITY: 45,
    COMPLIANCE_DEADLINE: t.includes("notice") ? 60 : 35,
    FRAUD_SUSPICION: t.includes("registration fee") ? 75 : 25,
    JURISDICTION_COMPLEXITY: t.includes("jurisdiction") ? 55 : 30
  };

  const overall = computeOverallRisk(categoryScores);
  const band = mapRiskBand(overall);

  return {
    analysisId: "anl_local",
    documentType: "general_agreement",
    decision: {
      label: band.label,
      reason: "Derived from category scoring",
      overallRiskScore: overall,
      confidenceScore: 78,
      riskLevel: band.label,
      color: band.color
    },
    plainSummary: [
      "This document contains terms that may create financial or exit risk.",
      "Review highlighted obligations before signing."
    ],
    topRedFlags: [
      {
        title: "Penalty/lock-in exposure",
        severity: overall > 70 ? "HIGH" : "MEDIUM",
        whatCanGoWrong: "Early exit may trigger financial loss.",
        whatToDoNow: "Request capped penalty and clear termination wording."
      }
    ],
    categoryBreakdown: Object.entries(categoryScores).map(([category, score]) => ({
      category,
      score,
      color: mapRiskBand(score).color,
      explanation: `${category} derived from detected terms`
    })),
    actionPlan: {
      immediate: ["Ask for written clarification of penalty and notice terms."],
      beforeSigning: ["Verify payment terms and timeline."],
      questionsToAsk: ["What exact condition triggers penalty?"]
    },
    disclaimer: "RiskLens provides AI-assisted risk insights and does not constitute legal advice."
  };
}
