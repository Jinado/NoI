// Middleware
require('dotenv').config()
const Discord = require('discord.js');
const Client = new Discord.Client();

// Bot variables
let autoConvert = false;

// Inform me that the but has successfully logged in
Client.on("ready", () => {
    console.log(`Logged in as ${Client.user.tag}!`);
});

// Listen for messages
Client.on("message", async msg => {
    if(msg.author.id !== "766373529858998282")
    {
        // Listen for commands
        if(msg.content.startsWith("!NoI")){
            if(msg.content.endsWith("help") || msg.content.endsWith("?")){
                await msg.channel.send( `help, ?    :Prints this help dialog\nautoConvert, ac    :Toggles whether or not to automatically convert all I's into [REDACTED] if toggled off, you'll have to prefix your message with '!NoI'\nCheckStatus, cs    :Returns the current status of the toggle option`);
                return;
            } else if(msg.content.endsWith("autoConvert") || msg.content.endsWith("ac")) {
                autoConvert = !autoConvert;
                await msg.channel.send(`Toggled auto-convert to: ${autoConvert}`);
                return;
            } else if(msg.content.endsWith("checkStatus") || msg.content.endsWith("cs")) {
                await msg.channel.send(`Current auto-convert status is: ${autoConvert}`);
                return;
            }
        }

        // Check if auto-convert is turned on
        if(autoConvert){
            await convert(msg);
            return;
        } else {
            if(msg.content.startsWith("!NoI")){
                await convert(msg);
                return;
            }
        }
    }
});

// A function that converts a message's I's into "[REDACTED]"
async function convert(msg){
    let initialMsg = "";
    let editedMsg = "";

    // Removes the inital !NoI prefix
    if(msg.content.startsWith("!NoI")){
        initialMsg = msg.content.split("!NoI")[1].trim();
    } else {
        initialMsg = msg.content;
    }

    // Changes all I's to [REDACTED]
    for(let i = 0; i < initialMsg.length; i++){
        if(initialMsg[i] == "i" || initialMsg[i] == "I"){
            editedMsg += "[REDACTED]";
        } else {
            editedMsg += initialMsg[i];
        }
    }

    // Deletes the message sent by the user and sends the same message, but converted
    if(editedMsg.length !== msg.content.length){ // If the lengths are diffrent, all I:s have been replaced with [REDACTED]
        await msg.delete().then(async msg => {
            await msg.channel.send(`*${msg.author.username} said:* ${editedMsg}`).catch(console.error);
        }).catch(console.error);
    }
}

// Login the bot
Client.login(process.env.NOI_BOT_TOKEN);