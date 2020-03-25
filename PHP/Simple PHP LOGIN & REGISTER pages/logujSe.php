<!DOCTYPE html>
<html>
<head>
	<title>Register</title>
	<link rel="stylesheet" type="text/css" href="stil.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
</head>
<body>
	<div class="header zaglavlje text-center"><h1>LOGIN</h1></div>
	<div class="container-md kontejner p-5 rounded">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6 p-5 kontForma">
				<form action="logovanje.php" method="post">
	    			<div class="form-group">
	      				<label for="username" class="labela">Username:</label>
	      				<input type="text" class="form-control" id="username" placeholder="Enter username" name="username">
	    			</div>
	    			<div class="form-group">
	      				<label for="password" class="labela">Password:</label>
	      				<input type="password" class="form-control" id="password" placeholder="Enter password" name="password">
	    			</div>
	    			<div class="col-sm-12 text-center"><button type="submit" class="registrujMeDugme">PRIJAVI ME</button></div>
    			</form>
			</div>
			<div class="col-md-3"></div>
		</div>
	</div>
</body>
</html>