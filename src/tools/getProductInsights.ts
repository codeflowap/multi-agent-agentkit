import { createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { TomasState } from "../types/state.js"; 

/**
 * Tool to retrieve a mocked list of high-performing products.
 * Wraps logic in step.run() for unique Inngest step IDs, with a check for 'step' existence.
 */
export const getProductInsights = createTool({
  name: "get_product_insights",
  description: "Retrieve top growing products based on revenue.",
  parameters: z.object({
    month: z.string().describe("Month to check product performance"),
  }),
  handler: async ({ month }, { network, step }) => {
    const mockProducts = ["Cold Brew Latte", "Vegan Wrap", "Iced Matcha"];

    // Add a check to ensure 'step' is defined before using step.run()
    if (step) {
      const products = await step.run(`get-product-insights-${month}`, async () => {
        // Ensure network.state is not null/undefined before accessing kv
        if (network?.state) {
          // Cast network.state to any for kv access workaround
          (network.state as any).kv.set("topProducts", mockProducts);
        }
        return mockProducts; // Return the products directly
      });
      return products;
    } else {
      // Fallback if step is undefined
      if (network?.state) {
        (network.state as any).kv.set("topProducts", mockProducts);
      }
      return mockProducts;
    }
  },
});
