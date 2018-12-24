let stickserX = "1100px"
let stickserY = "700px"

//Listening the new Stickser request

chrome.runtime.onConnect.addListener(function(port){
    if(port.name == 'changeStickser'){
        port.onMessage.addListener(function(msg){
            let newStk = msg.message;
            chrome.storage.local.set({key: newStk});
            stickser.style.backgroundImage = `url(${newStk})`;           
        })
    }
    if(port.name == 'newPosition'){
        port.onMessage.addListener(function(msg){
            let changePosX = msg.newX;
            let changePosY = msg.newY;

            chrome.storage.local.set({currentX: changePosX});
            chrome.storage.local.set({currentY: changePosY});

            stickser.style.left = `${changePosX}px`;
            stickser.style.top = `${changePosY}px`;
            
        });
    }
});

//Getting a connection with the API
const request = new XMLHttpRequest();

request.open('GET', 'https://jamael17.github.io/gifs-in-json/collection.json', true);

request.onload = function(){
    let data = JSON.parse(this.response);   
}

request.send();

//Creating the Stickser
let stickser = document.createElement('div');
stickser.id = "keyImg"
stickser.style.width = "150px";
stickser.style.height = "150px";
stickser.style.position = "fixed";
stickser.style.top = stickserY;
stickser.style.left = stickserX;
stickser.style.zIndex = "8";
stickser.style.backgroundSize = "100% 100%";
document.body.appendChild(stickser);


chrome.storage.local.get(function(result){

    stickser.style.backgroundImage = `url(${result.key})`;
});

chrome.storage.local.get(function(result){
    stickser.style.left = `${result.currentX}px`;
});

chrome.storage.local.get(function(result){
    stickser.style.top = `${result.currentY}px`;
});
