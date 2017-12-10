$(document).ready(function(){

	var angle, container = {width: 0, height: 0, position: {top: 0}}, box = {width: 0, height: 0, position: {left: 0, top: 0}}, center = {x: 0, y: 0}, mouse = {x: 0, y: 0};

	boxHeight = $("#maintenance-box").height();
	//$(".mText").hide();
	$("#nav-ltia").hide().delay(1600).show(0, function(){

		$("#animation").remove();
		$("#container-logo").prepend('<img src="img/logo.png" id="logo" class="img-responsive" style="opacity: 0;"></img>');
		$("#logo").animate({opacity: '0.5'}, 'slow');
		$("#nav-ltia").animate({opacity: '1.0'}, 'slow');


		$("#logo").on("load", function(){
			container.height = $("#container-logo").height();
			$("#maintenance-box").css("top", container.height/2);
			
			calculateCenter();
		});

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


	$( document ).on("mousemove", function(e) {

		//Cálculo do ângulo

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
		  		console.log(distance);

		//Cálculo de valor pra ir na porcentagem

		if(distance<500){
			percent = (500 - distance)/5;
		}
		if(distance<0) distance = 0;

		


  		$(".mText").css("background", "-webkit-linear-gradient("+angle+"deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)"+ percent+ "%)");
  		$(".mText").css("-webkit-background-clip","text");
  		$(".mText").css("-wenkit-text-fill-color","transparent");

	});
	
});