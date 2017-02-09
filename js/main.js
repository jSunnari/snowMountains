if (matchMedia) {
    var tablet = window.matchMedia("(min-width: 415px) and (max-width: 768px)");
    var mobile = window.matchMedia("(max-width: 414px");
    var largeTablet = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");

    tablet.addListener(windowListener);
    windowListener(tablet);
}

function windowListener() {
    if (mobile.matches) {
        console.log("mobile, width is smaller than 376px");
        document.getElementById('bg').setAttribute("width", "750");
    }

    else if (tablet.matches) {
        console.log("tablet, width is smaller than 769px");
        document.getElementById('bg').setAttribute("width", "900");
    }

    else if (largeTablet.matches) {
        console.log("largeTablet, width is smaller than 769px");
        document.getElementById('bg').setAttribute("width", "950");
    }

    else {
        console.log("windows is desktop");
        document.getElementById('bg').setAttribute("width", "1920");
    }
}

var bg = new Image();
bg.src = "img/bg.png";

function initCanvas(){
    var ctx = document.getElementById('bg').getContext('2d');
    var cW = ctx.canvas.width,
        cH = ctx.canvas.height;
    var flakes = [];

    function addFlake(){
        //X-position:
        var x = Math.floor(Math.random() * cW) + 1;
        //Y-position:
        var y = -5;
        //Speed/Layers:
        var s = Math.floor(Math.random() * 3) + 1;
        flakes.push({"x":x,"y":y,"s":s});
    }

    function snow(){
        addFlake();
        addFlake();
        addFlake();
        for(var i = 0; i < flakes.length; i++){
            ctx.fillStyle = "rgba(255,255,255,.9)";
            ctx.beginPath();
            ctx.arc(flakes[i].x, flakes[i].y+=flakes[i].s*.5, flakes[i].s*.5, 0, Math.PI*2, false);
            ctx.fill();
            //Remove flakes that is out of sight:
            if(flakes[i].y > cH){
                flakes.splice(i,1);
            }
        }
    }

    function animate(){
        ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        ctx.drawImage(bg,0,0);
        //ctx.rotate(0);
        snow();
        ctx.restore();
    }

    var animateInterval = setInterval(animate, 30);
}

window.addEventListener('load', function(event) {
    initCanvas();
});