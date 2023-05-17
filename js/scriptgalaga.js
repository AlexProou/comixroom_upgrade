const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let aster = []; 
let fire = [];
let expl = [];
let timer = 0;
let ship={x:300, y:300,};



let asterimg = new Image();
asterimg .src = 'img/GAMES/joker_asteroid.png';

shipimg = new Image();
shipimg.src = 'img/GAMES/batman_spaceship.png';

fireimg = new Image();
fireimg.src = 'img/GAMES/icons8-огонь-48.png';

let fonimg = new Image();
fonimg.src = 'img/GAMES/3.10777673.jpg';

let explimg = new Image();
explimg.src = 'img/GAMES/expl.png';



canvas.addEventListener("mousemove", function(event) {
    ship.x=event.offsetX-25; 
    ship.y=event.offsetY-13;
});




explimg.onload = function () {
game();
}

// GAME LOOP
function game() {
update();
render();
requestAnimFrame(game);
}


function update() {
timer++;
if (timer%10==0) {
    aster.push({
        x:Math.random() * 600,
        y:-50,
        dx:Math.random() * 2-1,
        dy:Math.random() * 2+2,
        del:0}); 
}    

// SHOTS
if (timer%10==0) {            
   fire.push({x:ship.x+20,y:ship.y,dx:0,dy:-5.2});

} 


for(i in fire) {
    fire[i].x=fire[i].x+fire[i].dx;
    fire[i].y=fire[i].y+fire[i].dy;

    if (fire[i].y<-30) fire.splice(i,1);
}

//анимация взрыва
for (i in expl) {
    expl[i].animx=expl[i].animx+1;
    if (expl[i].animx>7) {expl[i].animy++; expl[i].animx=0}
    if (expl[i].animy>7)
    expl.splice(i,1);
}

  
for(i in aster) {
aster[i].x=aster[i].x+aster[i].dx;
aster[i].y=aster[i].y+aster[i].dy;


// BORDER
if (aster[i].x>=550 || aster[i].x<0) aster[i].dx=-aster[i].dx;
if (aster[i].y>=600) aster.splice(i,1);

// COLLISION
    for (j in fire) {
    if (Math.abs(aster[i].x+25-fire[j].x-15) < 50 && Math.abs(aster[i].y-fire[j].y) < 25) { 


 expl.push({x:aster[i].x-25,y:aster[i].y-25, animx:0,animy:0});


     aster[i].del=1;
     fire.splice(j,1);
     break; 
}
}

if (aster[i].del==1) aster.splice(i,1);




}

}

function render() {                               
context.drawImage(fonimg, 0, 0, 600, 600); // BACKGROUND                                             
context.drawImage(shipimg, ship.x, ship.y); // SPACE SHIP                                       




for(i in fire) context.drawImage(fireimg, fire[i].x, fire[i].y, 30, 30); // SHOTS
for(i in aster) context.drawImage(asterimg, aster[i].x, aster[i].y, 50, 50); // ASTEROID

// DRAW EXPLOSION
for (i in expl)
context.drawImage(explimg, 100*Math.floor(expl[i].animx), 100*Math.floor(expl[i].animy), 100,100, expl[i].x, expl[i].y, 60, 60);

}

let requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
       window.webkitRequestAnimationFrame ||
       window.mozRequestAnimationFrame ||
       window.oRequestAnimationFrame ||
       window.msRequestAnimationFrame ||
       function(callback) {
        window.setTimeout(callback, 1000 / 20);
       };

})();