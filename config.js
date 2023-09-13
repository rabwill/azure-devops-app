const config = {
  botId: process.env.BOT_ID,
  botPassword: process.env.BOT_PASSWORD,
  azpat:process.env.AZURE_PERSONAL_ACCESS_TOKEN,
  previewimage:process.env.PREVIEW_IMAGE,
  wiUrl:process.env.WORK_ITEM_URL,
  orgName:process.env.ORG_NAME,
  projectName:process.env.PROJECT_NAME,
  host:process.env.BOT_DOMAIN
};

module.exports = config;
