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
    let size = canvas.width <canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    //depth of fractal 
    const maxLevel = 4;
    const branches = 2;

    // number of sides to form full circle  
    let sides = 5
    //how much smaller the segmets are compared to the previous segment
    let scale = 0.7;
    //angle in radians between parent branches and their segments
    //0 is cool 
    let spread = 0.6;   
    // hsl color declaration 0% is gray scale and 100% is full saturated 
    let color = 'hsl('+Math.random() * 360 +', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 20 +10);
     drawFractal();

     
    //controls 
    const randomizeButton = document.getElementById('randomizeButton');
    const resetButton = document.getElementById('resetButton');

    const sliderlinewidth = this.document.getElementById('linewidth');
    const labellinewidth = this.document.querySelector(`[for=linewidth]`);
    sliderlinewidth.addEventListener('change', function(e){
        lineWidth = Number(e.target.value);
        drawFractal();
        updateSlider();
    })
    
    const sliderSpread = this.document.getElementById('spread');
    const labelSpread = this.document.querySelector(`[for=spread]`);
    sliderSpread.addEventListener('change', function(e){
        spread = Number(e.target.value);
        drawFractal();
        updateSlider();
    })

    const sliderScale = this.document.getElementById('scale');
    const labelScale = this.document.querySelector(`[for=scale]`);
    sliderScale.addEventListener('change', function(e){
        scale = Number(e.target.value);
        drawFractal();
        updateSlider();
    })

    const sliderSides = this.document.getElementById('sides');
    const labelSides = this.document.querySelector(`[for=sides]`);
    sliderSides.addEventListener('change', function(e){
        sides = Number(e.target.value);
        drawFractal();
        updateSlider();

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
        ctx.arc(0,size,size*0.1,0,Math.PI*2);
        ctx.fill();  

    }

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
        labelSpread.innerText = "Spread " + Number(spread.toFixed(1));

        sliderScale.value = scale; 
        labelScale.innerText = "Scale " + Number(scale.toFixed(1));

        sliderSides.value = sides; 
        labelSides.innerText = "Sides " + Number(sides.toFixed(1));

        sliderlinewidth.value = lineWidth; 
        labellinewidth.innerText = "Line Width " + Number(lineWidth.toFixed(1));

    }

    drawFractal();
    
    function randomizeFractal(){
        // number of sides to form full circle  
         sides = Math.floor(Math.random() * 7 + 2);
        //how much smaller the segmets are compared to the previous segment
         scale = Math.random() * 0.2 + 0.4;
        //angle in radians between parent branches and their segments
        //0 is cool 
         spread = Math.random() * 2.9 + 0.1;   
        // hsl color declaration 0% is gray scale and 100% is full saturated 
         color = 'hsl('+Math.random() * 360 +', 100%, 50%)';
        lineWidth = Math.floor(Math.random()* 20 + 10);
        randomizeButton.style.backgroundColor = color;

        //  updateSliders();
        //  drawFractal();
    }
    
    function resetFractal(){
        sides = 5;
        //how much smaller the segmets are compared to the previous segment
         scale = 0.5;
        //angle in radians between parent branches and their segments
        //0 is cool 
         spread = 0.7;  
        // hsl color declaration 0% is gray scale and 100% is full saturated 
         color = 'hsl(290, 100%, 50%)';
         lineWidth = 15;
        //  updateSliders();
        //  drawFractal();
        resetButton.style.backgroundColor = color;
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

    updateSlider(); 

    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight;
        drawFractal();
    })
});