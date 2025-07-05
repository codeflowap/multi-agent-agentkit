import { createAgent } from "@inngest/agent-kit";
import { getProductInsights } from "../tools/getProductInsights.js";
import { saveCampaignIdeas } from "../tools/saveCampaignIdeas.js";
import { searchWeb } from "../tools/searchWeb.js";

/**
 * An expert agent focused on increasing brand awareness through creative strategies.
 */
export const brandAwarenessSME = createAgent({
  name: "Brand Awareness SME",
  description: "Specializes in strategies to boost brand visibility and recognition using data-driven and creative approaches.",
  system: ({ network }) => {
    const nps = (network?.state as any)?.kv.get("npsSummary");
    const products = (network?.state as any)?.kv.get("topProducts")?.join(", ");

    if (nps && products) {
      return `
        You are a renowned brand strategist focused on maximizing brand awareness.
        Using this NPS insight: "${nps}" and these top products: ${products},
        1. Use the 'search_web' tool to find recent successful brand awareness campaigns in similar industries.
        2. Develop 3 unique strategies to increase brand visibility for July, considering social media, partnerships, and experiential marketing.
        3. Format your strategies as a JSON array and call the 'save_campaign_ideas' tool with your suggestions.
      `;
    } else {
      return `You are a brand awareness strategist. I need to generate new strategies to boost brand recognition for July.\nFirst, use the 'get_product_insights' tool to get trending products for 'July'.\nThen, use the 'search_web' tool to research recent brand awareness campaigns.\nFinally, use all this information to suggest 3 creative strategies and save them with 'save_campaign_ideas'.`;
    }
  },
  tools: [getProductInsights, saveCampaignIdeas, searchWeb],
});
