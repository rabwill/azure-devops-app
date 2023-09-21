const config = {
  botId: process.env.BOT_ID,
  botPassword: process.env.BOT_PASSWORD,
  azpat:process.env.AZURE_PERSONAL_ACCESS_TOKEN,
  previewimage:process.env.PREVIEW_IMAGE,
  wiUrl:process.env.WORK_ITEM_URL,
  orgName:process.env.ORG_NAME,
  projectName:process.env.PROJECT_NAME,
  openAIKey: process.env.SECRET_OPENAI_API_KEY,
  openAIEndpoint: process.env.AZURE_OPENAI_ENDPOINT
};

module.exports = config;
