var dataJSON = {
    "free":[
        {"style.css":"/data/style.css"},
        {"memes-pt-br.json":"/data/memes-pt-br.json"},
        {"scripts.js":"/data/scripts.js"},
        {"Ez Cheat.js":"/data/ezCheat.js"}
    ],
    "logs":[
        {"date":"26/06/23 21:25","text":"Some improvments in JavaScript and CSS and a new 'go to top' button"},
        {"date":"26/06/23 21:08","text":"Added log System Logic, and functionalities"},
        {"date":"26/06/23 17:47","text":"Added EzCheat.js, Added Log System and others..."}
    ]
}

function getFiles(){
    var d = document.getElementById("cnt");
    while (d.firstChild) {
        d.removeChild(d.firstChild);
    }

    var e =document.createElement("ol");
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
            var a = document.createElement("a");
            a.href = "."+v;
            a.innerText = key;
            x.appendChild(a);
            e.appendChild(x);
        }
    }
    d.appendChild(e);
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
        if (id == "cnt"){
            getFiles();   
        }
        else if(id == "logs"){
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