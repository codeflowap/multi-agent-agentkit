import { createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { TomasState } from "../types/state.js";

/**
 * Tool to retrieve mock NPS insight summary for a given month.
 * Wraps logic in step.run() for unique Inngest step IDs, with a check for 'step' existence.
 */
export const getNPSInsights = createTool({
  name: "get_nps_insights",
  description: "Summarize recent NPS data into key sentiments.",
  parameters: z.object({
    month: z.string().describe("Target month for NPS"),
  }),
  handler: async ({ month }, { network, step }) => {
    const mockSummary = `In ${month}, NPS was +45, with praise for fast delivery and complaints about app crashes.`;

    // Add a check to ensure 'step' is defined before using step.run()
    if (step) {
      const summary = await step.run(`get-nps-insights-${month}`, async () => {
        // Ensure network.state is not null/undefined before accessing kv
        if (network?.state) {
          // Cast network.state to any for kv access workaround
          (network.state as any).kv.set("npsSummary", mockSummary);
        }
        return mockSummary; // Return the summary directly
      });
      return summary;
    } else {
      // Fallback if step is undefined (e.g., if tool is called outside Inngest context)
      // This is less likely with AgentKit but handles the TypeScript warning.
      if (network?.state) {
        (network.state as any).kv.set("npsSummary", mockSummary);
      }
      return mockSummary;
    }
  },
});