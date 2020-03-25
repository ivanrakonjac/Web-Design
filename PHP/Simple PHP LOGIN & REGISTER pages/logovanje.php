<?php 
	session_start();
	$message='';
	//connect to the server and select database
	$db=mysqli_connect("localhost","root","","login");

	$username = mysqli_real_escape_string($db,$_SESSION['username']);
	echo "$username<br>";

	$password = mysqli_real_escape_string($db,$_SESSION['password']);
	echo "$password<br>";

	$query="SELECT * FROM users WHERE username='$username' AND password='$password'";
	$result=mysqli_query($db,$query);

	if (mysqli_num_rows($result) == 1){
		$row=mysqli_fetch_row($result);
		
		echo "ID usera: $row[0]<br/>";
		echo "Username iz baze: $row[1]<br/>";
		echo "Password iz baze: $row[2]<br/>";

		$userNameDB=$row[1];
		$passwordDB=$row[2];

		if(!strnatcmp($username,$userNameDB) && !strnatcmp($password,$passwordDB)){
			$message = "You are now logged in";
			$username = $username;
			echo $message . " " . $username;	
		}
		else{
			$message = "NE ME RE  <br/> ODBIJ";
			echo $message;	
		}
		
		
	}
	else{
		$message = "NE ME RE  <br/> ODBIJ";
		echo $message;
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Dobrodosli</title>
</head>
<body>

</body>
</html>