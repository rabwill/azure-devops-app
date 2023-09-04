// index.js is used to setup and configure your bot

// Import required packages
const restify = require("restify");
const azdev = require('azure-devops-node-api');
// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const {
  CloudAdapter,
  ConfigurationServiceClientCredentialFactory,
  ConfigurationBotFrameworkAuthentication,
} = require("botbuilder");
const { TeamsBot } = require("./teamsBot");
const config = require("./config");

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
  MicrosoftAppId: config.botId,
  MicrosoftAppPassword: config.botPassword,
  MicrosoftAppType: "MultiTenant",
});
let orgUrl = "https://dev.azure.com/rwilliams108";
let token = "";

let authHandler = azdev.getPersonalAccessTokenHandler(token); 
let azconnection = new azdev.WebApi(orgUrl, authHandler);    

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

// Create the bot that will handle incoming messages.
const bot = new TeamsBot();

// Create HTTP server.
const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log(`\nBot started, ${server.name} listening to ${server.url}`);
});
//create an async api to get product includes the parameter from products array checking lowercase
server.get("/api/workitems/:name", async (req, res) => {
  const name = req.params.name.toLowerCase();
  const projectName = "Microsoft 365 advocacy";
  try {
    // Get the Work Item Tracking (WIT) API
    const witApi = await azconnection.getWorkItemTrackingApi();
    let workitems;
    // Execute the WIQL query to search for work items
    const result = await witApi.queryByWiql({
      query: `SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = "${projectName}"`
    });
    const ids = [];
    // Display the search results
    if (result && result.workItems) {
      
      for (const workItem of result.workItems) {    
        ids.push(workItem.id);
      }       
      workitems= await witApi.getWorkItems(ids);  
      const data = workitems.filter((obj) => obj.fields["System.Title"].toLowerCase().includes(name));
      res.send(data);
     
    }
  } catch (err) {
    console.error("Error:", err);
  }
 
});

// Listen for incoming requests.
server.post("/api/messages", async (req, res) => {
  await adapter.process(req, res, async (context) => {
    await bot.run(context);
  });
});

// Gracefully shutdown HTTP server
["exit", "uncaughtException", "SIGINT", "SIGTERM", "SIGUSR1", "SIGUSR2"].forEach((event) => {
  process.on(event, () => {
    server.close();
  });
});
