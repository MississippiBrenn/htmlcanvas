window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1')
    //built in canvas 2d api 
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    //canvas settings
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'gold';
    ctx.lineWidth = 10;
    ctx.lineCap ='round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10; 
    ctx.shadowOffsetX = 5;
    ctx.shadowBlur = 10; 

    //effect settings
    let size = canvas.width <canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    //depth of fractal 
    const maxLevel = 4;
    const branches = 2;

    // number of sides to form full circle  
    let sides = Math.random() * 7 + 2;
    //how much smaller the segmets are compared to the previous segment
    let scale = Math.random() * 0.2 + 0.4;
    //angle in radians between parent branches and their segments
    //0 is cool 
    let spread = Math.random() * 2.9 + 0.1;   
    // hsl color declaration 0% is gray scale and 100% is full saturated 
    let color = 'hsl('+Math.random() * 360 +', 100%, 50%)';
     drawFractal();

     
    //controls 
    const randomizeButton = document.getElementById('randomizeButton')



    function drawBranch(level){
        if(level > maxLevel) return; 
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();
        for(let i =0; i < branches; i++){
            ctx.save();
            ctx.translate(size-(size/branches)*i,0);
            ctx.rotate(spread);
            ctx.scale(scale,scale); 
            drawBranch(level+1);
            ctx.restore(); 

            ctx.save();
            ctx.translate(size -(size/branches)*i,0);
            ctx.rotate(-spread);
            ctx.scale(scale,scale); 
            drawBranch(level+1);
            ctx.restore();
        }

    }



    function drawFractal(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.translate(canvas.width/2,canvas.height/2);
        for(let i =0; i < sides; i++){
            ctx.rotate((Math.PI *2)/sides);
            drawBranch(0);
            }

        ctx.restore();
    }

    drawFractal();
    
    function randomizeFractal(){
        // number of sides to form full circle  
         sides = Math.random() * 7 + 2;
        //how much smaller the segmets are compared to the previous segment
         scale = Math.random() * 0.2 + 0.4;
        //angle in radians between parent branches and their segments
        //0 is cool 
         spread = Math.random() * 2.9 + 0.1;   
        // hsl color declaration 0% is gray scale and 100% is full saturated 
         color = 'hsl('+Math.random() * 360 +', 100%, 50%)';
         drawFractal();
    }

    randomizeButton.addEventListener('click', randomizeFractal);
});