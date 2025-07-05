import { createAgent } from "@inngest/agent-kit";
import { TomasState } from "../types/state.js";
import { getNPSInsights } from "../tools/getNPSInsights.js";

/**
 * Agent responsible for analyzing NPS data and extracting sentiment insights.
 */
export const supportSME = createAgent({
  name: "Support SME",
  description: "Analyzes NPS data to extract customer sentiment.",
  system: ({ network }) => {
    // Modify system prompt to instruct the agent to use the tool
    return `You are a customer support SME. Your task is to analyze NPS data.
            Please use the 'get_nps_insights' tool to retrieve NPS data for the month of 'July'
            and then describe key customer sentiment issues or praise based on that data.
            Ensure you call the tool and incorporate its output into your response.`;
  },
  tools: [getNPSInsights],
});