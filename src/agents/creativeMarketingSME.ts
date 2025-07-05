import { createAgent } from "@inngest/agent-kit";
import { getProductInsights } from "../tools/getProductInsights.js";
import { saveCampaignIdeas } from "../tools/saveCampaignIdeas.js";
import { searchWeb } from "../tools/searchWeb.js";

/**
 * A sophisticated and creative marketing agent that generates innovative campaign ideas.
 */
export const creativeMarketingSME = createAgent({
  name: "Creative Marketing SME",
  description: "Generates innovative and creative marketing campaigns by analyzing trends and product data.",
  system: ({
    network
  }) => {
    const nps = (network?.state as any)?.kv.get("npsSummary");
    const products = (network?.state as any)?.kv.get("topProducts")?.join(", ");

    if (nps && products) {
      return `
        You are a world-class marketing strategist known for your creative and viral campaigns.
        Using this NPS insight: "${nps}" and these top products: ${products},
        1. First, use the 'search_web' tool to research the latest marketing trends for similar products.
        2. Then, devise 3 highly creative and innovative marketing campaigns for July.
        3. Think outside the box. Consider guerrilla marketing, social media challenges, or collaborations with influencers.
        4. Format your final ideas as a JSON array and call the 'save_campaign_ideas' tool with your suggestions.
      `;
    } else {
      return `You are a creative marketing strategist. I need to generate innovative campaign ideas for July.
              First, use the 'get_product_insights' tool to get trending products for 'July'.
              Then, use the 'search_web' tool to research the latest marketing trends.
              Finally, use all this information to suggest 3 creative campaigns and save them with 'save_campaign_ideas'.`;
    }
  },
  tools: [getProductInsights, saveCampaignIdeas, searchWeb],
});
