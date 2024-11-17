const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

function drawSpiral() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let angle = 0;
    let radius = 0;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < 1000; i++) {
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        ctx.lineTo(x, y);
        angle += 0.1;
        radius += 0.5;
    }

    ctx.stroke();
}

function animateSpiral() {
    let speed = 0.1;
    setInterval(() => {
        speed += 0.005;
        drawSpiral();
    }, 100);
}

drawSpiral();
animateSpiral();