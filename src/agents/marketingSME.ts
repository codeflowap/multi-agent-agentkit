import { createAgent } from "@inngest/agent-kit";
import { TomasState } from "../types/state.js";
import { getProductInsights } from "../tools/getProductInsights.js";
import { saveCampaignIdeas } from "../tools/saveCampaignIdeas.js";

/**
 * Agent responsible for generating campaign strategies using state info from NPS and product tools.
 */
export const marketingSME = createAgent({
  name: "Marketing SME",
  description: "Generates marketing campaigns based on NPS and top product trends.",
  system: ({ network }) => {
    // Read from network.state.kv
    const nps = (network?.state as any)?.kv.get("npsSummary");
    const products = (network?.state as any)?.kv.get("topProducts")?.join(", ");

    // Make the pormpt conditional or ensure defaults if values are missing
    if (nps && products) {
      return `
        You are a marketing strategist. Using this NPS insight: "${nps}" and these top products: ${products},
        suggest 3 campaigns for July. Format as a JSON array. Call the 'save_campaign_ideas' tool with your suggestions.
      `;
    } else {
        // If data is missing, instruct the model to use the tools to get it.
        // This is a fallback if the router logic doesn't ensure order perfectly or data isn't set.
        // In a perfect world, the router ensures order, but the LLM still needs to know its tools.
        return `You are a marketing strategist. I need to generate campaign ideas for July.
                First, use the 'get_product_insights' tool to get trending products for 'July'.
                Then, use the provided NPS insight and the retrieved product data to suggest 3 campaigns.
                Finally, call the 'save_campaign_ideas' tool with your suggestions.`;
    }
  },
  tools: [getProductInsights, saveCampaignIdeas],
});