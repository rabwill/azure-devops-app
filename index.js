// Import required packages
const restify = require("restify");
// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const {
  CloudAdapter,
  ConfigurationServiceClientCredentialFactory,
  ConfigurationBotFrameworkAuthentication,
  MemoryStorage
} = require("botbuilder");
const config = require("./config");
// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
  MicrosoftAppId: config.botId,
  MicrosoftAppPassword: config.botPassword,
  MicrosoftAppType: "MultiTenant",
});

const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
  {},
  credentialsFactory
);

const adapter = new CloudAdapter(botFrameworkAuthentication);

adapter.onTurnError = async (context, error) => {
  // This check writes out errors to console log .vs. app insights.
  // NOTE: In production environment, you should consider logging this to Azure
  //       application insights. See https://aka.ms/bottelemetry for telemetry
  //       configuration instructions.
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  // Send a message to the user
  await context.sendActivity(`The bot encountered an unhandled error:\n ${error.message}`);
  await context.sendActivity("To continue to run this bot, please fix the bot source code.");
};

// Create HTTP server.
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log(`\nBot started, ${server.name} listening to ${server.url}`);
});


const { Application, DefaultPromptManager, AzureOpenAIPlanner, AdaptiveCards } = require("@microsoft/teams-ai");
const path = require("path");

// Create AI components
const planner = new AzureOpenAIPlanner({
  apiKey: config.openAIKey,
    endpoint: config.openAIEndpoint,
    apiVersion:'2023-03-15-preview',
    defaultModel: 'gpt-35-turbo',
    logRequests: true,
    useSystemMessage: true
});
const promptManager = new DefaultPromptManager(path.join(__dirname, './prompts'));
// Define storage and application
const storage = new MemoryStorage();
const app = new Application({
    storage,
    ai:{
      planner,
      promptManager,
      prompt: 'generate'
    }
});

const devopsME = require("./devopsME");

app.messageExtensions.query("searchQuery", devopsME.query);

app.messageExtensions.selectItem((context, state, item) => {
  return devopsME.selectItem(context, item);
});

app.taskModules.fetch("taskFetch", (context, state, data) => {
    return devopsME.taskModuleFetch(context, data);
});

app.taskModules.submit("taskSubmit", (context, state, data) => {
    return devopsME.taskModuleSubmit(context, data);
});

app.messageExtensions.fetchTask("createWorkItem", (context, state) => {
  return devopsME.fetchTask(context, context.activity.value);
});

app.messageExtensions.submitAction("createWorkItem", (context, state, data) => {
  switch (data.verb) {
    case "createWorkItem":
      return devopsME.submitAction(context, data);
    case "generateDescription":
      return generate(context, state, data);
    default:
      return Promise.resolve();
  }
});

app.messageExtensions.queryLink((context, state, url) => {
  return devopsME.linkQuery(context, url);
});

async function generate(context, state, data) {
  const response = await app.ai.completePrompt(data.title, state, "generate").then((response) => {
  data.description = response; 
  return devopsME.fetchDescription(context, data);
  });
  return response;
}
// Listen for incoming requests.
server.post("/api/messages", async (req, res) => {
  await adapter.process(req, res, async (context) => {
    await app.run(context);
  });
});

// Gracefully shutdown HTTP server
["exit", "uncaughtException", "SIGINT", "SIGTERM", "SIGUSR1", "SIGUSR2"].forEach((event) => {
  process.on(event, () => {
    server.close();
  });
});