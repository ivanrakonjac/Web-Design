<?php 
	session_start();
	$message='';
	//connect to the server and select database
	$db=mysqli_connect("localhost","root","","login");

	$username = mysqli_real_escape_string($db,$_SESSION['username']);

	$password = mysqli_real_escape_string($db,$_SESSION['password']);

	$query="INSERT INTO users(username,password) VALUES('$username','$password')";
	mysqli_query($db,$query);

	$message = "Uspesno ste registrovani";
	$username = $username;
	echo $message . " " . $username;
	header("location: logujSe.php");

?>