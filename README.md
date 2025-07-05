SunCore SME AgentKit Prototype
This project is a minimal yet complete prototype demonstrating a collaborative AI agent system built using AgentKit (by Inngest). It showcases how specialized Subject Matter Expert (SME) agents can work together in a shared network, utilizing deterministic routing and stateful tooling to automate complex business requests.

 Prototype Goal
Our primary objective was to simulate SunCore AI's capability to dynamically integrate SME-level assistants for domain-specific tasks. The core use case for this prototype is generating marketing campaign ideas based on customer sentiment (NPS) and product growth data.

 Features
Collaborative AI Agents: Support SME and Marketing SME agents work together.
Stateful Memory: Agents share and update context (NPS insights, product trends) across turns using the network's state.
Deterministic Routing: A custom router controls the flow of execution between agents for predictable workflows.
Simulated Tooling: Agents interact with mocked external data sources (NPS, product insights) and save outputs.
Inngest Integration: Leverages Inngest for robust orchestration, local development tracing, and automatic retries.

📦 Project Structure
src/
├── agents/              # Defines our SME agents (MarketingSME, SupportSME)
├── tools/               # Reusable tools called by agents (getNPSInsights, getProductInsights, saveCampaignIdeas)
├── router/              # Contains the deterministic routing logic (sunCoreRouter)
├── network/             # Configures the AgentKit network (sunCoreNetwork)
├── functions/           # Defines the main Inngest function that triggers the network (sunCoreFunction)
├── types/               # Shared TypeScript types (SunCoreState)
└── server.ts            # Entry point to run the HTTP server
🚀 Getting Started

Follow these steps to set up and run the project locally.

Prerequisites
Node.js (v18 or higher recommended) and npm (usually comes with Node.js).

A Google Cloud API Key with access to the Generative Language API (for Gemini models).


1. Clone the repository and install dependencies
Navigate to your project directory and install the necessary packages.

# Assuming you are in your project's root directory
npm install


2. Configure your API Key
Create a .env file in the root directory of your project (the same level as package.json and .gitignore).

Add your Google Cloud API key to this file:

# .env
GOOGLE_API_KEY=your_google_cloud_api_key_here

Important: Replace your_google_cloud_api_key_here with your actual Google Cloud API Key. Do not wrap the key in quotes.

Ensure your .gitignore file contains a line for .env to prevent committing sensitive information:

# .gitignore
.env


3. Start the development server
Open your terminal or VS Code's integrated terminal, navigate to the project root, and start the Node.js server:

npm run start

You should see output similar to this, indicating the server is running:

✅ Registered function: sunCore-sme-demo/run
🚀 SunCore SME AgentKit running on http://localhost:3000


4. Start the Inngest Dev Server
Open a new terminal window and run the Inngest Dev Server. This tool is essential for triggering your AgentKit function and visualizing its execution trace.

npx inngest-cli@latest dev -u http://localhost:3000/api/inngest

The Dev Server will start, and it will usually open a browser window to http://127.0.0.1:8288.

🧪 Testing the Prototype
Once both your Node.js server and the Inngest Dev Server are running:

Open the Inngest Dev Server dashboard in your browser (http://127.0.0.1:8288).

Navigate to the "Functions" tab.

Locate the function named "SunCore SME Demo Run" and click its "Invoke" button.

In the "Invoke Function" modal, paste the following JSON payload:

{
  "data": {
    "input": "I need help creating campaigns based on NPS and product growth for July"
  }
}


Click the "Invoke function" (or "Run") button.

The function will execute, and you will be redirected to the run's detailed trace view in the Inngest Dev Server.

🧠 Agents
This prototype features two main SME agents:

Support SME: Analyzes Net Promoter Score (NPS) insights to summarize customer sentiment. It uses the get_nps_insights tool.

Marketing SME: Generates marketing campaign ideas by combining NPS insights with top-performing product data. It uses the get_product_insights and save_campaign_ideas tools.

🔧 Tools
Our agents utilize these mock tools to simulate data interaction and output saving:

get_nps_insights – Returns a mock summary of NPS sentiment for a given month.

get_product_insights – Returns a mock list of trending products for a given month.

save_campaign_ideas – Stores the final generated campaign ideas as a JSON string in the network's state.

⚙️ Key Concepts Implemented
Agent Collaboration
Our sunCoreRouter orchestrates the Support SME and Marketing SME agents. The Support SME runs first to provide npsSummary, then the Marketing SME takes over to generate campaigns, demonstrating agents working in concert.

Stateful Tooling & Shared Memory
Agents and tools interact with network.state.kv to share data across the workflow. get_nps_insights and get_product_insights write their respective summaries/lists to this state, which Marketing SME then reads to formulate its campaigns. The save_campaign_ideas tool then stores the final output back into this state.

Deterministic Routing
The sunCoreRouter ensures a predictable flow (Support SME -> Marketing SME -> End), making the AI workflow reliable and easily debuggable. It uses the presence of data in the shared state to decide the next step.

Inngest Integration
Leveraging inngest-cli and the Inngest Dev Server provides a powerful local development experience with live tracing, step-by-step visibility of agent inputs/outputs, and automatic retries.

🛠️ Troubleshooting Common Issues
During development, we encountered and resolved several common issues. Here’s how to address them if they reappear:

You didn't provide an API key / Insufficient Quota (OpenAI/Google Gemini):

Ensure your GOOGLE_API_KEY is correctly set in your project's .env file (no quotes around the value).

Verify that the "Generative Language API" is enabled in your Google Cloud project for the API key being used, and that your account has sufficient quota.

Remember to Ctrl+C and npm run start after any .env changes.

TypeError: Cannot read properties of undefined (related to npsSummary, topProducts, stateData):

This typically means network.state.data was undefined or npsSummary/topProducts were not yet set in network.state.kv.

Verify src/network/sunCoreNetwork.ts initializes defaultState: new State<SunCoreState>({}).

Confirm your tools (getNPSInsights.ts, getProductInsights.ts) are correctly using (network.state as any).kv.set("key", value) to save data.

Ensure your agents (marketingSME.ts) and router (sunCoreRouter.ts) are correctly reading data using (network.state as any).kv.get("key").

TypeError: network.state.kv.entries is not a function:

This is a debug logging issue, not a core functional one. It happens if network.state.kv is a plain object, not a Map. The provided src/router/sunCoreRouter.ts should already have the fix to correctly JSON.stringify a plain object.

⚠️ We detected that you have multiple steps with the same ID. ... Code: AUTOMATIC_PARALLEL_INDEXING:

This is a warning, not a critical error, and your function will still complete.

To improve trace readability, ensure your tool handlers use step.run() with unique IDs. The provided tool files (getNPSInsights.ts, getProductInsights.ts, saveCampaignIdeas.ts) include these updates with dynamic IDs.