//AHMET MUSA ÇATAK - 18290088
var gl;

//some variables that use in js file 
var isDirClockWise = true;
var delay = 50;
var red = 0.0;
var green = 1;
var blue = 0.7;
var saturation = 0.5;

//Location variables to reach html file
var thetaLoc; 
var xLoc ; 
var yLoc ; 
var scaleLoc;

// some variable to send html file and set 
var xAxis=0; 
var color; 
var yAxis=0; 
var rotateKey= false;
var theta;
var scale = 1.0;

//some math equation to calculate and set letter's coordinates
x = 0.2;
z = 0.05;
y = 0.3;
i = 0.1;
let j = Math.sqrt(2);
c = (y - z / j) / (y) * 2.5 * i;

//Letter's points coordinates (triangles)
var vertices = new Float32Array(
    [   //K Letter
        0.5 - x, y, 0.5 - x - z, -y, 0.5 - x, -y,
        0.5 - x, y, 0.5 - x - z, -y, 0.5 - x - z, y,
        0.5 - x, 0 + z / j, 0.5 - x + z / j, 0, 0.5 - x + 2 * i, y,
        0.5 - x + z / j, 0, 0.5 - x + 2 * i, y, 0.5 - x + 2 * i + z / j, y - z / j,
        0.5 - x, 0 - z / j, 0.5 - x + 2 * i, -y, 0.5 - x + 2 * i + z / j, -y + z / j,
        0.5 - x, 0 - z / j, 0.5 - x + 2 * i + z / j, -y + z / j, 0.5 - x + z / j, 0,
        0.5 - x, 0 + z / j, 0.5 - x + z / j, 0, 0.5 - x, 0 - z / j,
        // A Letter
        -0.5 + x, y - z / j, -0.5 + 2 * i + x, -y, -0.5 + z / j + x, y,
        -0.5 + 2 * i + x, -y, -0.5 + z / j + x, y, -0.5 + 2 * i + z / j + x, -y + z / j,
        -0.5 + x, y - z / j, -0.5 - 2 * i + x, -y, -0.5 - z / j + x, y,
        -0.5 - 2 * i + x, -y, -0.5 - z / j + x, y, -0.5 - 2 * i - z / j + x, -y + z / j,
        -0.5 + x, y - z / j, -0.5 - z / j + x, y, -0.5 + z / j + x, y,
        -0.5 - c / 2 + x, z, -0.5 - c / 2 + x, 0, -0.5 + c / 2 + x, 0,
        -0.5 - c / 2 + x, z, -0.5 + c / 2 + x, 0, -0.5 + c / 2 + x, z

    ]);

window.onload = function main() {

    //canvas
     const canvas = document.querySelector("#glcanvas");

    // Initialize the GL context
    gl = WebGLUtils.setupWebGL(canvas);

    // Only continue if WebGL is available and working
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //adding function for button direction
    var myButton = document.getElementById("DirectionButton");
    //mouse action listener
    myButton.addEventListener("click", function () { isDirClockWise = !isDirClockWise; console.log("Last event is Click");
        console.log("Current isDirClockWise value is : " + isDirClockWise);});

    //changing slides value such as delay and RGB
    document.getElementById("slide").onchange = function () { delay = this.value; console.log("Rotation Delay is: " + delay);};
    document.getElementById("slideRed").onchange = function () { red = this.value; console.log("Red color value is : " + red); };
    document.getElementById("slideGreen").onchange = function () { green = this.value; console.log("Green color value is: " + green);};
    document.getElementById("slideBlue").onchange = function () { blue = this.value; console.log("Blue color value  is: " + blue);};
    document.getElementById("slideSaturation").onchange = function () { saturation = this.value; console.log("Transperancy value  is: " + saturation);};
    
    //default color
    color = [red, green, blue, saturation];

    //keyboards action listener
        document.addEventListener('keyup', (event) => {

            var name = event.key;
            var code = event.code;
    
            if (name == 'w' || name == 'W'){
                if(scale==1){
                    if(yAxis<0.4)
                    yAxis+=0.1;
                }
                if(scale>1){
                    if(yAxis<0.4/(scale*scale) && yAxis+(0.1/(scale*scale)) < 0.2)
                    yAxis+=0.1/(scale*scale);
                }
                else{
                    if(yAxis<0.4/(scale*scale)  && yAxis+0.1 < 0.4/(scale))
                    yAxis+=0.1;
                }
               
                console.log("Last key event is w");
                console.log("Current y axis is : " + yAxis);
    
            }
            if (name == 's' || name == 'S'){
                if(scale==1){
                    if(yAxis>-0.4)
                    yAxis-=0.1;
                }
                if(scale>1){
                    if(yAxis>-0.4/(scale*scale) && yAxis-(0.1/(scale*scale)) > -0.2)
                    yAxis-=0.1/(scale*scale);
                }
                else{
                    if(yAxis>-0.4/(scale*scale)  && yAxis-0.1 > -0.4/(scale))
                    yAxis-=0.1;
                }

                console.log("s");
                console.log("Current y axis is : " + yAxis);
                
            }
            if (name == 'a' || name == 'A'){
                if(scale==1){
                    if(xAxis>-0.4)
                    xAxis-=0.1;
                }
                if(scale>1){
                    if(xAxis>-0.4/(scale*scale) && xAxis-(0.1/(scale*scale)) > -0.2)
                    xAxis-=0.1/(scale*scale);
                }
                else{
                    if(xAxis>-0.4/(scale*scale)  && xAxis-0.1 > -0.4/(scale))
                    xAxis-=0.1;
                }

                console.log("Last key event is a");
                console.log("Current x axis is : " + xAxis);
                
            }
            if (name == 'd' || name == 'D'){
                if(scale==1){
                    if(xAxis<0.4)
                    xAxis+=0.1;
                }
                if(scale>1){
                    if(xAxis<0.4/(scale*scale) && xAxis+(0.1/(scale*scale)) < 0.2)
                    xAxis+=0.1/(scale*scale);
                }
                else{
                    if(xAxis<0.4/(scale*scale)  && xAxis+0.1 < 0.4/(scale))
                    xAxis+=0.1;
                }

                console.log("Last key event is d");
                console.log("Current x axis is : " + xAxis);
                
            }
            if (name == 'r' || name == 'R'){
                if(isDirClockWise)
                    isDirClockWise=false;
                else
                    isDirClockWise=true;
               
                console.log("Last key event is r");
                console.log("Current isDirClockWise value is : " + isDirClockWise);
                
            }
            if (name == '+' ){
                if(scale<1.4)
                    scale+=0.1;
                
                console.log("Last key event is +");
                console.log("Current scale is : " + scale);
    
            }
            if (name == '-'){
                if(scale>0.6)
                    scale-=0.1;
                
                console.log("Last key event is -");
                console.log("Current scale is : " + scale);
    
            }
            if (name == 'Control' ){
                if(rotateKey)
                rotateKey=false;
            else
                rotateKey=true;
                console.log("Last key event is Ctrl");
            console.log("Current rotateKey value is : " + rotateKey);
            }   

            
        }, false);

    //sending data to gpu
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //Reach location of some variables that in html file
    colLoc = gl.getUniformLocation(program, "fColor");
    thetaLoc = gl.getUniformLocation(program, "theta");
    xLoc = gl.getUniformLocation(program, "xAxis");
    yLoc = gl.getUniformLocation(program, "yAxis");
    scaleLoc = gl.getUniformLocation(program, "scale");
    theta = 0;
    // change some value and send to html location
    gl.uniform1f(xLoc , xAxis);
    gl.uniform1f(scaleLoc , scale);
    gl.uniform1f(yLoc , yAxis);
    gl.uniform1f(thetaLoc, theta);
    gl.uniform4fv(colLoc, color);

    render();

}

function render() {
    setTimeout(function () {

        requestAnimFrame(render);
        //set background
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //leters rotation
        if(rotateKey){theta += (isDirClockWise ? 0.1 : -0.1);
            gl.uniform1f(thetaLoc, theta);}
        
        // send new value of locatuon and colors to html files shaders
        gl.uniform1f(xLoc , xAxis);
        gl.uniform1f(yLoc , yAxis);
        color = [red, green, blue, saturation];
        gl.uniform4fv(colLoc, color);
        gl.uniform1f(scaleLoc , scale);
        
        //draw object that depends on vertices ponints
        gl.drawArrays(gl.TRIANGLES, 0, 42);


    }, delay);

}

