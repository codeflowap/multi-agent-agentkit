import 'dotenv/config'; 
import { createServer } from "@inngest/agent-kit/server";
import { inngest, tomasFunction } from "./functions/tomasFunction.js";
import { marketingFunction } from "./functions/marketingFunction.js";
import { IncomingMessage, ServerResponse } from "http";

const server = createServer({
  functions: [tomasFunction, marketingFunction], // Register the function triggers
});

console.log("✅ Registered function: tomas-sme-demo/run");
console.log("✅ Registered function: marketing-sme/run");

const originalHandler = (server as any).handler;

/**
 * Override the server handler to manage custom API routes.
 */
(server as any).handler = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  /**
   * Handle POST requests to trigger the Tomas SME Demo function.
   */
  if (req.method === "POST" && req.url === "/api/run") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const parsedBody = body ? JSON.parse(body) : {};
        // Send the event to Inngest
        await inngest.send({
          name: "tomas-sme-demo/run",
          data: {
            input: parsedBody.input,
          },
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Event sent successfully" }));
      } catch (error) {
        console.error("Failed to send event:", error);
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Failed to send event", error: message }));
      }
    });
    return;
  }

  /**
   * Handle POST requests to trigger the Marketing SME function.
   */
  if (req.method === "POST" && req.url === "/api/run-marketing") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const parsedBody = body ? JSON.parse(body) : {};
        // Send the event to Inngest
        await inngest.send({
          name: "marketing-sme/run",
          data: {
            input: parsedBody.input,
          },
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Marketing event sent successfully" }));
      } catch (error) {
        console.error("Failed to send marketing event:", error);
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Failed to send marketing event", error: message }));
      }
    });
    return;
  }

  /**
   * Log incoming Inngest payloads for debugging purposes.
   */
  if (req.method === "POST" && req.url?.startsWith("/api/inngest")) {
    let body = "";
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        console.log("📩 Incoming POST /api/inngest:");
        console.log(JSON.stringify(parsed, null, 2));
      } catch {
        console.warn("⚠️ Failed to parse JSON body.");
      }
    });
  }

  // Pass through to the original server handler for unhandled requests
  return originalHandler(req, res);
};

server.listen(3000, () => {
  console.log("🚀 Tomas SME AgentKit running on http://localhost:3000");
});