const flash = document.getElementById('flash');
const enemy = document.getElementById('enemy');

document.addEventListener('keydown', function(event) {
    jump();
});

function jump() {
    if(flash.classList != "jump") {
       flash.classList.add("jump")
    }
    setTimeout(function() {
        flash.classList.remove("jump")
    }, 300)

};

let isAlive = setInterval(function() {
    let flashTop = parseInt(window.getComputedStyle(flash).getPropertyValue("top"));
    let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"));

    if(enemyLeft <50 && enemyLeft > 0 && flashTop >= 140) {
        alert("GAME OVER")
        
    }
}, 10);
