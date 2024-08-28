const background = document.getElementById('background');

function RandomBackground(){
    var Quantity = Math.random()*100;

    for (var i = 0; i < Quantity; i++){
        var x = Math.random()*100;
        var y = Math.random()*100;
        var deg = Math.random()*360;

        var width = Math.random()*45;
        var height = Math.random()*45;

        var e = document.createElement('div');
        e.style.left = x + '%';
        e.style.top = y + '%';
        e.style.rotate = deg + 'deg';

        e.style.width = width + 'px';
        e.style.height = height + 'px';
        e.style.backgroundColor = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, ${Math.random()})`;

        e.classList.add('bg-item');

        background.appendChild(e);
    }
}

RandomBackground();

const ShowMoreButton = document.getElementById('showmore');
const InfoDatabase = document.getElementById('infodatabase');

ShowMoreButton.addEventListener('click', function(){
    if (InfoDatabase.hidden){
        InfoDatabase.hidden = false;
        ShowMoreButton.textContent = 'Hide';
    }else{
        InfoDatabase.hidden = true;
        ShowMoreButton.textContent = 'Show';
    };
})