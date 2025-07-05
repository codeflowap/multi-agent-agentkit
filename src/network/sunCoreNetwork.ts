import { createNetwork, gemini, State } from "@inngest/agent-kit"; // <-- Import State class
import { SunCoreState } from "../types/state.js";
import { marketingSME } from "../agents/marketingSME.js";
import { supportSME } from "../agents/supportSME.js";
import { sunCoreRouter } from "../router/sunCoreRouter.js";
import process from "node:process";

/**
 * Define the SunCore SME network, now using a custom router.
 */
export const sunCoreNetwork = createNetwork({
  name: "sunCore-sme-demo",
  agents: [supportSME, marketingSME],
  defaultModel: gemini({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
  }),
  defaultRouter: sunCoreRouter,
  maxIter: 5,
  defaultState: new State({})
});