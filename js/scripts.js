$(document).ready(function(){
	
	

	$("#nav-ltia").hide().delay(1600).show(0, function(){
		$("#animation").remove();
		$("#container-logo").append('<img src="img/logo.png" id="logo" class="img-responsive" style="opacity: 0;"></img>');
		$("#logo").animate({opacity: '0.5'}, 'slow');
		$("#nav-ltia").animate({opacity: '1.0'}, 'slow');
	});	
	
});