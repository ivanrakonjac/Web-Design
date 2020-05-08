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