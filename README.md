Slack AI Agent

An intelligent Slack bot that automatically researches new community members and analyzes their fit for your commercial product using OpenAI and Langchain.
Features

    Automatic Member Detection: Monitors Slack for new member joins
    AI-Powered Research: Researches members using multiple sources (GitHub, company websites, etc.)
    Intelligent Analysis: Uses GPT-4 to analyze member fit for your product
    Render.com PostgreSQL Database: Saves all analyses before posting to Slack for data persistence and audit trail
    Private Reporting: Sends formatted analysis reports to a private Slack channel
    Comprehensive Logging: Full logging and monitoring for production use
    Easy Deployment: Ready-to-deploy on Render.com

Architecture

┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Slack API     │───▶│  Slack Service   │───▶│ Member Research │
│ (New Members)   │    │  (Event Handler) │    │    Service      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                          │
                                                          ▼
                                                ┌─────────────────┐
                                                │ OpenAI/Langchain│
                                                └────────┬────────┘
                                                         │
                       ┌──────────────────┐              │
                       │  Analysis Report │◀─────────────┘
                       │   Generator      │
                       └───────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐
          │   PostgreSQL    │   │ Private Channel │
          │  (Render.com)   │   │  (Slack Bot)    │
          └─────────────────┘   └─────────────────┘

Prerequisites

    Node.js 18+
    OpenAI API key
    Slack workspace with admin access
    Render.com account (for deployment and database)

Quick Start
1. Clone and Install

git clone <your-repo-url>
cd slack-ai-agent
npm install

2. Set Up Slack App

    Go to Slack API

    Click "Create New App" → "From scratch"

    Enter app name and select your workspace

    Navigate to OAuth & Permissions:
        Add these Bot Token Scopes:
            channels:read
            chat:write
            users:read
            users:read.email
        Install app to workspace
        Copy the Bot User OAuth Token (starts with xoxb-)

    Navigate to Socket Mode:
        Enable Socket Mode
        Create an App-Level Token with connections:write scope
        Copy the App-Level Token (starts with xapp-)

    Navigate to Event Subscriptions:
        Enable Events
        Subscribe to these bot events:
            team_join
            member_joined_channel

    Navigate to Basic Information:
        Copy the Signing Secret

3. Create a PostgreSQL Database on Render

This project uses Render.com PostgreSQL as the database.

    Go to Render.com
    Click "New" → "PostgreSQL"
    Configure the database:
        Name: slack-agent-db
        Database: slack_agent
        User: choose a username
        Region: same region as your web service
        Plan: Free or Starter
    Click "Create Database"
    Once created, go to the Info section and copy the connection details

4. Configure Environment

cp .env.example .env

Edit .env with your values:

# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_APP_TOKEN=xapp-your-app-token-here
SLACK_SIGNING_SECRET=your-signing-secret-here
SLACK_PRIVATE_CHANNEL_ID=C1234567890  # Channel ID where reports are sent

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Database Configuration (from Render.com PostgreSQL)
DATABASE_URL=your-render-external-url

# Company Information
COMPANY_NAME=Your Company Name
COMPANY_PRODUCT=Your Commercial Product Name

5. Find Your Private Channel ID

In Slack:

    Go to your private channel
    Right-click on the channel name → "Copy Link"
    The URL will be like: https://yourworkspace.slack.com/archives/C1234567890
    The C1234567890 part is your channel ID

6. Run Locally

npm run dev

The agent will start and display:

🚀 Express server running on port 3000
⚡️ Slack bot is running on port 3000  
🎉 Slack AI Agent is fully operational!

7. Test the Agent

Method 1: Add a test member to your Slack workspace

Method 2: Use the test endpoint (development only):

curl -X POST http://localhost:3000/test/analyze-member \
  -H "Content-Type: application/json" \
  -d '{
    "memberInfo": {
      "name": "John Doe",
      "email": "john@techcorp.com",
      "title": "Senior Software Engineer at TechCorp"
    }
  }'

Deployment to Render.com
1. Prepare Your Repository

git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main

2. Deploy the Web Service on Render

    Click "New" → "Web Service"
    Connect your GitHub repository
    Render will automatically detect the render.yaml file
    Set your environment variables in the Render dashboard:
        SLACK_BOT_TOKEN
        SLACK_APP_TOKEN
        SLACK_SIGNING_SECRET
        SLACK_PRIVATE_CHANNEL_ID
        OPENAI_API_KEY
        DATABASE_URL (from step 2)
        Update company information variables
    Deploy!

Configuration
Environment Variables
Variable 	Required 	Description
SLACK_BOT_TOKEN 	✅ 	Bot token from Slack app (starts with xoxb-)
SLACK_APP_TOKEN 	✅ 	App-level token for Socket Mode (starts with xapp-)
SLACK_SIGNING_SECRET 	✅ 	Signing secret from Slack app
SLACK_PRIVATE_CHANNEL_ID 	✅ 	Channel ID where reports are sent
OPENAI_API_KEY 	✅ 	OpenAI API key
DATABASE_URL 	✅ 	Render.com PostgreSQL external database url
COMPANY_NAME 	❌ 	Your company name (used in AI analysis prompt)
COMPANY_PRODUCT 	❌ 	Your product name (used in AI analysis prompt)
COMPANY_WEBSITE 	❌ 	Your company website URL
COMPANY_DESCRIPTION 	❌ 	Brief description of your company
NODE_ENV 	❌ 	Set to development to enable debug logging and test endpoint
PORT 	❌ 	Express server port (default 3000)
Analysis Output

When a new member joins, the agent sends a report to your private channel:

🔍 New Member Analysis: John Doe

Fit Score: 75/100
Email: john@techcorp.com
Title: Senior Software Engineer
Timezone: America/New_York

Key Insights:
• Senior engineer with 5+ years experience
• Works at a mid-size tech company
• Active on GitHub with multiple projects
• Located in target market region

Recommendations:  
• Engage with technical content and demos
• Highlight enterprise features and scalability
• Consider direct outreach for pilot program
• Monitor for questions about integrations

Research Sources:
• Company Website: TechCorp Inc.
• GitHub Profile: john-doe

Development
Project Structure

├── index.js         # Main application (SlackAIAgent class)
├── db.js            # PostgreSQL database module
├── .env.example     # Environment variable template
├── render.yaml      # Render.com deployment config
└── package.json

Contributing

    Fork the repository
    Create a feature branch (git checkout -b feature/amazing-feature)
    Commit your changes (git commit -m 'Add amazing feature')
    Push to the branch (git push origin feature/amazing-feature)
    Open a Pull Request

License

This project is licensed under the MIT License - see the LICENSE file for details.
