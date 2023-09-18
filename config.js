const config = {
  botId: process.env.BOT_ID,
  botPassword: process.env.BOT_PASSWORD,
  previewimage:process.env.PREVIEW_IMAGE,
  wiUrl:process.env.WORK_ITEM_URL,
  orgName:process.env.ORG_NAME,
  projectName:process.env.PROJECT_NAME,
  host:process.env.BOT_DOMAIN,
  connectionString: process.env.CONNECTION_STRING,
};

module.exports = config;
