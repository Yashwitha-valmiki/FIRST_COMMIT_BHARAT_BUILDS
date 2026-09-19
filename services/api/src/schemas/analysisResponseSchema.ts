export const analysisResponseSchema = {
  type: "object",
  required: ["analysisId","documentType","decision","topRedFlags","categoryBreakdown","actionPlan","disclaimer"],
  properties: {
    analysisId: { type: "string" },
    documentType: { type: "string" },
    decision: {
      type: "object",
      required: ["label","reason","overallRiskScore","confidenceScore","riskLevel","color"],
      properties: {
        label: { type: "string" },
        reason: { type: "string" },
        overallRiskScore: { type: "number", minimum: 0, maximum: 100 },
        confidenceScore: { type: "number", minimum: 0, maximum: 100 },
        riskLevel: { type: "string" },
        color: { type: "string" }
      }
    },
    topRedFlags: { type: "array", items: { type: "object" } },
    categoryBreakdown: { type: "array", items: { type: "object" } },
    actionPlan: {
      type: "object",
      required: ["immediate","beforeSigning","questionsToAsk"],
      properties: {
        immediate: { type: "array", items: { type: "string" } },
        beforeSigning: { type: "array", items: { type: "string" } },
        questionsToAsk: { type: "array", items: { type: "string" } }
      }
    },
    disclaimer: { type: "string" }
  }
} as const;
