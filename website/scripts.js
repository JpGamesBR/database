var dataJSON = {
    "free":[
        {"style.css":"/data/style.css"},
        {"memes-pt-br.json":"/data/memes-pt-br.json"},
        {"scripts.js":"/data/scripts.js"},
        {"Ez Cheat.js":"/data/ezCheat.js"}
    ],
    "logs":[
        {"date":'01/06/23 09:17','text':"memes page and new memes."},
        {"date":"30/06/23 14:27","text":"some improvments to CSS and site title."},
        {"date":"29/06/23 15:00","text":"Some improvements in JavaScript and CSS and new function to Show Content button."},
        {"date":"26/06/23 21:25","text":"Some improvements in JavaScript and CSS and a new 'go to top' button"},
        {"date":"26/06/23 21:08","text":"Added log System Logic, and functionalities"},
        {"date":"26/06/23 17:47","text":"Added EzCheat.js, Added Log System and others..."}
    ]
}

function GetMemes(){
    var meme = "";
    var memesJson;
    fetch("./data/memes-pt-br.json").then(response => {return response.json()}).then((data) => {
        memesJson = data;
        meme = memesJson[Math.floor(Math.random()*memesJson.length)];
        console.log(meme,Math.floor(Math.random()*memesJson.length));
        var img = document.getElementById("meme-img");
        img.src=meme;    
    });
}

function GetClickedSpan(me){
    // Get JSON File
    var free = dataJSON["free"][me];
    for (key in free){
        var v = free[key];
        var k = key;
    }
    // Get Frame of item
    var iteminfo = document.getElementById("item-info");;
    
    var title = document.getElementById("item-title");
    var link = document.getElementById("item-link");
    var id = document.getElementById('item-id');

    // Set Div values
    title.textContent = "Title: " + k;
    link.href= v;
    id.textContent = "ID: "+me

    // Show or hide
    if (iteminfo.hidden || me){
        iteminfo.hidden = false;
    }
    else{
        iteminfo.hidden = true;
    }
}

function getFiles(){
    var e =document.getElementById("cnt_list");
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }

    var l = dataJSON["free"]
    /*/ 
        var x = document.createElement("li");
        x.innerText = element['memes-pt-br.json'];
        e.appendChild(x);
    /*/
    for (var i =0;i< l.length; i++){
        var obj = l[i];
        for (var key in obj){
            var v = obj[key];
            var x = document.createElement("li");
            var a = document.createElement("button");
            a.style.background = "none";
            a.className = "c-green";
            a.innerText = key;
            a.Value = i;
            a.id = "item-"+i;
            x.appendChild(a);
            e.appendChild(x);
        }
    }
    
    var childs = e.childNodes;
    childs.forEach(function(item){
        var val = item.firstChild.id.split('-')[1];
        item.addEventListener('click',function(){
            GetClickedSpan(val);
        });
    })
}

function getLogs(){
    var d = document.getElementById("logs_list");
    while (d.firstChild){
        d.removeChild(d.firstChild);
    }
    var e = document.createElement("ol");
    var l = dataJSON["logs"];
    for (i=0;i<l.length;i++){
        var obj = l[i];
        var x = document.createElement("li");
        var s = document.createElement("small");
        x.innerText = obj['date']
        s.innerText = " - "+obj["text"]
        x.appendChild(s)
        e.appendChild(x)
    }
    d.appendChild(e);
}

function showOrHide(id){
    var d = document.getElementById(id);
    if (d.hidden){
        d.hidden = false;
        if(id == "logs"){
            getLogs();
        };
    }
    else{
        d.hidden = true;
    }
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scroll-to-top").style.display = "block";
  } else {
    document.getElementById("scroll-to-top").style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function OverlayOpen(id){
    var d = document.getElementById(id);
    if (d.style.display=="none"){
        d.style.display = "block";
        if (id=="cnt"){
            getFiles();
        }
        else if(id =="meme"){
            GetMemes();
        }
    }
    else{
        if (d.style.display=="block"){
            d.style.display = "none";
        }
        else{
            d.style.display = "none"
        };
    };
    
}
