const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let aster = []; // создаём массив для множества астеройдов
let fire = [];
let expl = [];
let timer = 0;
let ship={x:300, y:300,};// animx:0,animy:0};


//
//let aster={x:0,y:300,dx:10,dy:20}; //создаем структуру, т.к астеройдлв будет много и они не должжны зависить друг от друга
                                     //(по этому не создаем  переменную y) 

let asterimg = new Image();
asterimg .src = 'img/GAMES/icons8-астероид-50.png';

shipimg = new Image();
shipimg.src = 'img/GAMES/icons8-spaceship-64.png';

fireimg = new Image();
fireimg.src = 'img/GAMES/icons8-огонь-48.png';

let fonimg = new Image();
fonimg.src = 'img/GAMES/172528720.jpg';

let explimg = new Image();
explimg.src = 'img/GAMES/expl.png';



canvas.addEventListener("mousemove", function(event) {
    ship.x=event.offsetX-25; //offset - относительно координат блока
    ship.y=event.offsetY-13;
});





//aster.push({x:0,y:300,dx:5,dy:10}); //команда добавления в массив



explimg.onload = function () {
game();
}
//основной игровой цикл
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
        del:0}); //удалеление астеройда
}    

//выстрелы
if (timer%10==0) {            
   fire.push({x:ship.x+20,y:ship.y,dx:0,dy:-5.2});
//    fire.push({x:ship.x+10,y:ship.y,dx:0.5,dy:-5});
//    fire.push({x:ship.x+10,y:ship.y,dx:-0.5,dy:-5});
} 

//физика пуль
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

//физика    
for(i in aster) {
aster[i].x=aster[i].x+aster[i].dx;
aster[i].y=aster[i].y+aster[i].dy;


//границы
if (aster[i].x>=550 || aster[i].x<0) aster[i].dx=-aster[i].dx;
if (aster[i].y>=600) aster.splice(i,1);

//проверяем каждый астеройд на столкновение с каждой пулей 
    for (j in fire) {
    if (Math.abs(aster[i].x+25-fire[j].x-15) < 50 && Math.abs(aster[i].y-fire[j].y) < 25) { //x + 25 это половина астеройда
//произошло столкновение                                                                    //< 25 это цент астеройда куда попадет пуля

//спавн взрыва
 expl.push({x:aster[i].x-25,y:aster[i].y-25, animx:0,animy:0});

//помечаем астеройд на удаление
     aster[i].del=1;
     fire.splice(j,1);break; //удаляем пулю и прерываем цикл(break)
}
}
//удаляем астеройды
if (aster[i].del==1) aster.splice(i,1);




}

}

function render() {                                //context.drawImage(fonimg, 0, 0, 600, 600, 0, 0, 0, 0)
context.drawImage(fonimg, 0, 0, 600, 600); //фон                                                 вторая часть 0 0 это кординаты
context.drawImage(shipimg, ship.x, ship.y); //корабль                                            размер кадра 0 0


//context.drawImage(shieldimg, 192*Math.floor(expl[i].animx), 192*Math.floor(expl[i].animy), 192,192, expl[i].x, expl[i].y, 60, 60); //щит

for(i in fire) context.drawImage(fireimg, fire[i].x, fire[i].y, 30, 30); //выстрелы
for(i in aster) context.drawImage(asterimg, aster[i].x, aster[i].y, 50, 50); //астеройды

//рисуем взрывы
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