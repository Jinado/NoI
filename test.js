const msg = "!NoI hello there my friend!"
let initialMsg = "";
let editedMsg = "";

if(msg.startsWith("!NoI")){
    initialMsg = msg.split("!NoI")[1].trim();
} else {
    initialMsg = msg;
}

console.log(initialMsg)