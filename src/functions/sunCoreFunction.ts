import { Inngest } from "inngest"; 
import { sunCoreNetwork } from "../network/sunCoreNetwork.js";

// Create an Inngest client instance
export const inngest = new Inngest({ id: "sunCore-sme-demo-app" }); 

/**
 * Defines the triggerable Inngest function for the SunCore SME network.
 * This will respond to POST requests with "name": "sunCore-sme-demo/run"
 */
export const sunCoreFunction = inngest.createFunction( 
  {
    id: "sunCore-sme-demo",
    name: "SunCore SME Demo Run",
  },
  {
    event: "sunCore-sme-demo/run",
  },
  async ({ event }) => {
    const { input } = event.data;
    return sunCoreNetwork.run(input);
  }
);

