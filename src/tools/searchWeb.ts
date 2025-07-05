import { createTool } from "@inngest/agent-kit";
import { z } from "zod";

export const searchWeb = createTool({
    name: "search_web",
    description: "Searches the web for a given query to find trends and inspiration.",
    parameters: z.object({
      query: z.string().describe("The search query to find information on the web."),
    }),
    handler: async ({ query }, { network, step }) => {
      // In a real-world scenario, you would use a search API like Google or Bing.
      // For this example, we'll return mock data.
      console.log(`Searching web for: ${query}`);
      const mockResults = [
        {
          title: "Top 10 Marketing Trends for 2024",
          link: "https://www.forbes.com/sites/forbesagencycouncil/2024/01/01/top-10-marketing-trends-for-2024/",
          snippet: "Discover the latest marketing trends that are shaping the industry in 2024, including AI-powered personalization, video marketing, and influencer collaborations.",
        },
        {
          title: "Creative Marketing Ideas to Inspire Your Next Campaign",
          link: "https://blog.hubspot.com/marketing/creative-marketing-ideas",
          snippet: "Get inspired with these creative marketing ideas, from guerrilla marketing stunts to interactive social media campaigns.",
        },
      ];
      return { results: mockResults };
    }
  });
