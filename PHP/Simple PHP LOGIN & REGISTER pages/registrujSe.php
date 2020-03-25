<?php
	session_start();
	$username=""; $usernameErr="";
	$password=""; $passwordErr="";
	$praznoPolje=false;

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (empty($_POST["username"])) {
		    $usernameErr = "Name is required";
		    $praznoPolje=true;
		}else{
			$username=test_input($_POST["username"]);
			$usernameErr="";
		}

		if (empty($_POST["password"])) {
		    $passwordErr = "Password is required";
		    $praznoPolje=true;
		}else{
			$password=test_input($_POST["password"]);
			$passwordErr="";
		}

		if($praznoPolje==false){
		    header("location: registracija.php");
		    $_SESSION['username']=$username;
		    $_SESSION['password']=$password;
		}
		else{
		    $praznoPolje=false;
		}
	}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>


<!DOCTYPE html>
<html>
<head>
	<title>Register</title>
	<link rel="stylesheet" type="text/css" href="stil.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
</head>
<body>
	<div class="header zaglavlje text-center"><h1>REGISTRACIJA</h1></div>
	<div class="container-md kontejner p-5 rounded">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6 p-5 kontForma">
				<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
	    			<div class="form-group">
	      				<label for="username" class="labela">Username:</label>
	      				<input type="text" class="form-control" placeholder="Enter username" name="username" value="<?php echo $username;?>">
	      				<p class="textGreska"><?php echo $usernameErr;?></p>
	    			</div>
	    			<div class="form-group">
	      				<label for="password" class="labela">Password:</label>
	      				<input type="password" class="form-control" placeholder="Enter password" name="password" value="<?php echo $password;?>">
	      				<p class="textGreska"><?php echo $passwordErr;?></p>
	    			</div>
	    			<div class="col-sm-12 text-center"><button type="submit" class="registrujMeDugme">REGISTRUJ ME</button></div>
    			</form>
			</div>
			<div class="col-md-3"></div>
		</div>
	</div>
</body>
</html>