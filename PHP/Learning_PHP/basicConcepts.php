<!DOCTYPE html>
<html>
<head>
	<title>Proba PHP</title>
</head>
<body>
	<?php
		$a=2;
		$b=3;
		function proba(){
			$a=10;
			echo "Vrednost a u fji proba() je $a.";
		}
		proba();

		echo "Vrednost a van fje je $a.<br/>";
		echo $a + $b , "<br/>";
		var_dump($a+$b);
		echo "<br/>";

		$cars = array("Volvo","BMW","Toyota",2,5,"Ivan");
		var_dump($cars);
		echo "<br/>";

		class Kamion{
			function Kamion(){
				$this->model = "FAP";
			}
		}

		$vojniKamion = new Kamion();
		echo "Marka vozila: ", $vojniKamion->model , "<br/>";

		$x = null;
		var_dump($x);
		echo "<br/>";

		//Stringovi-----------------------------------------
		echo "strlen(\"Hello world!\") je ", strlen("Hello world!"), "<br/>";
		echo "str_word_count(\"Hello world!\") je ", str_word_count("Hello world!"), "<br/>";	
		echo "strrev(\"Hello world!\") je ", strrev("Hello world!"), "<br/>";

		/*The PHP strpos() function searches for a specific text within a string. If a match is found, the function returns the character position of the first match. If no match is found, it will return FALSE.*/
		echo "strpos(\"Hello world!\", \"world\") je ", strpos("Hello world!", "world"), "<br/>";

		echo "str_replace(\"world\", \"Dolly\", \"Hello world!\") je ",str_replace("world", "Dolly", "Hello world!"),"<br/>";

		//Koristan link: https://www.w3schools.com/php/php_ref_string.asp

		echo "Koristan link: https://www.w3schools.com/php/php_ref_string.asp<br>";

		//Numbers---------------------------------------------

		echo "<br>---------------------------------------------Numbers---------------------------------------------<br>";

		$x = 5985;
		var_dump(is_int($x));
		echo "<br>" , is_long($x),"<br>";

		$x = 10.365;
		var_dump(is_float($x));

		echo "<br>PHP_FLOAT_MAX = ", PHP_FLOAT_MAX, "<br>";

		$x = 1.9e411;
		var_dump($x);
		echo "<br>";

		echo "NAN is used for impossible mathematical operations.<br>";
		$x = acos(8);
		echo "acos(8) = " ,var_dump($x),"<br>";


		echo "<br>is_numeric(\$x) vraca da li je x broj ili ne<br>";
		$x = "59.85" + 100;
		var_dump(is_numeric($x));

		echo "<br>";

		$x = "Hello";
		var_dump(is_numeric($x));

		echo "<br>Castovi<br>";
		// Cast float to int
		$x = 23465.768;
		$int_cast = (int)$x;
		echo $int_cast;

		echo "<br>";

		// Cast string to int
		$x = "23465.768";
		$int_cast = (int)$x;
		echo $int_cast;

		//Constants---------------------------------------------

		echo "<br>---------------------------------------------Constants---------------------------------------------<br>";

		define("GREETING", "Welcome to W3Schools.com!", true); //ovo true je da bi ime bilo case-insensitive
		echo greeting, "<br>";

		echo "<br> Constants array <br>";
		define("cars", [
		    "Alfa Romeo",
		    "BMW",
		    "Toyota"
		]);

		for ($i = 0; $i<=2; $i++) {
				echo cars[$i], "<br>";	
		}

		echo "<br>Constants are automatically global and can be used across the entire script.<br>";

		//Operators---------------------------------------------

		echo "<br>---------------------------------------------Operators---------------------------------------------<br>";

		echo "<br> ** Exponentiation<br>";
		$temp = 5%2;
		echo "2**4 = " , $temp;

		echo "<br> === Returns true if \$x is equal to \$y, and they are of the same type<br>";
		
		$x = 100;  
		$y = "100";
		
		var_dump($x === $y); 	

		echo "<br> <=> 		Returns an integer less than, equal to, or greater than zero, depending on if $x is less than, equal to, or greater than $y.Introduced in PHP 7.<br>";

		$x = 5;  
		$y = 10;

		echo ($x <=> $y); // returns -1 because $x is less than $y
		echo "<br>";

		echo "<br>String operator . <br>";

		$txt1 = "Hello";
		$txt2 = " world!";
		$txt3 = $txt1 . $txt2;  //konkatenira stringove
		echo '$txt1 . $txt2 = ', $txt3, "<br>";

		//skracena verzija
		$txt1 .= $txt2;
		echo '$txt1 .= $txt2 =>', $txt1, "<br>";

		//PHP Array Operators
		echo "<br>PHP Array Operators<br>";

		echo "<br> + Operator <br>";
		$x = array("a" => "red", "b" => "green");  
		$y = array("c" => "blue", "d" => "yellow", "f" => "sand"); 
		$z = $x + $y; 
		print_r($z);

		echo "<br> == Operator <br>";
		echo "Returns true if \$a and \$b have the same key/value pairs<br>";

		$a = array("a" => "red", "b" => "blue");  
		$b = array("a" => "red", "b" => "blue");  
		var_dump($a == $b);

		echo "<br> \$x === \$y 	Returns true if \$x and \$y have the same key/value pairs in the same order and of the same types<br>";

		//PHP Conditional Assignment Operators

		echo "<br>PHP Conditional Assignment Operators<br>";
		// if empty($user) = TRUE, set $status = "anonymous"
	   echo $status = (empty($user)) ? "anonymous" : "logged in";
	   echo("<br>");

	   $user = "John Doe";
	   // if empty($user) = FALSE, set $status = "logged in"
	   echo $status = (empty($user)) ? "anonymous" : "logged in";


	   //Switch---------------------------------------------
		echo "<br>---------------------------------------------Switch---------------------------------------------<br>";

	    $favcolor = "red";

		switch ($favcolor) {
		case "red":
		    echo "Your favorite color is red!";
		    break;
		case "blue":
		    echo "Your favorite color is blue!";
		    break;
		case "green":
		    echo "Your favorite color is green!";
		    break;
		default:
		    echo "Your favorite color is neither red, blue, nor green!";
		}
		echo "<br>";


		//PHP Arrays---------------------------------------------

		echo "<br>---------------------------------------------PHP Arrays---------------------------------------------<br>";

		$cars = array("Volvo", "BMW", "Toyota"); // u sustini se poziva konsturktor array() sa vrednostima
		echo "I like " . $cars[0] . ", " . $cars[1] . " and " . $cars[2] . ".<br>";

		echo "<br>In PHP, there are three types of arrays:<br>";
	    echo "*Indexed arrays - Arrays with a numeric index<br>";
	    echo "*Associative arrays - Arrays with named keys<br>";
	    echo "*Multidimensional arrays - Arrays containing one or more arrays<br>";

	    echo "<br>The count() function is used to return the length (the number of elements) of an array:<br>";
	    echo count($cars), "<br>";

	    echo "<br>Loop Through an Indexed Array cars<br>";
	    for($x = 0; $x < count($cars); $x++) {
    		echo $cars[$x];
    		echo "<br>";
		}	

		foreach ($cars as $key => $value) {
			echo 'Key = ', "$key", ' | Value = ', $value, "<br>";
		}

		echo "<br>PHP Associative Arrays<br>";

		$age = array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
		echo 'age[Peter] = ', $age['Peter'], "<br>";

		foreach($age as $x => $x_value) {
    		echo "Key=" . $x . ", Value=" . $x_value;
    		echo "<br>";
		}

		echo "<br>PHP - Two-dimensional Arrays<br>";
		$cars = array
		  (
		  array("Volvo",22,18),
		  array("BMW",15,13),
		  array("Saab",5,2),
		  array("Land Rover",17,15)
		  );

		  foreach ($cars as $key => $value) {
		  	foreach ($value as $key2 => $value2) {
		  		echo "key = $key2 | value = $value2 <br>";
		  	}
		  	echo "********************<br>";
		  }

		  echo "<br> print_r — Prints human-readable information about a variable<br>";
		  print_r($cars);

		//PHP Superglobals---------------------------------------------
		echo "<br>---------------------------------------------PHP Superglobals---------------------------------------------<br>";

		echo "<br>The PHP superglobal variables are:<br>";
		echo "	\$GLOBALS<br>
    			\$_SERVER<br>
			    \$_REQUEST<br>
			    \$_POST<br>
			    \$_GET<br>
			    \$_FILES<br>
			    \$_ENV<br>
			    \$_COOKIE<br>
			    \$_SESSION<br>";

		echo "<br>PHP \$GLOBALS<br>";
		echo "\$GLOBALS is a PHP super global variable which is used to access global variables from anywhere in the PHP script (also from within functions or methods).<br>";

		echo "<br>PHP \$_SERVER<br>";
		echo "\$_SERVER is a PHP super global variable which holds information about headers, paths, and script locations.<br>";

		echo $_SERVER['PHP_SELF'];
		echo "<br>";
		echo $_SERVER['SERVER_NAME'];
		echo "<br>";
		echo $_SERVER['HTTP_HOST'];
		echo "<br>";
		echo $_SERVER['HTTP_REFERER'];
		echo "<br>";
		echo $_SERVER['HTTP_USER_AGENT'];
		echo "<br>";
		echo $_SERVER['SCRIPT_NAME'];
		echo "<br>";
		echo $_SERVER['SERVER_ADMIN'];

	?>
</body>
