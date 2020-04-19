$(document).ready(function(){
  
  /*
  *funkcija za dugmad za spustanje i smanjenje teksta o klubovima
  */
  $(".prikaziViseManjeDugme").click(function(){
  	//parametar dugmeta: redniBroj_PrikazVise/redniBroj_PrikazManje
  	//parametar texta: redniBrojKratakText

  	id=this.id;
  	redniBroj = id.split("_")[0];
    
    $("#"+redniBroj+"KratkiText").slideToggle("slow");
    $("#"+redniBroj+"_PrikaziVise").toggle();
    $("#"+redniBroj+"_PrikaziManje").toggle();
  
  });



  $(".grbKluba").mouseenter(
  		function(){
		  	id=this.id;
		  	redniBroj = id.split("_")[0];
		    $("#"+redniBroj+"FacebookIkonica").fadeIn("fast");
  		}
  );


   $(".facebookIkonica").mouseenter(
  		function(){
		    $(this).animate({opacity: '1.0',height:'+=10px', width:'+=15px'},"fast");
	  	}
	);

    $(".facebookIkonica").mouseleave(
  		function(){
		    $(this).animate({opacity: '0.0'},"slow");
		    $(this).width(50);		    
		    $(this).height(50);
	  	}
	);

});