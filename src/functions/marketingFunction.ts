import { inngest } from "./sunCoreFunction.js";
import { marketingNetwork } from "../network/marketingNetwork.js";

export const marketingFunction = inngest.createFunction(
  {
    id: "marketing-sme-run",
    name: "Marketing SME Run",
  },
  {
    event: "marketing-sme/run",
  },
  async ({ event }) => {
    const { input } = event.data;
    return marketingNetwork.run(input);
  }
);
