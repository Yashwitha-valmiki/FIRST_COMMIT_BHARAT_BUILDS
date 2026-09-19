import { computeOverallRisk, mapRiskBand } from "../scoring/scoreRisk.js";
import { askBedrockJSON } from "../ai/bedrockStructured.js";
import { classifyPrompt, clausesPrompt } from "../ai/prompts.js";

type Classify = { docType: string; confidence: number };
type Clause = { clauseType: string; text: string; severity: number; confidence: number };
type ClausesOut = { clauses: Clause[] };

function avgSeverity(clauses: Clause[], types: string[], fallback=25) {
  const c = clauses.filter(x => types.includes(x.clauseType));
  if (!c.length) return fallback;
  return Math.round(c.reduce((a,b)=>a+b.severity,0)/c.length);
}

export async function runAnalysisPipeline(params: { fullText: string; userRole: string; outputLanguage: string; }) {
  const cls = await askBedrockJSON<Classify>(classifyPrompt(params.fullText));
  const cl = await askBedrockJSON<ClausesOut>(clausesPrompt(params.fullText));
  const clauses = cl.clauses || [];

  const categoryScores = {
    FINANCIAL: avgSeverity(clauses, ["payment","penalty"]),
    LEGAL_LIABILITY: avgSeverity(clauses, ["liability"]),
    EXIT_LOCKIN: avgSeverity(clauses, ["lockin","penalty"]),
    PRIVACY_DATA: avgSeverity(clauses, ["privacy"]),
    AMBIGUITY: 40,
    COMPLIANCE_DEADLINE: 45,
    FRAUD_SUSPICION: params.fullText.toLowerCase().includes("registration fee") ? 75 : 25,
    JURISDICTION_COMPLEXITY: avgSeverity(clauses, ["jurisdiction"])
  };

  const overall = computeOverallRisk(categoryScores);
  const band = mapRiskBand(overall);

  return {
    analysisId: `anl_${Date.now()}`,
    documentType: cls.docType || "other",
    decision: {
      label: band.label,
      reason: "Computed from extracted clauses and weighted categories",
      overallRiskScore: overall,
      confidenceScore: Math.max(50, Math.min(95, cls.confidence || 70)),
      riskLevel: band.label,
      color: band.color
    },
    plainSummary: [
      `Detected document type: ${cls.docType || "other"}.`,
      "Review top red flags and action checklist before signing."
    ],
    topRedFlags: clauses
      .sort((a,b)=>b.severity-a.severity)
      .slice(0,3)
      .map(c => ({
        title: `Risky ${c.clauseType} clause`,
        severity: c.severity >= 75 ? "HIGH" : c.severity >= 45 ? "MEDIUM" : "LOW",
        whatCanGoWrong: c.text,
        whatToDoNow: "Request written clarification and revised language."
      })),
    categoryBreakdown: Object.entries(categoryScores).map(([category, score]) => ({
      category, score, color: mapRiskBand(score).color, explanation: `${category} risk from clause signals`
    })),
    actionPlan: {
      immediate: ["Identify penalty, liability, and termination terms."],
      beforeSigning: ["Negotiate risky clauses and document all commitments."],
      questionsToAsk: ["Can you cap penalties and simplify exit terms?"]
    },
    disclaimer: "RiskLens provides AI-assisted risk insights and does not constitute legal advice."
  };
}
