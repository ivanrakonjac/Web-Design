<?php include "head.php";

if(!isset($_SESSION['ulogovan'])){
    echo 'Greska: zabranjen pristup'; die();
}



if( isset($_GET['novistatus']) ){
   $id = intval($_GET['id']);
   $novi = $_GET['novistatus'];

   $st = $pdo->prepare("update rezervacije set status=? where id=?")->execute([ $novi, $id ]);
}

?>

<?php 
$rezervacije = $pdo->query("select rezervacije.*, vozila.naziv from rezervacije join vozila on vozila.id=rezervacije.vozilo_id ")->fetchAll();

foreach($rezervacije as $r){
    ?>
    <p>
    <?= $r['datum_od'] ?> <?= $r['datum_do'] ?>
    <br>
    <?= $r['ime_prezime'] ?> <?= $r['telefon'] ?>
    <br>
    <?= $r['vozilo_id'] ?> <?= $r['naziv'] ?>
    <br>
    <?= $r['status'] ?>
    <br>
    <?php if($r['status']=='u obradi'){ ?>
        <a href="rezervacije.php?id=<?= $r['id'] ?>&novistatus=prihvaceno">Prihvati</a>
        <a href="rezervacije.php?id=<?= $r['id'] ?>&novistatus=odbijeno">Odbij</a>
    <?php } ?>
    </p>
    <hr>
    <?php
}
?>


</body>
</html>