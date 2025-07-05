import { createNetwork, gemini, State } from "@inngest/agent-kit"; // <-- Import State class
import { TomasState } from "../types/state.js";
import { marketingSME } from "../agents/marketingSME.js";
import { supportSME } from "../agents/supportSME.js";
import { tomasRouter } from "../router/tomasRouter.js";
import process from "node:process";

/**
 * Define the Tomas SME network, now using a custom router.
 */
export const tomasNetwork = createNetwork({
  name: "tomas-sme-demo",
  agents: [supportSME, marketingSME],
  defaultModel: gemini({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
  }),
  defaultRouter: tomasRouter,
  maxIter: 5,
  defaultState: new State({})
});