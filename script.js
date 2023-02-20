window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1')
    //built in canvas 2d api 
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    //canvas settings
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'gold';
   
    ctx.lineCap ='round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10; 
    ctx.shadowOffsetX = 5;
    ctx.shadowBlur = 10; 

    //effect settings
    let size = canvas.width <canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
    //depth of fractal 
    const maxLevel = 8;
    const branches = 2;

  
    let sides = 10
    let scale = 0.85;
    let spread = -0.2;   
    let color = 'hsl('+Math.random() * 360 +', 100%, 50%)';
    let lineWidth = 30;

     
    //controls 
    const randomizeButton = document.getElementById('randomizeButton');
    const resetButton = document.getElementById('resetButton');
    
    const sliderSpread = this.document.getElementById('spread');
    const labelSpread = this.document.querySelector(`[for=spread]`);
    sliderSpread.addEventListener('change', function(e){
        console.log(e);
        spread = e.target.value;
        updateSlider();
        drawFractal();
    })

    const sliderSides = this.document.getElementById('sides');
    const labelSides = this.document.querySelector(`[for=sides]`);
    sliderSides.addEventListener('change', function(e){
        console.log(e);
        sides = e.target.value;
        updateSlider();
        drawFractal();
    })

    function drawBranch(level){
        if(level > maxLevel) return; 
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();
        for(let i =0; i < branches; i++){
            ctx.save();
            ctx.translate(size-(size/branches)*i,0);
            ctx.scale(scale,scale); 
            
            ctx.save();
            ctx.rotate(spread);
            drawBranch(level+1);
            ctx.restore(); 

            ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(0,size,size *0.1,0,Math.PI * 2);
        ctx.fill();
    }
    let PointX = 0; 
    let PointY = size; 

    function drawFractal(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.save();    
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.translate(canvas.width/2,canvas.height/2);
        for(let i =0; i < sides; i++){
            ctx.rotate((Math.PI *2)/sides);
            drawBranch(0);

            }

        ctx.restore();
        // randomizeButton.style.backgroundColor = color;
    }

    function updateSlider(){
        sliderSpread.value = spread; 
        labelSpread.innerText = "Spread " + Number(spread).toFixed(1);

        sliderSides.value = sides; 
        labelSides.innerText = "Sides " + sides;
    }

    drawFractal();
    
    function randomizeFractal(){
         sides = Math.floor(Math.random() * 18 + 2);
         scale = Math.random() * 0.6 + 0.3;
         spread = Math.random() * 2.9 + 0.1;   
         color = 'hsl('+Math.random() * 360 +', 100%, 50%)';
         lindWidth = Math.floor(Math.random()*30+20);
         randomizeButton.style.backgroundColor = color;
    }
    
    function resetFractal(){
        sides = 15;
         scale = 0.85;
         spread = 0.2;  
         color = 'hsl(290, 100%, 50%)';
         lineWidth = 30;
    }

    resetButton.addEventListener('click', function(){
        resetFractal(),
        updateSlider(),
        drawFractal()
    }); 

    randomizeButton.addEventListener('click', function(){
        randomizeFractal(),
        updateSlider(),
        drawFractal()
        randomizeButton.style.backgroundColor = color;
    });

    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 
        size = canvas.width <canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
        ctx.lineCap ='round';
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shadowOffsetX = 10; 
        ctx.shadowOffsetX = 5;
        ctx.shadowBlur = 10; 
        drawFractal(); 
    })
});