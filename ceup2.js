/*
CONTINUAÇÃO DO CHEAT PARA DAR ATTACH NO PLAYER DE VIDEO.
*/

function s1(){
	var v = document.getElementsByClassName("player")[0];
	if (v){
		console.log("Found!");
		var sc2 = document.createElement('script');
        sc2.setAttribute("src","https://pastebin.com/raw/7PzuDXJF");
        sc2.setAttribute("type","text/javascript");
        v.appendChild(sc2);
	}
	else{
		alert("Um erro ocorreu(2)!");
	};
}
