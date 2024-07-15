const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUhlUEV6SzlLVTVJRXlRRml5aHVBVTVxejNDcC9YK2dPYnp4K3NhYzBsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidStFc2RUNjJZbTdGVWdxNkEyOVJtejJrYUthK3hKMElsSmpsbTFEVldTTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTHZxQkRtbEJ6TElNMGcwNEtpUzJobXc1QWdhbDlKL3pnTE5aajdmR0ZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKKzZzR3RRR0tWN2dnL1FuY3FCOW8xUENUSC9RSDlnQnl6elBianJVNUQ0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1NUjkvRCtEWjBKQjMwL3JXSjJDR3Q0azBueThFLzRyWm9IOVRTa3VaM1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZYS3EzZlJhNnRUSWVqZmQzbFo0S3dkcnN0dUQydkt4WCtwUlBhUEkzdzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU1YQ3lkS3M0WDI2L0ozQjZpN1pOVlBvdE1VRkZUWTQydURDMEU5bXRtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkJJVjUrZU16Rys0cnkrQWZ3ZThJa0Q0Qzd5em12YTQyVlJlbUlVUDYwRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImU4YVFRZ3Rtbm84WEYzampURXNVVXV1aGJGR0pWTWZ0aC9kaFBRNnNMbnpQVnJtWWZJL2pWWWpKUzlhbVVzUDNvNVZFb0MxdU9RNWQ2SjZIR3RZN2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkyLCJhZHZTZWNyZXRLZXkiOiJScFlPd3RvVngwR2syaGRGUktKK216d083R3NQVkJFRloyV0JySGNoUE0wPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc0MDAwNzU2N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0MkNCRjdDQTREMDc4RjVBMEI0MEM0MzZEQkU4RUZGNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxMDY3Mjk5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJSmMxVjJ0UVRRbVZhaFQwS0dfdmVnIiwicGhvbmVJZCI6IjEyZTBjY2ZiLWQwYjItNDhjNi05NGU1LTY1Y2NiZTgyZTE3NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpdldVN3BTVE5CTGhZWEU0c0lxVmFtd2h0TU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGJEc3BYS1EzR2x4aEFUci8zTVNMZUtEV2xJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlREOUFHRlM4IiwibWUiOnsiaWQiOiIyNTQ3NDAwMDc1Njc6NjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4oG/4bWDy6LhtZfKuC3htY/igbHhtYgg4pyv4pqg77iOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNR0J6ck1HRUpETzFiUUdHQ3NnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJGZ3ROQjhxTFJOMGg1VWdEVVU3UlY4am9KTFJKaWJldmpCa3M2RTNlN0J3PSIsImFjY291bnRTaWduYXR1cmUiOiJYOTg2b1FvTWEwM08zbUR5bm8yS0lLOUFoMnVLT2ZtWEI0QkFqcFBPbEk3TWhjRkl5dzlqWS8wQjR5ZmlYcWZLaHdqYUpQUVFSekJEMytSbW9HdWxDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRmZ1K3hJdzZrell6ZVlmR1RIaTBiYXVsY21mVWhJdDlDU3JKSG9KSUZFdnFjd1lySS9KemoyWFV0WUdXdWxuUjV2dUdIMlVzVkFtSXpnY2Fva1dKZ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NDAwMDc1Njc6NjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUllMVFFmS2kwVGRJZVZJQTFGTzBWZkk2Q1MwU1ltM3I0d1pMT2hOM3V3YyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTA2NzI5MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGRkoifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝑲𝒊𝒏𝒈 𝑴𝒂𝒓𝒊𝒔𝒆𝒍",
    NUMERO_OWNER : process.env.OWNER_NUM || "254740007567",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '𝑲𝒊𝒏𝒈 𝑴𝒂𝒓𝒊𝒔𝒆𝒍',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
