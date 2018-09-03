const total_hiding = 5;

function open_close(a)
{
    var hid = document.getElementById('hidden_'+a.charAt(8));
    if(hid.style.display == 'block')
    {
        hid.style.display = 'none';
    }
    else
    {
        hid.style.display = 'block';
    }
}


function open_all()
{
    for(var i = 1; i <= total_hiding;i++)
    { 
        var hid = document.getElementById('hidden_'+i);
        hid.style.display = 'block';
    }
}

function close_all()
{
    for(var i = 1; i <= total_hiding;i++)
    { 
        var hid = document.getElementById('hidden_'+i);
        hid.style.display = 'none';
    }
}

function display_none()
{
    for(var i = 1; i <= total_hiding;i++)
    { 
		try
		{
			var hid = document.getElementById('hidden_'+i);
			hid.style.display = 'none';
		}
		catch(e)
		{}
    }
}
 var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

var colour = "white",
	radius = 12;
	var xmlhttp;

function start()
{
	init();
	display_none();
}

function init() {
	canvas = document.getElementById('myCan');
	ctx = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
	ctx.closePath();

	canvas.addEventListener("mousemove", function (e) {
		findxy('move', e)
	}, false);
	canvas.addEventListener("mousedown", function (e) {
		findxy('down', e)
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		findxy('up', e)
	}, false);
	canvas.addEventListener("mouseout", function (e) {
		findxy('out', e)
	}, false);

	canvas.addEventListener("touchmove", function (e) {
		findxy('moveT', e)
	}, false);
	canvas.addEventListener("touchstart", function (e) {
		findxy('downT', e)
	}, false);
	canvas.addEventListener("touchend", function (e) {
		findxy('up', e)
	}, false);
	canvas.addEventListener("touchcancel", function (e) {
		findxy('out', e)
	}, false);
}

function draw() {
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.fillStyle = colour;
	ctx.arc(currX,currY,radius,0,2*Math.PI);
	ctx.fill();
	var mx = 0.0;
	var my = 0.0;
	var step = 10.0;

	var sly = currY-prevY;
	var slx = currX-prevX;
	var size = Math.sqrt(sly*sly + slx*slx);
	var xt = true;
	var yt = true;
	sly = sly/size;
	slx = slx/size;
	var minX = prevX;
	var minY = prevY;
	if(size > 0)
	while(xt)
	{
		ctx.arc(minX,minY,radius,0,2*Math.PI);
		ctx.fill();

		minX += slx*step;
		minY += sly*step;
		if(Math.sqrt((minX-prevX)*(minX-prevX)+(minY-prevY)*(minY-prevY)) > size)
		{
			xt = false;
		}
	}
	
	ctx.closePath();
}

function clear_screen() {
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
	ctx.closePath();

	document.getElementById('c').innerHTML = 'Send';
	document.getElementById('result').innerHTML = '';
}

function findxy(res, e) {

	var touches;
	if (res == 'down') {
		prevX = currX;
		prevY = currY;
		currX = e.pageX - canvas.offsetLeft;
		currY = e.pageY - canvas.offsetTop;

		flag = true;
		dot_flag = true;
		if (dot_flag) {
			prevX = currX;
			prevY = currY;
			currX = e.pageX - canvas.offsetLeft;
			currY = e.pageY - canvas.offsetTop;
			draw();
		}
	}
	else if (res == 'downT') {
		e.preventDefault();
		touches = e.touches[0];
		prevX = currX;
		prevY = currY;
		currX = touches.pageX - canvas.offsetLeft;
		currY = touches.pageY - canvas.offsetTop;

		flag = true;
		dot_flag = true;
		if (dot_flag) {
			prevX = currX;
			prevY = currY;
			currX = touches.pageX - canvas.offsetLeft;
			currY = touches.pageY - canvas.offsetTop;
			draw();
		}
	}
	if (res == 'up' || res == "out") {
		flag = false;
	}
	if (res == 'move') {
		if (flag) {
			prevX = currX;
			prevY = currY;
			currX = e.pageX - canvas.offsetLeft;
			currY = e.pageY - canvas.offsetTop;
			draw();
		}
	}
	else if(res == 'moveT')
	{
		if (flag) {
			e.preventDefault();
			touches = e.touches[0];
			prevX = currX;
			prevY = currY;
			currX = touches.pageX - canvas.offsetLeft;
			currY = touches.pageY - canvas.offsetTop;
			draw();
		}
	}
}
function send()
{
	document.getElementById('c').innerHTML = 'Loading';
	var imgData = ctx.getImageData(0,0,280,280);
	var avg = 0.0;
	var out=new Array();
//	var count = 0;
	xmlhttp = new XMLHttpRequest;
	xmlhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status ==200)
		{
			document.getElementById('c').innerHTML = 'Send';
			document.getElementById('result').innerHTML =this.responseText;
		}
	};
	for(var i = 0; i < 280*4;i+=40)
	{
		for(var w = 0; w < 280*4; w+=40)
		{
			avg = 0.0;
			for(var j = 0; j < 40;j+=4)
			{
				for(var k=0; k<40;k+=4)
				{
					avg += imgData.data[j*280+i*280+w+k];
				}
			}
			avg = Math.floor(avg/100);
			out.push(avg);
			for(var j = 0; j < 40;j+=4)
			{
				for(var k=0; k<40;k+=4)
				{
					imgData.data[j*280+i*280+w+k] = avg;
					imgData.data[j*280+i*280+w+k+1] =avg;
					imgData.data[j*280+i*280+w+k+2] =avg;
				}
			}
		}
	}
	ctx.putImageData(imgData,0,0);
	xmlhttp.open("POST","data.txt", true);
	xmlhttp.setRequestHeader("Content-type", "encoded-number");
	xmlhttp.send(JSON.stringify(out));
	
}
