import { createNetwork, gemini, State } from "@inngest/agent-kit";
import { marketingSME } from "../agents/marketingSME.js";
import { creativeMarketingSME } from "../agents/creativeMarketingSME.js";
import process from "node:process";

export const marketingNetwork = createNetwork({
  name: "marketing-sme-network",
  agents: [marketingSME, creativeMarketingSME],
  defaultModel: gemini({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
  }),
  maxIter: 5,
  defaultState: new State({})
});
