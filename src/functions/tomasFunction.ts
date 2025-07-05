import { Inngest } from "inngest"; 
import { tomasNetwork } from "../network/tomasNetwork.js";

// Create an Inngest client instance
export const inngest = new Inngest({ id: "tomas-sme-demo-app" }); 

/**
 * Defines the triggerable Inngest function for the Tomas SME network.
 * This will respond to POST requests with "name": "tomas-sme-demo/run"
 */
export const tomasFunction = inngest.createFunction( 
  {
    id: "tomas-sme-demo",
    name: "Tomas SME Demo Run",
  },
  {
    event: "tomas-sme-demo/run",
  },
  async ({ event }) => {
    const { input } = event.data;
    return tomasNetwork.run(input);
  }
);

