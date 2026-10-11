# 🤖 Slack AI Agent

### Turn Slack Community Joins into Intelligent Business Insights

An AI-powered Slack bot that automatically researches new community members, evaluates their potential fit for your product, and delivers actionable insights directly to a private Slack channel.

Built with **Node.js, Slack API, OpenAI, LangChain, and PostgreSQL**, this agent automates member research and helps teams identify relevant connections more efficiently.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js 18+"/>
  <img src="https://img.shields.io/badge/Slack-API-4A154B?style=for-the-badge&logo=slack&logoColor=white" alt="Slack API"/>
  <img src="https://img.shields.io/badge/OpenAI-Powered-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI"/>
  <img src="https://img.shields.io/badge/LangChain-Integration-1C3C3C?style=for-the-badge" alt="LangChain"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Deployment-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" alt="Render"/>
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **Automatic Member Detection** | Detects new workspace members through Slack events. |
| 🔎 **AI-Powered Research** | Collects relevant professional information from available sources, such as GitHub and company websites. |
| 🧠 **Intelligent Fit Analysis** | Uses an OpenAI-powered analysis workflow to evaluate potential alignment with your product. |
| 📊 **Actionable Insights** | Generates fit scores, key findings, and suggested engagement strategies. |
| 💾 **Persistent Storage** | Saves analysis results in PostgreSQL for historical tracking and auditing. |
| 🔒 **Private Reporting** | Sends structured reports to a designated private Slack channel. |
| 📝 **Production Logging** | Provides application logs for debugging and operational monitoring. |
| 🚀 **Cloud Deployment** | Includes Render deployment configuration for hosting the service. |

## 🏗️ Architecture

The agent connects Slack events to an automated research and analysis pipeline, then persists the results before publishing a report.

```mermaid
flowchart TD
    A["👤 New Slack Member"] --> B["⚡ Slack Events API"]
    B --> C["🤖 Slack Event Handler"]
    C --> D["🔎 Member Research Service"]
    D --> E["🧠 OpenAI + LangChain"]
    E --> F["📊 Analysis Report Generator"]
    F --> G[("🐘 PostgreSQL")]
    G --> H["🔒 Private Slack Channel"]

    style A fill:#4A154B,color:#fff,stroke:#4A154B
    style E fill:#412991,color:#fff,stroke:#412991
    style G fill:#4169E1,color:#fff,stroke:#4169E1
    style H fill:#2D9B68,color:#fff,stroke:#2D9B68
```

### 🔄 How It Works

1. **Detect** — The bot receives an event when a new member joins the workspace or a channel.
2. **Research** — The application gathers available professional information from configured sources.
3. **Analyze** — The AI evaluates the collected information against your company's product and target audience.
4. **Generate** — A structured report summarizes the findings and potential engagement opportunities.
5. **Persist** — The analysis is saved to PostgreSQL before the report is published.
6. **Report** — The bot posts the results to your designated private Slack channel.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Application runtime |
| **Express.js** | HTTP server and application endpoints |
| **Slack API** | Workspace integration and event handling |
| **OpenAI API** | AI-powered member analysis |
| **LangChain** | AI workflow orchestration |
| **PostgreSQL** | Persistent analysis storage |
| **Render** | Application hosting and managed database |

## 📋 Prerequisites

Before getting started, make sure you have:

- [Node.js 18+](https://nodejs.org/)
- npm
- A [Slack workspace](https://slack.com/) where you can install an application
- A [Slack API application](https://api.slack.com/apps)
- An [OpenAI API key](https://platform.openai.com/api-keys)
- A [Render account](https://render.com/) for cloud deployment and PostgreSQL

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd slack-ai-agent
npm install
```

### 2. Create Your Slack App

Open the [Slack API dashboard](https://api.slack.com/apps).

1. Click **Create New App → From scratch**.
2. Choose an application name and select your workspace.
3. Open **OAuth & Permissions** and configure the following bot token scopes:

   | Scope | Purpose |
   |---|---|
   | `channels:read` | Read public channel information |
   | `chat:write` | Publish analysis reports |
   | `users:read` | Access member information |
   | `users:read.email` | Access member email addresses when available and authorized |

4. Install the application in your workspace and copy the **Bot User OAuth Token** (`xoxb-...`).

5. Open **Socket Mode**, enable it, and create an app-level token with the `connections:write` scope. Copy the token (`xapp-...`).

6. Open **Event Subscriptions**, enable events, and subscribe to:

   - `team_join`
   - `member_joined_channel`

7. Open **Basic Information** and copy the application's signing secret.

> **Note:** Configure the necessary event subscriptions and permissions for the events you intend to handle. Workspace administration policies may affect installation and access.

### 3. Create a PostgreSQL Database

Create a database through [Render](https://render.com/).

1. Select **New → PostgreSQL**.
2. Choose a database name, such as `slack-agent-db`.
3. Set the database name to `slack_agent`, if desired.
4. Select a region close to your application service.
5. Create the database.
6. Copy the appropriate database connection URL from the database dashboard.

Keep your database credentials private. For a deployed service, prefer the internal database URL when the application and database are in the same Render region.

### 4. Configure Environment Variables

Create your local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, if needed:

```powershell
Copy-Item .env.example .env
```

Add your configuration to `.env`:

```dotenv
# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_PRIVATE_CHANNEL_ID=C1234567890

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# PostgreSQL Configuration
DATABASE_URL=your-postgresql-connection-url

# Company Configuration
COMPANY_NAME=Your Company
COMPANY_PRODUCT=Your Product
COMPANY_WEBSITE=https://example.com
COMPANY_DESCRIPTION=Describe your product and target audience

# Application Configuration
NODE_ENV=development
PORT=3000
```

**Security checklist**

- Never commit `.env` to Git.
- Add `.env` to `.gitignore`.
- Keep API keys, Slack tokens, and database credentials out of source code.
- Configure production secrets through the Render dashboard.
- Rotate any credentials that have been exposed.

### 5. Find Your Private Slack Channel ID

1. Open the private channel where you want reports delivered.
2. Copy the channel link.
3. Find the channel identifier in the URL.

Example:

```text
https://yourworkspace.slack.com/archives/C1234567890
```

Set the identifier in your environment:

```dotenv
SLACK_PRIVATE_CHANNEL_ID=C1234567890
```

Ensure the bot has been invited to the private channel and has the required permissions to post messages.

### 6. Start the Application

Run the development server:

```bash
npm run dev
```

If your project uses a different start script, check the `scripts` section in `package.json`.

When startup succeeds, you should see logs similar to:

```text
🚀 Express server running on port 3000
⚡️ Slack bot is running
🎉 Slack AI Agent is fully operational!
```

Your bot is now ready to process supported Slack events.

### 7. Test the Agent

**Option A — Test with a Slack event**

Add a test member to your workspace or use an appropriate test account, then verify that the application receives and processes the event.

**Option B — Use the development test endpoint**

If your application implements the `/test/analyze-member` endpoint, you can test it with PowerShell:

```powershell
$body = @{
    memberInfo = @{
        name  = "John Doe"
        email = "john@techcorp.com"
        title = "Senior Software Engineer at TechCorp"
    }
} | ConvertTo-Json -Depth 5

Invoke-RestMethod `
    -Uri "http://localhost:3000/test/analyze-member" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

> **Important:** Keep test endpoints disabled or properly protected in production. The example above tests the endpoint only; successful analysis depends on your application's implementation, valid credentials, and available research sources.

## ☁️ Deploy to Render

### 1. Push Your Code to GitHub

If your repository is not already connected to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"

git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

If the repository already exists, commit and push your changes instead.

### 2. Create the Web Service

1. Open [Render Dashboard](https://dashboard.render.com/).
2. Select **New → Web Service**.
3. Connect your GitHub repository.
4. Configure the build and start commands according to your `package.json` and `render.yaml`.
5. Add your environment variables in the Render dashboard.
6. Deploy the service.

### 3. Configure Production Variables

Set the following values in the service environment:

- `SLACK_BOT_TOKEN`
- `SLACK_APP_TOKEN`
- `SLACK_SIGNING_SECRET`
- `SLACK_PRIVATE_CHANNEL_ID`
- `OPENAI_API_KEY`
- `DATABASE_URL`
- `COMPANY_NAME`
- `COMPANY_PRODUCT`
- `COMPANY_WEBSITE`
- `COMPANY_DESCRIPTION`
- `NODE_ENV=production`

Make sure the database URL points to your Render PostgreSQL instance and that your application initializes the required database schema.

### 4. Verify the Deployment

After deployment:

- Check the service logs for startup errors.
- Verify that the PostgreSQL connection succeeds.
- Confirm that the bot can connect to Slack.
- Trigger a test event.
- Confirm that the analysis is saved before the report is published.

## ⚙️ Configuration Reference

| Variable | Required | Description |
|---|:---:|---|
| `SLACK_BOT_TOKEN` | ✅ | Slack bot OAuth token (`xoxb-...`) |
| `SLACK_APP_TOKEN` | ✅ | App-level token for Socket Mode (`xapp-...`) |
| `SLACK_SIGNING_SECRET` | ✅ | Slack application signing secret |
| `SLACK_PRIVATE_CHANNEL_ID` | ✅ | Destination channel for analysis reports |
| `OPENAI_API_KEY` | ✅ | API key for OpenAI |
| `DATABASE_URL` | ✅ | PostgreSQL connection URL |
| `COMPANY_NAME` | — | Company name used in the analysis prompt |
| `COMPANY_PRODUCT` | — | Product name used in the analysis prompt |
| `COMPANY_WEBSITE` | — | Company website |
| `COMPANY_DESCRIPTION` | — | Company and product description |
| `NODE_ENV` | — | Application environment |
| `PORT` | — | HTTP server port; defaults to `3000` if configured that way |

## 📊 Example Analysis Report

The following is an illustrative example of the type of report the agent can generate. Actual output depends on the implementation and available research data.

```text
🔍 NEW MEMBER ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━

👤 Member: John Doe
💼 Role: Senior Software Engineer
📧 Email: john@techcorp.com

📈 PRODUCT FIT
Fit Score: 75/100

💡 KEY INSIGHTS
• Professional background in software engineering
• Potential interest in developer-focused products
• Further qualification may be needed

🎯 SUGGESTED NEXT STEPS
• Share relevant technical documentation
• Highlight product integrations and capabilities
• Offer a product demo if appropriate
• Validate interest before pursuing direct outreach

🔎 RESEARCH SOURCES
• Company website, if available
• GitHub profile, if available

━━━━━━━━━━━━━━━━━━━━━━
Generated by Slack AI Agent 🤖
```

Fit scores and professional insights should be treated as preliminary decision-support signals, not verified facts. Use relevant, publicly available professional information, and avoid inferring sensitive personal characteristics.

## 📁 Project Structure

```text
slack-ai-agent/
├── index.js          # Main application and SlackAIAgent class
├── db.js             # PostgreSQL database operations
├── .env.example      # Environment variable template
├── render.yaml       # Render deployment configuration
├── package.json      # Dependencies and npm scripts
├── package-lock.json # Dependency lockfile
└── README.md         # Project documentation
```

*The structure above reflects the documented project layout; additional files may exist in your repository.*

## 🧑‍💻 Development

### Useful Commands

| Command | Purpose |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server, if configured |
| `npm start` | Start the application, if configured |
| `npm test` | Run tests, if configured |

Use the scripts actually defined in your `package.json`.

### Troubleshooting

**Slack events are not being received**
- Check that Socket Mode is enabled.
- Verify the app-level token and `connections:write` scope.
- Confirm that the required event subscriptions are configured.
- Check the application logs for connection errors.

**The bot cannot post to the private channel**
- Invite the bot to the channel.
- Verify the channel ID.
- Check the bot's OAuth scopes and message permissions.

**Database connection fails**
- Verify `DATABASE_URL`.
- Confirm that the database is running.
- Check network access and the database connection settings.
- Ensure the database schema has been initialized.

**AI analysis fails**
- Verify `OPENAI_API_KEY`.
- Check API access, model configuration, and usage limits.
- Review the logs for errors in the research or analysis pipeline.
- Confirm that the analysis service returns the data structure expected by the report generator.

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome!

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add amazing feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature/amazing-feature
   ```

5. Open a Pull Request with a clear description of your changes.

## 🔐 Privacy & Security

Because this project processes Slack member information:

- Collect only the information necessary for the intended purpose.
- Respect workspace policies and applicable privacy requirements.
- Protect database records and application secrets.
- Restrict access to private analysis reports.
- Provide a way to correct or delete stored records when appropriate.
- Avoid making consequential decisions solely on the basis of automated fit scores.

## 📄 License

This project is licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for details.

---

<p align="center">
  <b>Built to make community intelligence smarter. 🚀</b>
  <br/>
  <sub>Automate research. Discover opportunities. Make better-informed connections.</sub>
</p>
