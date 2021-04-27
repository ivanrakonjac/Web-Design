<?php include "head.php" ?>

<?php 
$vozila = $pdo->query("Select * from vozila")->fetchAll();

foreach($vozila as $vozilo){
    ?>
    <h1><?= $vozilo['naziv'] ?></h1>
    <p><?= $vozilo['boja'] ?></p>
    <hr>
    <?php
}
?>

</body>
</html>