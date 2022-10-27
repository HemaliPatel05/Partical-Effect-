const canvas = document.getElementById("text_canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particaleArray = [];
let hue = 0;

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x:undefined,
    y:undefined,
}

window.addEventListener('click',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 100; i++){
        particaleArray.push(new Particale())
    }
});
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle();
    for (let i = 0; i < 1; i++){
        particaleArray.push(new Particale())
    }
});

// function drawCircle(){
//     ctx.fillStyle = 'blue';
//     ctx.beginPath();
//     ctx.arc(mouse.x,mouse.y,50,0,Math.PI * 2);
//     ctx.fill();
// }

// Particale function
class Particale{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl('+hue+',100%,50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        console.log('red');
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
    }
}


function handleParticales(){
    for(let i = 0; i < particaleArray.length; i++ ){
        particaleArray[i].update();
        particaleArray[i].draw();
        for(let j = i; j < particaleArray.length; j++){
            const dx = particaleArray[i].x - particaleArray[j].x;
            const dy = particaleArray[i].y - particaleArray[j].y;
            const distance = Math.sqrt( dx * dx + dy * dy);
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particaleArray[i].color;
                ctx.moveTo(particaleArray[i].x , particaleArray[i].y)
                ctx.lineTo(particaleArray[j].x , particaleArray[j].y)
                ctx.stroke();
            }
        }
        if(particaleArray[i].size <= 0.3){
            particaleArray.splice(i,1);
            i--;
        }
    }
}

console.log(particaleArray);

function animate(){
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0,0,0.02)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    handleParticales();
    hue += 0.5;
    // drawCircle();
    requestAnimationFrame(animate)
}
animate();
// drawCircle();