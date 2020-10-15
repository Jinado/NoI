// Middleware
require('dotenv').config()
const Discord = require('discord.js');
const Client = new Discord.Client();

Client.on("ready", () => {
    console.log(`Logged in as ${Client.user.tag}!`);
});

Client.on("message", async msg => {
    if(msg.author.id !== "766373529858998282")
    {
        let editedMsg = "";

        for(let i = 0; i < msg.content.length; i++){
            if(msg.content[i] == "i" || msg.content[i] == "I"){
                editedMsg += "[REDACTED]";
            } else {
                editedMsg += msg.content[i];
            }
        }
    
        console.log(editedMsg);
    
        if(editedMsg.length !== msg.content.length){ // If the lengths are diffrent, all I:s have been replaced with [REDACTED]
            await msg.delete().then(async msg => {
                await msg.channel.send(`*${msg.author.username} said:* ${editedMsg}`).catch(console.error);
            }).catch(console.error);
        }
    }
});

Client.login(process.env.NOI_BOT_TOKEN);