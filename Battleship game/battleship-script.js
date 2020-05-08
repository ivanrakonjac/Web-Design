/*
*cuva imea igraca iz forse sa imenima, stranica: battleship-welcome.html
*radi i proveru ispravnosti imena
*pamti imena u localstorageu, kljucevi ime1 i ime2
*prelazi na battleship-game.html
*/
function sacuvajImenaIgraca(){
	var ime1=$("#username1").val();
	var ime2=$("#username2").val();

	$("#porukaImeForma").text(" ");

	if(ime1.length<3){
		$("#porukaImeForma").text("Ime prvog igraca mora imati makar 3 slova.");
		return;
	}
	if(ime2.length<3){
		$("#porukaImeForma").text("Ime drugog igraca mora imati makar 3 slova.");
		return;
	}

	if(ime1.length>15){
		$("#porukaImeForma").text("Ime prvog igraca moze imati max 15 slova.");
		return;
	}
	if(ime2.length>15){
		$("#porukaImeForma").text("Ime drugog igraca moze imati max 15 slova.");
		return;
	}

	//Ime moze sadrzati SAMO velika i mala slova, brojeve i donju crtu
	var patt = new RegExp("[^ a-z | A-Z | 0-9 | _]");
  	var res = patt.test(ime1);

  	if(res){
		$("#porukaImeForma").text("Ime prvog igraca moze sadrzati SAMO velika i mala slova, brojeve i donju crtu.");
		return;
  	}

  	var res = patt.test(ime2);

  	if(res){
		$("#porukaImeForma").text("Ime drugog igraca moze sadrzati SAMO velika i mala slova, brojeve i donju crtu.");
		return;
  	}

  	localStorage.setItem("ime1", JSON.stringify(ime1));
	localStorage.setItem("ime2", JSON.stringify(ime2));

	window.location.href = "battleship-setup.html";
}

/*battleship-setup.html*/
var igrac1;
var igrac2;
var misPritisnut = 0;
var brojacPolja = 0;
var trenutniIgrac;

/*
*za zamenu igraca1/igraca2 $("td").mouseup() battleship-setup.html
*/
function zamenaIgraca(){
	if(trenutniIgrac==igrac1){
		trenutniIgrac=igrac2;
	}
	else{
		trenutniIgrac=igrac1;
	}
	this.setovanjeVrednosti();
}

/*
*bojenje matrice pri inic ulasku i promeni igraca u battleship-setup.html
*/
function bojenjeMatrice(){
	for (var i = 0; i < trenutniIgrac.matrica.length; i++) {
	  	for (var j = 0; j < trenutniIgrac.matrica.length; j++) {
	  		if(trenutniIgrac.matrica[i][j] == 1){
	  			$("#"+i+j).css("background-color", "#ff0000");
	  		}
	  		else{
	  			$("#"+i+j).css("background-color", "transparent");
	  		}
		}
	}
}

/*
*za setovanje imena i broja preostalih brodova battleship-setup.html
*/
function setovanjeVrednosti(){
	$("#brBrodCetiri").text(trenutniIgrac.getBrojBrodCetiri());
	$("#brBrodTri").text(trenutniIgrac.getBrojBrodTri());
	$("#brBrodDva").text(trenutniIgrac.getBrojBrodDva());
	$("#brBrodJedan").text(trenutniIgrac.getBrojBrodJedan());
	$("#trenutniIgrac").text(trenutniIgrac.getIme());

	$(".slovo").width($("#19").width());
	$(".slovo").height($("#19").height());
	$(".slovo").css("text-align", "center");

	this.bojenjeMatrice();
}

/*
*onload() u battleship-setup.html poziva ovu fju
*/
function inicSetupPage(){
	var jsonString=localStorage.getItem("ime1");
	var ime1 = JSON.parse(jsonString);

	var jsonString2=localStorage.getItem("ime2");
	var ime2= JSON.parse(jsonString2);

	window.igrac1 = new Igrac(ime1);
	window.igrac2 = new Igrac(ime2);

	window.trenutniIgrac=window.igrac1;

	setovanjeVrednosti();
}

$(document).ready(function(){


	$(".setUpPolje").mouseup(function(event) {
		var brojacPolja = window.brojacPolja;
		var trenutniIgrac = window.trenutniIgrac;

		if(window.brojacPolja==0) return;

		window.misPritisnut = 0;

		event.stopPropagation();

		//ako je selektovano vise od 4 polja => svakako greska
		if(brojacPolja>4){
			trenutniIgrac.ponistiPolja(brojacPolja);
			return;
		}

		//ima li uopste dovoljno brodova
		if(trenutniIgrac.imaLiSlobodnogBroda(brojacPolja)==0){
			trenutniIgrac.ponistiPolja(brojacPolja);
			return;
		}

		var jeriX=trenutniIgrac.jeriX(brojacPolja);
		var jeriY=trenutniIgrac.jeriY(brojacPolja);
		if(!(jeriY || jeriX)){
			trenutniIgrac.ponistiPolja(brojacPolja);
			return;
		}

		if(trenutniIgrac.jeriPreklapanje(brojacPolja)){
			trenutniIgrac.ponistiPolja(brojacPolja);
			return;
		}

		if(trenutniIgrac.jeriDodir(brojacPolja,jeriX)){
			trenutniIgrac.ponistiPolja(brojacPolja);
			return;
		}

		if(trenutniIgrac.decBrBrodova(brojacPolja)==-1) return;
		else{
			switch(brojacPolja) {
			  case 4:
			    $("#brBrodCetiri").text(trenutniIgrac.getBrojBrodCetiri());
			    trenutniIgrac.dodajBrodUNizBrodova(brojacPolja);
			    break;
			  case 3:
			    $("#brBrodTri").text(trenutniIgrac.getBrojBrodTri());
			    trenutniIgrac.dodajBrodUNizBrodova(brojacPolja);
			    break;
			  case 2:
			    $("#brBrodDva").text(trenutniIgrac.getBrojBrodDva());
			    trenutniIgrac.dodajBrodUNizBrodova(brojacPolja);
			    break;
			  case 1:
			    $("#brBrodJedan").text(trenutniIgrac.getBrojBrodJedan());
			    trenutniIgrac.dodajBrodUNizBrodova(brojacPolja);
			    break;
			  default:
			    break;
			}
		}

		if(igrac1.sviBrodoviPostavljeni() && igrac2.sviBrodoviPostavljeni()){
			localStorage.setItem("igrac1", JSON.stringify(igrac1));
			localStorage.setItem("igrac2", JSON.stringify(igrac2));
			console.log(igrac1);
			console.log(igrac2);
			window.location.href = "battleship-game.html";
		}
		else if(trenutniIgrac.sviBrodoviPostavljeni() == 1){
			zamenaIgraca();
		}
		

	});

	$(".setUpPolje").mouseenter(function(event){
		if(window.misPritisnut==1){
			$(this).css("background-color", "#ff0000");

			var i=parseInt($(this).attr('id')[0]);
			var j=parseInt($(this).attr('id')[1]);
			/*console.log("i=" + i + " j=" + j);*/
			trenutniIgrac.matrica[i][j]++;
			trenutniIgrac.potezi.push({iDeo: i, jDeo:j});
			window.brojacPolja++;

		}
	});

	$(".setUpPolje").mousedown(function(event){

		if(window.misPritisnut==1){
			window.misPritisnut=0;
			window.trenutniIgrac.ponistiPolja(window.brojacPolja);
			window.brojacPolja=0;
			return;
		}

		window.misPritisnut=1;
		window.brojacPolja=0;

	  	$(this).css("background-color", "#ff0000");

		var i=parseInt($(this).attr('id')[0]);
		var j=parseInt($(this).attr('id')[1]);
		/*console.log("i=" + i + " j=" + j);*/
		window.trenutniIgrac.matrica[i][j]++;
		window.trenutniIgrac.potezi.push({iDeo: i, jDeo:j});
		brojacPolja++;
		event.stopPropagation();

	});

	$("#vratiPotezDugme").click(function(event) {
		window.trenutniIgrac.potezUnazad();
		setovanjeVrednosti();
	});

});

/*battleship-game.html*/
function setovanjeVrednostiGame(){
	//dohvatanje iz local storegea
	setovanjePodatakaGame();

	$("#trenutniIgrac").text(trenutniIgrac.getIme());

	//za podesavanje sirine i visine tabele sa br i slovima

	$(".slovo").width($("#209").width());
	$(".slovo").height($("#209").height());
	$(".slovo").css("text-align", "center");

	//podesavanje male table - tabla igraca koji gadja
	$("#mojaTabela td").height($("#209").height()/1.8);

	inicijalizacijaGameMatrica();

}


function setovanjePodatakaGame(){
	var jsonString = localStorage.getItem("igrac1");
	var igracPoslati1 = JSON.parse(jsonString);

	var jsonString2 = localStorage.getItem("igrac2");
	var igracPoslati2 = JSON.parse(jsonString2);

	window.igrac1 = new Igrac(igracPoslati1.ime);
	window.igrac2 = new Igrac(igracPoslati2.ime);

	igrac1.setMatrica(igracPoslati1.matrica);
	igrac2.setMatrica(igracPoslati2.matrica);

	igrac1.setNizBrod(1,igracPoslati1.nizBrodJedan);
	igrac1.setNizBrod(2,igracPoslati1.nizBrodDva);
	igrac1.setNizBrod(3,igracPoslati1.nizBrodTri);
	igrac1.setNizBrod(4,igracPoslati1.nizBrodCetiri);

	igrac2.setNizBrod(1,igracPoslati2.nizBrodJedan);
	igrac2.setNizBrod(2,igracPoslati2.nizBrodDva);
	igrac2.setNizBrod(3,igracPoslati2.nizBrodTri);
	igrac2.setNizBrod(4,igracPoslati2.nizBrodCetiri);

	igrac1.setvelicinaPoslDodatogBroda(igracPoslati1.velicinaPoslDodatogBroda);
	igrac2.setvelicinaPoslDodatogBroda(igracPoslati2.velicinaPoslDodatogBroda);

	window.trenutniIgrac=igrac1;

	console.log(igrac1);
	console.log(igrac2);
}

/*
*koristi se u battleship-game.html da bi pripremio kontekst za prvi potez
*/
function inicijalizacijaGameMatrica(){
	for (var i = 0; i < window.trenutniIgrac.matrica.length; i++) {
	  	for (var j = 0; j < window.trenutniIgrac.matrica.length; j++) {
	  		if(window.igrac1.matrica[i][j] == 1){
	  			$("#1"+i+j).css("background-color", "red");
	  		}
		}
	}
}

/*
*fja sluzi da zameni igraca1/igraca2 na mestu trenutnogIgraca u battleship-game.html
*/
function zamenaIgracaGame(){
	if(window.trenutniIgrac==window.igrac1){
			window.trenutniIgrac=window.igrac2;
		}
		else{
			window.trenutniIgrac=window.igrac1;
	}
}

/*
*fja sluzi da iscrtavanje matrice igraca i protivnika u battleship-game.html
*levi-trenutni igrac
*desni-protivnik
*/
function bojenjeMatriceGame(trenutniIgrac,protivnik){

	for (var i = 0; i < trenutniIgrac.matrica.length; i++) {
	  	for (var j = 0; j < trenutniIgrac.matrica.length; j++) {

	  		$("#1"+i+j).css("background-color", "transparent");
	  		$("#2"+i+j).css("background-color", "transparent");

	  		//trenutni igrac - mala matrica
	  		if(trenutniIgrac.matrica[i][j] == 1){ $("#1"+i+j).css("background-color", "#ff0000");}
	  		
	  		if(trenutniIgrac.promasaji[i][j] == 1){ $("#1"+i+j).css("background-color", "#ffc305");}
	  		if(trenutniIgrac.pogoci[i][j] == 1){ $("#1"+i+j).css("background-color", "black");}


	  		//protivnik - velika matrica
	  		if(protivnik.promasaji[i][j] == 1){ $("#2"+i+j).css("background-color", "#ffc305");}
	  		if(protivnik.pogoci[i][j] == 1){ $("#2"+i+j).css("background-color", "black");}

		}
	}
}

function potapanjeJednoPolje(i,j,protivnik){
	const exists = (element) => element.koordinate[0].iDeo==i && element.koordinate[0].jDeo==j;
	var index=protivnik.nizBrodJedan.findIndex(exists);
	if(index == -1) return -1;
	else return index;
}

function potapanjeDvaPolja(i,j,protivnik){
	const exists = (element) => (element.koordinate[0].iDeo==i && element.koordinate[0].jDeo==j) || (element.koordinate[1].iDeo==i && element.koordinate[1].jDeo==j);
	var index=protivnik.nizBrodDva.findIndex(exists);
	if(index == -1) return -1;
	else return index;
}

function potapanjeTriPolja(i,j,protivnik){
	const exists = (element) => (element.koordinate[0].iDeo==i && element.koordinate[0].jDeo==j) || (element.koordinate[1].iDeo==i && element.koordinate[1].jDeo==j)
	|| (element.koordinate[2].iDeo==i && element.koordinate[2].jDeo==j) || (element.koordinate[2].iDeo==i && element.koordinate[2].jDeo==j);
	var index=protivnik.nizBrodTri.findIndex(exists);
	if(index == -1) return -1;
	else return index;
}

function potapanjeCetiriPolja(i,j,protivnik){
	const exists = (element) => (element.koordinate[0].iDeo==i && element.koordinate[0].jDeo==j) || (element.koordinate[1].iDeo==i && element.koordinate[1].jDeo==j)
	|| (element.koordinate[2].iDeo==i && element.koordinate[2].jDeo==j) || (element.koordinate[2].iDeo==i && element.koordinate[2].jDeo==j) 
	|| (element.koordinate[3].iDeo==i && element.koordinate[3].jDeo==j);
	var index=protivnik.nizBrodCetiri.findIndex(exists);
	if(index == -1) return -1;
	else return index;
}


$(document).ready(function(){

	$("td").click(function(event) {
		event.stopPropagation();

		if(this.id<200) return;

		var i=parseInt($(this).attr('id')[1]);
		var j=parseInt($(this).attr('id')[2]);

		var protivnik;
		if(trenutniIgrac==igrac1) protivnik=igrac2;
		else protivnik=igrac1;

		if(protivnik.getPogodak(i,j)==1){
			return;	
		} 
		else if(protivnik.getPromasaj(i,j)==1){
			return;	
		}
		else{
			if(protivnik.matrica[i][j]==1){
				protivnik.setPogodak(i,j);
				$("#2"+i+j).css("background-color", "black");
				
				var potop = potapanjeJednoPolje(i,j,protivnik);
				if(potop != -1){
					protivnik.nizBrodJedan[potop].brPolja--;
				}
				potop = potapanjeDvaPolja(i,j,protivnik);
				if(potop != -1){
					protivnik.nizBrodDva[potop].brPolja--;
				} 
				potop = potapanjeTriPolja(i,j,protivnik);
				if(potop != -1){
					protivnik.nizBrodTri[potop].brPolja--;
				}
				potop = potapanjeCetiriPolja(i,j,protivnik);
				if(potop != -1){
					protivnik.nizBrodCetiri[potop].brPolja--;
				}

				protivnik.brPogodaka++;

				if(protivnik.brPogodaka==20){
					console.log("IGRA GOTOVA!");
					alert("POBEDNIK JE: " + trenutniIgrac.ime + "");
				}

				return;
			}
			else{
				protivnik.setPromasaj(i,j);

				$("#2"+i+j).css("background-color", "green");
				
				if(trenutniIgrac==igrac1){
					trenutniIgrac=igrac2;
					protivnik=igrac1;
				}
				else{
					trenutniIgrac=igrac1;
					protivnik=igrac2;				}

				$("#trenutniIgrac").text(trenutniIgrac.getIme());

				bojenjeMatriceGame(trenutniIgrac,protivnik);
			}
		}

	});
});

/*IGRAC*/
class Igrac {

		constructor(ime) {
		    this.ime = ime;
		    this.matrica = new Array(10);
		    this.promasaji = new Array(10);
		    this.pogoci = new Array(10);
		    this.inicijalizujMatricu();
		    this.potezi = [];
		    this.brPogodaka=0;

		    this.brodCetiri=1;
		    this.brodTri=2;
		    this.brodDva=3;
		    this.brodJedan=4;

		    this.nizBrodJedan = [];
		    this.nizBrodDva = [];
		    this.nizBrodTri = [];
		    this.nizBrodCetiri = [];

		    this.velicinaPoslDodatogBroda = [];
		}
		
		inicijalizujMatricu(){
		  	for (var i = 0; i < this.matrica.length; i++) {
			  	this.matrica[i] = new Array(10);
			  	this.promasaji[i] = new Array(10);
			  	this.pogoci[i] = new Array(10);
			  	for (var j = 0; j < this.matrica.length; j++) {
			  		this.matrica[i][j] = 0;
			  		this.promasaji[i][j] = 0;
			  		this.pogoci[i][j] = 0;
				}
			}
		}
		ponistiPolja(brojPolja){
		  	for (var i = 0; i < brojPolja; i++) {
			  	var potez = this.potezi.pop();
			  	this.matrica[potez.iDeo][potez.jDeo]--;
			  	if(this.matrica[potez.iDeo][potez.jDeo]==0){
			  		this.matrica[potez.iDeo][potez.jDeo]=0;
					$("#"+potez.iDeo+potez.jDeo).css("background-color","transparent");
					/*console.log("Ponisten potez: x=" + potez.jDeo + " y=" + potez.iDeo);*/
			  	}
			}
		}
		potezUnazad(){
			var brPolja = this.velicinaPoslDodatogBroda.pop();
			if(brPolja==undefined) {
				return;
			}
			this.ponistiPolja(brPolja);
			this.incBrBrodova(brPolja);
		}

		getPromasaj(i,j){
			return this.promasaji[i][j];
		}
		setPromasaj(i,j){
			this.promasaji[i][j]=1;
		}
		getPogodak(i,j){
			return this.pogoci[i][j];
		}
		setPogodak(i,j){
			this.pogoci[i][j]=1;
		}
		getPolje(i,j){
			return this.matrica[i][j];
		}
		setMatrica(matrix){
			for (var i = 0; i < this.matrica.length; i++) {
			  	for (var j = 0; j < this.matrica.length; j++) {
			  		this.matrica[i][j] = matrix[i][j];
				}
			}
		}
		setNizBrod(velicina,niz){
			switch(velicina) {
			  case 4:
			    this.nizBrodCetiri=niz;
			    break;
			  case 3:
			    this.nizBrodTri=niz;
			    break;
			  case 2:
			    this.nizBrodDva=niz;
			    break;
			  case 1:
			    this.nizBrodJedan=niz;
			    break;
			  default:
			    return -1;
			} 
			return 0;
		}
		setvelicinaPoslDodatogBroda(velicina){
			this.velicinaPoslDodatogBroda = velicina;
		} 


		getIme() {
		    return this.ime;
		}
		getBrojBrodCetiri(){
			return this.brodCetiri;
		}
		getBrojBrodTri(){
			return this.brodTri;
		}
		getBrojBrodDva(){
			return this.brodDva;
		}
		getBrojBrodJedan(){
			return this.brodJedan;
		}
		incBrBrodova(brPolja){
			switch(brPolja) {
			  case 4:
			    this.brodCetiri++;
			    break;
			  case 3:
			    this.brodTri++;
			    break;
			  case 2:
			    this.brodDva++;
			    break;
			  case 1:
			    this.brodJedan++;
			    break;
			  default:
			    return -1;
			} 
			return 0;
		}
		decBrBrodova(brPolja){
			switch(brPolja) {
			  case 4:
			    this.brodCetiri--;
			    break;
			  case 3:
			    this.brodTri--;
			    break;
			  case 2:
			    this.brodDva--;
			    break;
			  case 1:
			    this.brodJedan--;
			    break;
			  default:
			    return -1;
			} 
			return 0;
		}
		dodajBrodUNizBrodova(brojPolja){

			var koordinate = [];
			for (var i = 0; i < brojPolja; i++) {
			  	var potez = this.potezi[this.potezi.length-1 -i];
			  	koordinate.push(potez);	
			}

			switch(brojPolja) {
				  case 4:
				    this.nizBrodCetiri.push({koordinate: koordinate, brPolja:4});
				    this.velicinaPoslDodatogBroda.push(4);
				    break;
				  case 3:
				    this.nizBrodTri.push({koordinate: koordinate, brPolja:3});
				    this.velicinaPoslDodatogBroda.push(3);
				    break;
				  case 2:
				    this.nizBrodDva.push({koordinate: koordinate, brPolja:2});
				    this.velicinaPoslDodatogBroda.push(2);
				    break;
				  case 1:
				    this.nizBrodJedan.push({koordinate: koordinate, brPolja:1});
				    this.velicinaPoslDodatogBroda.push(1);
				    break;
				  default:
				    return -1;
			}
		}

		imaLiSlobodnogBroda(brPolja){
			switch(brPolja) {
			  case 4:
			    if(this.brodCetiri>0) return 1;
			    else return 0;
			    break;
			  case 3:
			    if(this.brodTri>0) return 1;
			    else return 0;
			    break;
			  case 2:
			    if(this.brodDva>0) return 1;
			    else return 0;
			    break;
			  case 1:
			    if(this.brodJedan>0) return 1;
			    else return 0;
			    break;
			  default:
			    return 0;
			} 
		}

		//da li su SVA polja selektovana po y-osi
		jeriY(brPolja){
			var array = [];
			for (var i = 1; i <=brPolja; i++) {
				array.push(this.potezi[this.potezi.length - i]);
			}
			var razlicitElement = null;
			razlicitElement = array.find(element => element.jDeo != array[0].jDeo);

			if(razlicitElement==undefined) return 1;
			else return 0;
		}
		//da li su SVA polja selektovana po x-osi
		jeriX(brPolja){
			var array = [];
			for (var i = 1; i <=brPolja; i++) {
				array.push(this.potezi[this.potezi.length - i]);
			}
			var razlicitElement = null;
			razlicitElement = array.find(element => element.iDeo != array[0].iDeo);

			if(razlicitElement==undefined) return 1;
			else return 0;
		}
		jeriPreklapanje(brPolja){
			var array = [];
			for (var i = 1; i <=brPolja; i++) {
				array.push(this.potezi[this.potezi.length - i]);
			}
			for (var i = 0; i < array.length; i++) {
				if(this.matrica[array[i].iDeo][array[i].jDeo]==2) return 1;
			}
			return 0;
		}
		jeriDodir(brPolja,jeriX){
			var array = [];
			for (var i = 1; i <=brPolja; i++) {
				array.push(this.potezi[this.potezi.length - i]);
			}
			if(array.length==1){
				return this.proveraJednoPolje(array);
			}

			if(jeriX){

				if(array[0].jDeo>array[array.length-1].jDeo){
					if((this.proveraPrvoX(array[array.length-1]) || this.proveraPoslednjeX(array[0]))) return 1;
				}else{
					if((this.proveraPrvoX(array[0]) || this.proveraPoslednjeX(array[array.length-1]))) return 1;
				}

				for (var i = 1; i <brPolja-1; i++) {
					var dodir = this.proveraObicnoPoljeX(array[i]);
					if(dodir) return 1;
				}
				return 0;
			}else{

				if(array[0].iDeo>array[array.length-1].iDeo){
					if((this.proveraPrvoY(array[array.length-1]) || this.proveraPoslednjeY(array[0]))) return 1;
				}else{
					if((this.proveraPrvoY(array[0]) || this.proveraPoslednjeY(array[array.length-1]))) return 1;
				}

				for (var i = 1; i <brPolja-1; i++) {
					var dodir = this.proveraObicnoPoljeY(array[i]);
					if(dodir) return 1;
				}
				return 0;
			}
			
		}
		
		proveraJednoPolje(niz){
			var polje = niz[0];
			return this.proveraIznadZauzeto(polje.iDeo,polje.jDeo) || this.proveraIspodZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraLevoZauzeto(polje.iDeo,polje.jDeo) || this.proveraDesnoZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraGoreLevoZauzeto(polje.iDeo,polje.jDeo) || this.proveraGoreDesnoZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraDoleLevoZauzeto(polje.iDeo,polje.jDeo) || this.proveraDoleDesnoZauzeto(polje.iDeo,polje.jDeo);
		}

		proveraPrvoX(polje){
			return this.proveraIznadZauzeto(polje.iDeo,polje.jDeo) || this.proveraIspodZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraLevoZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraGoreLevoZauzeto(polje.iDeo,polje.jDeo) || this.proveraDoleLevoZauzeto(polje.iDeo,polje.jDeo);
		}
		proveraPoslednjeX(polje){
			return this.proveraIznadZauzeto(polje.iDeo,polje.jDeo) || this.proveraIspodZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraDesnoZauzeto(polje.iDeo,polje.jDeo) 
			|| this.proveraGoreDesnoZauzeto(polje.iDeo,polje.jDeo) || this.proveraDoleDesnoZauzeto(polje.iDeo,polje.jDeo);
		}
		proveraObicnoPoljeX(polje){
			return this.proveraIznadZauzeto(polje.iDeo,polje.jDeo) || this.proveraIspodZauzeto(polje.iDeo,polje.jDeo);
		}

		proveraPrvoY(polje){
			return this.proveraIznadZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraLevoZauzeto(polje.iDeo,polje.jDeo) || this.proveraDesnoZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraGoreLevoZauzeto(polje.iDeo,polje.jDeo) || this.proveraGoreDesnoZauzeto(polje.iDeo,polje.jDeo);
		}
		proveraPoslednjeY(polje){
			return this.proveraIspodZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraLevoZauzeto(polje.iDeo,polje.jDeo) || this.proveraDesnoZauzeto(polje.iDeo,polje.jDeo)
			|| this.proveraDoleLevoZauzeto(polje.iDeo,polje.jDeo) || this.proveraDoleDesnoZauzeto(polje.iDeo,polje.jDeo);
		}
		proveraObicnoPoljeY(polje){
			return this.proveraLevoZauzeto(polje.iDeo,polje.jDeo) || this.proveraDesnoZauzeto(polje.iDeo,polje.jDeo);
		}

		proveraIznadZauzeto(i,j){
			if(i==0) return 0;
			else{
				if(this.matrica[i-1][j]==1) return 1;
				else return 0;
			} 
		}
		proveraIspodZauzeto(i,j){
			if(i==9) return 0;
			else{
				if(this.matrica[i+1][j]==1) return 1;
				else return 0;
			} 
		}
		proveraLevoZauzeto(i,j){
			if(j==0) return 0;
			else{
				if(this.matrica[i][j-1]==1) return 1;
				else return 0;
			} 
		}
		proveraDesnoZauzeto(i,j){
			if(j==9) return 0;
			else{
				if(this.matrica[i][j+1]==1) return 1;
				else return 0;
			} 
		}
		proveraGoreLevoZauzeto(i,j){
			if(i==0 || j==0) return 0;
			else{
				if(this.matrica[i-1][j-1]==1) return 1;
				else return 0;
			} 
		}
		proveraGoreDesnoZauzeto(i,j){
			if(i==0 || j==9) return 0;
			else{
				if(this.matrica[i-1][j+1]==1) return 1;
				else return 0;
			} 
		}
		proveraDoleLevoZauzeto(i,j){
			if(i==9 || j==0) return 0;
			else{
				if(this.matrica[i+1][j-1]==1) return 1;
				else return 0;
			} 
		}
		proveraDoleDesnoZauzeto(i,j){
			if(i==9 || j==9) return 0;
			else{
				if(this.matrica[i+1][j+1]==1) return 1;
				else return 0;
			} 
		}

		sviBrodoviPostavljeni(){
			if(this.brodCetiri==0 && this.brodTri==0 && this.brodDva==0 && this.brodJedan==0) return 1;
			else return 0;
		}

	}