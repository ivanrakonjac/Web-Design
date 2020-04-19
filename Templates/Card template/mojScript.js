function prikazi(redniBroj){
	document.getElementById(redniBroj+"KratkiText").style.display = "block"; 
	document.getElementById(redniBroj+"PrikaziManje").style.display = "block"; 
	document.getElementById(redniBroj+"PrikaziVise").style.display = "none"; 
}

function sakrij(redniBroj){
	document.getElementById(redniBroj+"KratkiText").style.display = "none"; 
	document.getElementById(redniBroj+"PrikaziManje").style.display = "none"; 
	document.getElementById(redniBroj+"PrikaziVise").style.display = "block"; 
}

function povecajOpacity(redniBroj){
	document.getElementById(redniBroj+"Grb").style.opacity=0.3;
	document.getElementById(redniBroj+"FacebookIkonica").style.display = "inline"; 
}

function smanjiOpacity(redniBroj){
	document.getElementById(redniBroj+"Grb").style.opacity=1.0; 
	document.getElementById(redniBroj+"FacebookIkonica").style.display = "none"; 
}