function palette(cobj,canvas,copy){
	this.o=cobj;
	this.can=canvas;
	this.copy=copy;
	this.width=canvas.width;
	this.height=canvas.height;
	this.style="stroke";
	this.type="line";
	this.linewidth=1;
	this.bnum=5;
	this.jnum=5;
	this.fillstyle="#000000";
	this.strokestyle="#000000";
	this.arr=[];
}
palette.prototype.draw=function(){
	var that=this;
	this.copy.onmousedown=function(e){	
		var ev=e||window.event;
		var sx=ev.offsetX;
		var sy=ev.offsetY;
		that.inte();
		document.onmousemove=function(e){
			that.o.clearRect(0,0,that.width,that.height);
			if(that.arr.length>0){
				that.o.putImageData(that.arr[that.arr.length-1],0,0,0,0,that.width,that.height);
			}			
			var ev=e||window.event;
			var mx=ev.offsetX;
			var my=ev.offsetY;
			that[that.type](sx,sy,mx,my);
		}
		document.onmouseup=function(){
			that.arr.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.stroke();
	this.o.closePath();
}
palette.prototype.rect=function(x1,y1,x2,y2){
	this.o.beginPath();
	var w=x2-x1;
	var h=y2-y1;
	this.o.rect(x1+0.5,y1+0.5,w,h);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.circle=function(x1,y1,x2,y2){
	this.o.beginPath();
	var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	this.o.arc(x1,y1,r,0,Math.PI*2);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.triangle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.moveTo(x1+0.5,y1+0.5);
	this.o.lineTo(x1+0.5,y2+0.5);
	this.o.lineTo(x2+0.5,y2+0.5);
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.poly=function(x1,y1,x2,y2){
	var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	var ang=360/this.bnum;
	this.o.beginPath();
	for(var i=0;i<this.bnum;i++){
		this.o.lineTo(x1+Math.cos(ang*i*Math.PI/180)*r,y1+Math.sin(ang*i*Math.PI/180)*r);
	}
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.polystar=function(x1,y1,x2,y2){
	var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	var r2=r*0.4;
	var n=this.jnum*2;
	var ang=360/this.jnum/2;
	this.o.beginPath();
	for(var i=0;i<n;i++){
		if(i%2==1){
			this.o.lineTo(x1+Math.cos(ang*i*Math.PI/180)*r,y1+Math.sin(ang*i*Math.PI/180)*r);
		}else{
			this.o.lineTo(x1+Math.cos(ang*i*Math.PI/180)*r2,y1+Math.sin(ang*i*Math.PI/180)*r2);
		}
		
	}
	this.o.closePath();
	this.o[this.style]();
}
palette.prototype.pencil=function(){
	var that=this;
	this.copy.onmousedown=function(){
		that.o.beginPath();
		that.inte();
		document.onmousemove=function(e){
			if(that.arr.length>0){
				that.o.putImageData(that.arr[that.arr.length-1],0,0,0,0,that.width,that.height);
			}
			var ev=e||window.event;
			var mx=ev.offsetX;
			var my=ev.offsetY;
			that.o.lineTo(mx,my);
			that.o.stroke();
		}
		document.onmouseup=function(){
			that.o.closePath();
			that.arr.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
palette.prototype.earser=function(x1,y1,x2,y2){
	var that=this;
	this.copy.onmousedown=function(){
		var w=30;
		var a=document.createElement("div");
		a.style.cssText="width:"+w+"px;height:"+w+"px;position:absolute;background:#000";
		that.copy.parentNode.appendChild(a);
		document.onmousemove=function(e){
			var ev=e||window.event;
			var mx=ev.offsetX;
			var my=ev.offsetY;
			a.style.left=mx-w/2+30+"px";
			a.style.top=my-w/2+20+"px";
			that.o.clearRect(mx-w/2,my-w/2,w,w);
		}
		document.onmouseup=function(){
			that.arr.push(that.o.getImageData(0,0,that.width,that.height));
			that.copy.parentNode.removeChild(a);
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
palette.prototype.inte=function(){
	this.o.fillStyle=this.fillstyle;
	this.o.strokeStyle=this.strokestyle;
	this.o.lineWidth=$(".leftfour input").val();
}