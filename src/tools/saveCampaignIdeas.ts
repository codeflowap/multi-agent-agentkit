// src/tools/saveCampaignIdeas.ts
import { createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { SunCoreState } from "../types/state.js"; // Keep SunCoreState for type inference

/**
 * Tool for saving the final output of marketing campaign ideas.
 * Wraps logic in step.run() for unique Inngest step IDs, with a check for 'step' existence.
 */
export const saveCampaignIdeas = createTool({
  name: "save_campaign_ideas",
  description: "Store final campaign suggestions.",
  parameters: z.object({
    ideas: z.string().describe("Campaign ideas JSON"),
  }),
  handler: async ({ ideas }, { network, step }) => {
    // Add a check to ensure 'step' is defined before using step.run()
    if (step) {
      await step.run("save-final-campaign-ideas", async () => {
        // Ensure network.state is not null/undefined before accessing kv
        if (network?.state) {
          // Cast network.state to any for kv access workaround
          (network.state as any).kv.set("campaignIdeas", ideas);
        }
      });
    } else {
      // Fallback if step is undefined
      if (network?.state) {
        (network.state as any).kv.set("campaignIdeas", ideas);
      }
    }
    return "Campaigns saved."; // This is the return value of the tool handler
  },
});
