var dataJSON = {
    "free":[
        {"style.css":"/data/style.css"},
        {"memes-pt-br.json":"/data/memes-pt-br.json"},
        {"scripts.js":"/data/scripts.js"},
        {"Ez Cheat.js":"/data/ezCheat.js"}
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

function showOrHide(id){
    var d = document.getElementById(id);
    if (d.hidden){
        d.hidden = false;
        if (id == "cnt"){
            getFiles();   
        };
    }
    else{
        d.hidden = true;
    }
}
