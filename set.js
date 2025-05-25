




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUtGODQwT2NORXpST3AwYkFleUJmaFQrOGN3MkhFSlNYRmxhbUlqL0cwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV3orUW9TaDBQVUwzSVdLdFFzVXVEMUlLaWRzN0ZvRTE2dGJsZnBxRStrOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5SzU4WkdKNDlkTDdGc2RPYWV5WEF1VmtNaGE2OC9xK0U1dE1JVnZWVTNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpOVpkUE5TY0l6RmVNWW9HMEdkMFhWUExXb2xUOVhMTEFZOW9aUm1uakFnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldCUTJubGZ3aXk4cTVlelNIdFpXYzBVVmdETW5JREFmRGx6UGNwQnBxMkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklicDRmTXpJMStWelcrUk42bjZwWXUzSzZ3T3JhN2Z1akdKZHZJVWxQbGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUozdi9ncG1HdEp4RFJ5L3JFS2pMRU5oRW5odmo4dTVrdDdPME9xNWoxND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidytQZndvNWZkaGJKZHpDanVtdkp5Q1A4YTYxeEdTVnV0L1FGdVFMRUJ5Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhaNHBZWlVhVDgyYjllVmVCUi9XSVc3bkdXM1ZUUWhlaWxQZ1JZREdHZnB0ek15eURuZU9jMDd4Qys2VkJHWHFoWmlxS2dPYVVkTHNmNk9oeGN6eUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI3LCJhZHZTZWNyZXRLZXkiOiJEeUI0WnVLZXRsT1RuR29wdmwvY3FkSUdHZk5TeTdsRldraUhPYnRSN200PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4NjI2MzM1OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5MzE1MEZEOTZENkREM0FGMkFGMTA1RkIzNDg4OTBDQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4MTc2NjA0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODYyNjMzNThAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0NFODI0Njg4ODc3NUNDNjcyN0I5NUYzRDIwOThFMTgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0ODE3NjYxOX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjp0cnVlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI5NTZYRVEzWSIsIm1lIjp7ImlkIjoiMjYzNzg2MjYzMzU4OjNAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyNTkxNjE4NTAxNDI3MzozQGxpZCIsIm5hbWUiOiJKLk4uUiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHZrdFBvR0VMdWR6TUVHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQjRjL0FyTVZoUlBmOWdaRXRSV2dJK0c2YkJ3dnpkM2dyM1NmSjBHZG5Wdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRjNXUXBnSnpSbnJUcWV2b3ZPcjM1TkRucFlNQllKVDN0ekszclpJZG5WVmIrME1PZUZlc2FlMVZhVVZZeStYcUI2ZUZhMFRockM5ZFNwTXhQVklhQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6Ik85dWlTb1h4ZmZTSEljNVNHMVhiV0VlcWFxVVRDNW85Ri9oanhtd2xJYzVRSGdkQys2SUpzQXdkZ0xzaGVMN2ptOW1DcVlqdVk5UklWQS9NZDQwc0JRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg2MjYzMzU4OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUWVIUHdLekZZVVQzL1lHUkxVVm9DUGh1bXdjTDgzZDRLOTBueWRCbloxYyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4MTc2NTg1LCJsYXN0UHJvcEhhc2giOiIzZ1BVSmsiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJBRSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "263786263358",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "J.N.R",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '2',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
