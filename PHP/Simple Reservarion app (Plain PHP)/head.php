<?php
session_start();

 $host = 'localhost';
 $db   = 'zadatak1';
 $user = 'root';
 $pass = '';
 $charset = 'utf8mb4';

 $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

 try {
     $pdo = new PDO($dsn, $user, $pass);
 } catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
 }
?>
<html>
<head>
    <title>Petar Prvulovic</title>
</head>
<body>
    <nav>
        <a href="index.php">Pocetna</a>
        <a href="rezervacija.php">Rezervacija</a>


        <a href="rezervacije.php">Rezervacije</a>

        <a href="login.php">Login</a>

    </nav>