import { supportSME } from "../agents/supportSME.js";
import { marketingSME } from "../agents/marketingSME.js";
import { SunCoreState } from "../types/state.js";

export const sunCoreRouter = (params: {
  input: string;
  network: any;
  callCount: number;
  lastResult?: any;
  stack?: any[];
}) => {
  const { callCount, network } = params;

  const stateKv = (network.state && (network.state as any).kv) ? (network.state as any).kv : new Map();

  // Router logic begins here
  if (callCount === 0) {
    // First call: Run Support SME to get NPS data
    return supportSME;
  }

  // After Support SME runs (callCount is 1), it sets npsSummary.
  // Now we need Marketing SME to run.
  // Marketing SME will then call getProductInsights.

  const npsSummary = stateKv.get("npsSummary");
  const topProducts = stateKv.get("topProducts");
  const campaignIdeas = stateKv.get("campaignIdeas"); // Check for final output

  // If NPS summary is present AND campaign ideas are NOT yet present
  // (meaning Marketing SME hasn't completed its job yet)
  if (npsSummary && !campaignIdeas) {
      return marketingSME;
  }

  // If campaign ideas are present, the network is done.
  if (campaignIdeas) {
      console.log("Network completed. Campaign Ideas:", campaignIdeas);
      return undefined; // End the network
  }

  // Fallback to Marketing SME if for some reason we missed the initial trigger,
  // or if NPS summary is not yet present (shouldn't happen with callCount 0 logic)
  // This helps ensure marketing SME always gets a chance if state is not complete.
  if (!npsSummary || !topProducts) {
      return marketingSME;
  }

  // If we reach here, it implies an unexpected state or the network is truly done
  // without the campaignIdeas being explicitly set in the final step.
  // We can choose to return undefined to stop or log a warning.
  console.warn("Router: Unexpected state, ending network.");
  return undefined;
};