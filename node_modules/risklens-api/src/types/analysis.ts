export type AnalysisResult = {
  analysisId: string;
  documentType: string;
  decision: {
    label: string;
    reason: string;
    overallRiskScore: number;
    confidenceScore: number;
    riskLevel: string;
    color: string;
  };
  plainSummary: string[];
  topRedFlags: Array<{
    title: string;
    severity: string;
    whatCanGoWrong: string;
    whatToDoNow: string;
  }>;
  categoryBreakdown: Array<{
    category: string;
    score: number;
    color: string;
    explanation: string;
  }>;
  actionPlan: {
    immediate: string[];
    beforeSigning: string[];
    questionsToAsk: string[];
  };
  disclaimer: string;
};
