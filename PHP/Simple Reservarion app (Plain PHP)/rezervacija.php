<?php include "head.php" ?>
<?php
if( isset($_POST['ime_prezime']) ){
    //obradjujemo rezervaciju
    $svapolja = true;
    if(!isset($_POST['datum_od'])){
        $svapolja = false;
    }
    if(!isset($_POST['datum_do'])){
        $svapolja = false;
    }
    if(!isset($_POST['telefon'])){
        $svapolja = false;
    }
    if(!isset($_POST['vozilo_id'])){
        $svapolja = false;
    }

    if(!$svapolja){
        echo 'greska';
    } else {
        $st=$pdo->prepare("insert into rezervacije values (NULL, ?,?,?,?,?,?)");
        $st->execute([ $_POST['datum_od'], $_POST['datum_do'], $_POST['ime_prezime'], $_POST['telefon'], $_POST['vozilo_id'], 'u obradi' ]);
        header("Location: index.php");
        die();
    }
}
?>

<?php 
$vozila = $pdo->query("Select * from vozila")->fetchAll();
?>

<form method="post" action="rezervacija.php">

<label>Od: </label>
<input type="date" name="datum_od">
<br>
<label>Do: </label>
<input type="date" name="datum_do">
<br>
<label>Ime i prezime: </label>
<input type="text" name="ime_prezime">
<br>
<label>Telefon: </label>
<input type="text" name="telefon">
<br>
<label>Vozilo: </label>
<select name="vozilo_id">
  <?php foreach($vozila as $vozilo){ ?>
    <option value="<?= $vozilo['id'] ?>"><?=  $vozilo['naziv'] ?></option>
  <?php } ?>
</select>
<button>Rezervisi</button>
</form>

</body>
</html>