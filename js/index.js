$(function(){
	var pale=null;
	var canvas=null;
	$(".lefttop .iconfont").click(function(){
		var index=$(this).index(".lefttop .iconfont");
		$(".lefttop .iconfont").removeClass("actives").eq(index).addClass("actives");
		var attr=$(this).attr("role");
		if(attr=="add"){
			// var w=prompt("width","800");
			// var h=prompt("height","600");
			$(".text").show(500);
			$(".text button").eq(0).click(function(){
				var w=$(".text .widths").val();
				var h=$(".text .heights").val();
				$(".text").hide(500);
				canvas=$("<canvas width="+w+" height="+h+">");
				var copy=$("<div class='copy'>");
				copy.css({width:w+"px",height:h+"px"});
				$(".right").append(canvas).append(copy);
				pale=new palette(canvas[0].getContext("2d"),canvas[0],copy[0]);
			})
			$(".text button").eq(1).click(function(){
				$(".text").hide(500);
				return;
			})

		}else{
			if(canvas==null){
				return;
			}
			if(attr=='chexiao'){
				if(pale.arr.length>1){
					pale.arr.pop();
					pale.o.putImageData(pale.arr[pale.arr.length-1],0,0,0,0,pale.width,pale.height);
				}else if(pale.arr.length==1){
					pale.arr.pop();
					pale.o.clearRect(0,0,pale.width,pale.height);
				}else{
					alert("已经没有了！");
				}
			}
		}
	})
	$(".leftone .iconfont").click(function(){
		var index=$(this).index(".leftone .iconfont");
		$(".leftone .iconfont").removeClass("active").eq(index).addClass("active");
		var attr=$(this).attr("role");
		// console.log(attr)
			if(canvas==null){
				alert("请先创建画板");
				return;
			}
			if(attr=='pencil'){
				pale.pencil();			
			}
			if(attr=='line'){
				pale.draw();
				pale.type=attr;
			}
			if(attr=='rect'){
				pale.draw();
				pale.type=attr;
			}
			if(attr=='triangle'){
				pale.draw();
				pale.type=attr;
			}
			if(attr=='circle'){
				pale.draw();
				pale.type=attr;
			}
			if(attr=='poly'){
				$(".num").show(500);
				$(".num button").eq(0).click(function(){
					pale.bnum=$(".num input").val();
					$(".num").hide(500);
					pale.draw();
					pale.type=attr;
				})
				$(".num button").eq(1).click(function(){
					$(".num").hide(500);
					return;
				})
			}
			if(attr=='polystar'){
				$(".num").show(500);
				$(".num button").eq(0).click(function(){
					pale.jnum=$(".num input").val();
					$(".num").hide(500);
					pale.draw();
					pale.type=attr;
				})
				$(".num button").eq(1).click(function(){
					$(".num").hide(500);
					return;
				})
			}
			if(attr=='earser'){
				pale.earser();
			}			
	})
	$(".lefttwo .iconfont").click(function(){
		if(canvas==null){
			alert("请先创建画板！");
			return;
		}
		var index=$(this).index(".lefttwo .iconfont");
		$(".lefttwo .iconfont").removeClass("active").eq(index).addClass("active");
		var attr=$(this).attr("role");
		pale.style=attr;
	})
	$(".leftthree input").change(function(){
		var attr=$(this).attr("role");
		if(canvas==null){
			$(".leftthree input").val("#000000");
			alert("请先创建画板！");
			return;
		}
		if(attr=='fillstyle'){
			pale.fillstyle=this.value;
		}
		if(attr=='strokestyle'){
			pale.strokestyle=this.value;
		}
	})

	$(".leftfour input").change(function(){
		$(".leftfour p").html($(".leftfour input").val());
	})
})