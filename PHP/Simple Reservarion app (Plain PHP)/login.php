<?php include "head.php"; //session_start je ovde

if(isset($_POST['u'])){
    $st = $pdo->prepare("select * from users where username=? and password=?");
    $st->execute([$_POST['u'], $_POST['p']]);
    $u = $st->fetch();
    if($u){
        $_SESSION['ulogovan'] = true;
        $_SESSION['userdata'] = $u;

        header("Location: rezervacije.php");
    } else {
        echo "Login nije uspeo";
    }

}


?>



<form method="post" action="login.php">
<input type="text" name="u">
<input type="password" name="p">
<button>Login</button>
</form>

</body>
</html>