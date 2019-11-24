var localImg = [];

const request = new XMLHttpRequest();
const slcItem = document.getElementsByClassName('stk-item');
const stkTitle = document.getElementById('stkTitle');
const customBtn = document.getElementById('customBtn');
const posTitle = document.getElementById('posTitle');
const ajust = document.getElementById('ajust');


fetch('https://jcurvelo.github.io/gifs-in-json/collection.json')
.then(response=>response.json())
.then(jsonData=>{
    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            console.log(`${key}: ${jsonData[key]}`)
            localStorage.setItem(`imgKey_${key}`,jsonData[key]);
        }
    }
});
// request.open('GET', 'https://jcurvelo.github.io/gifs-in-json/collection.json', true);

// request.onload = function(){
//     var data = JSON.parse(this.response);

//     var keys = Object.keys(data);
//     var values = Object.values(data);
//     var valuesArr = [];

//     for(let i=0;i<values.length;i++){
//         valuesArr[i] = values[i]
//     }
    
//     for(let i=0; i<keys.length;i++){
//         localStorage.setItem(`imgKey_${i}`,values[i]);
//     }
// }
// request.send();

let storage = Object.keys(localStorage);
let customStk = document.getElementById('customStk');

customStk.addEventListener('click',()=>{
    let myStickser = document.getElementById('urlImg');
    localStorage.setItem(`${-storage.length - 1}customStickser`,JSON.stringify(myStickser.value));
    location.reload();
})

for(let i=0; i<storage.length; i++){
    localImg[i] = localStorage.getItem(storage[i]);
}

for(let i=0; i<localImg.length; i++){
    let newItem = document.createElement('div');
    newItem.classList.add('stk-item');
    document.getElementById('stkSelect').appendChild(newItem);
}

for(let i = 0; i<slcItem.length; i++){
    slcItem[i].setAttribute('style',`background-image:url(${localImg[i]})`);

    slcItem[i].addEventListener('click',()=>{
        chrome.tabs.query({active:true},function(tabs){
            let port = chrome.tabs.connect(tabs[0].id,{name:'changeStickser'});
            port.postMessage({message:localImg[i]});
        });  
    });
      
}

ajust.addEventListener('click',()=>{
    let axisX = document.getElementById('axisX');
    let axisY = document.getElementById('axisY');

    chrome.tabs.query({active:true}, function(tabs){
        let port = chrome.tabs.connect(tabs[0].id,{name:'newPosition'});
        port.postMessage({newX:axisX.value});
        port.postMessage({newY:axisY.value});
    });

    
});

stkTitle.addEventListener('click',()=>{
    let stkSelect = document.getElementById('stkSelect');
    if(stkSelect.style.display == "none"){
        stkSelect.style.display = "block"
    } else{
        stkSelect.style.display = "none";
    }
});

customBtn.addEventListener('click',()=>{
    let customField = document.getElementById('customField');
    if(customField.style.display == "block"){
        customField.style.display = "none"
    } else{
        customField.style.display = "block";
    }
});

posTitle.addEventListener('click',()=>{
    let posField = document.getElementById('posField');
    if(posField.style.display == "block"){
        posField.style.display = "none";
    } else{
        posField.style.display = "block";
    }
});

chrome.storage.local.get(function(result){
    let axisX = document.getElementById('axisX');
    let axisY = document.getElementById('axisY');

    axisX.value = result.currentX;
    axisY.value = result.currentY;
});