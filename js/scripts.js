$(document).ready(function(){

	var mobile = false, angle, container = {width: 0, height: 0, position: {top: 0}}, box = {width: 0, height: 0, position: {left: 0, top: 0}}, center = {x: 0, y: 0}, mouse = {x: 0, y: 0};

	boxHeight = $("#maintenance-box").height();

	var ua = navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
       mobile = true;
      	$(".mText").css('color','rgba(255,255,255,255)');
		$(".mText").css("opacity", "0");
    }

	$("#nav-ltia").hide().delay(1550).show(0, function(){

		$("#animation").remove();
		$("#container-logo").prepend('<img src="img/logo.png" id="logo" class="img-responsive" style="opacity: 0;"></img>');
		$("#logo").animate({opacity: '0.5'}, 1000);
		$("#nav-ltia").animate({opacity: '1.0'}, 1000);
		if(mobile)
			$(".mText").animate({opacity: '0.9'}, 1000);


		$("#logo").on("load", function(){
			container.height = $("#container-logo").height();
			var windowHeight = $(window).height();
			container.position.top = $("#container-logo").position().top;
			$("#maintenance-box").css("top", container.height/2 + container.position.top/2);
			$("#container-logo").height(windowHeight - container.position.top);
			if(!mobile)
				$("#logo").height(windowHeight - container.position.top);
			
			calculateCenter();

		});

	});

	$(window).resize(function(){
		calculateCenter();
	});

	function calculateCenter(){
		//Cálculo do centro
		container.width = $("#container-logo").width();
		box.position = $("#maintenance-box").position();
		box.height = $("#maintenance-box").height();
		container.position.top = $("#container-logo").position().top;

		center.x = container.width/2;
		center.y = box.position.top + box.height/2 + container.position.top;
	}




	$(document).on("mousemove", function(e) {

		//Cálculo do ângulo

		if(mobile)
			return;
		if(ehiOS())
			return;

  		mouse.x = e.pageX;
  		mouse.y = e.pageY;

  		if(mouse.x < center.x && mouse.y < center.y){
  			angle = Math.atan((center.y - mouse.y)/(center.x - mouse.x));
  			angle = angle * 180 / Math.PI;
  		}else if(mouse.x > center.x && mouse.y <center.y){
  			angle = Math.atan((center.y - mouse.y)/(-center.x + mouse.x));
  			angle = angle * 180 / Math.PI;
  			angle = 180 - angle;
  		}else if(mouse.x > center.x && mouse.y > center.y){
  			angle = Math.atan((-center.y + mouse.y)/(-center.x + mouse.x));
  			angle = angle * 180 / Math.PI;
  			angle = 180 + angle;
  		}else if(mouse.x < center.x && mouse.y > center.y){
  			angle = Math.atan((-center.y + mouse.y)/(center.x - mouse.x));
  			angle = angle * 180 / Math.PI;
  			angle = 360 - angle;
  		}

		angle = -angle;  		

  		//Cálculo da distância
  		var distance, percent = 20;
		distance = Math.sqrt(Math.pow((mouse.x - center.x),2) + Math.pow((mouse.y - center.y),2));

		//Cálculo de valor pra ir na porcentagem

		if(distance<500){
			percent = (500 - distance)/5;
		}
		if(distance<0) distance = 0;

		


  		$(".mText").css("background", "-webkit-linear-gradient("+angle+"deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)"+ percent+ "%)");
  		$(".mText").css("-webkit-background-clip","text");
  		$(".mText").css("-wenkit-text-fill-color","transparent");

	});

	function ehiOS(){
   		var userAgent = window.navigator.userAgent;
   		return (/iP(hone|od|ad)/.test(userAgent));
	}
	

	
});