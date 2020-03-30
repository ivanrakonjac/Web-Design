<?php
	class Fruit {
	  		private $name;
			private $color;

		  function __construct($name) {
		    $this->name = $name;
		  }
		  function get_name() {
		    return $this->name;
		  }
		  function __destruct() {
		    echo "__destruct() for {$this->name}<br>";	
		  }
		  public function message()
		  {
				echo "Cao ja sam klasa VOCE<br>";

		  }
	}

	class Lubenica extends Fruit {
		final public function message(){
			echo "Cao ja sam LUBENICA<br>";
		}
	}

$apple = new Fruit("Apple");
echo $apple->get_name(), "<br>";
echo $apple->message(), "<br>";

$lubenica = new Lubenica("LUBENICA");
echo $lubenica->message();

//Konstante
class Goodbye {
  const LEAVING_MESSAGE = "Thank you for visiting W3Schools.com!";
  public function byebye() {
    echo self::LEAVING_MESSAGE;
  }
}

echo Goodbye::LEAVING_MESSAGE;


//Magic methods

echo "<br>-------------------------------------------<br>";

class ime {
	private $atr;

	function __construct($atr) {
	    $this->atr = $atr;
	  }

	function __get($imeatributa){
		return $this->$imeatributa;
	}

	function __set($imeatributa,$novaVrednost){
		$this->$imeatributa=$novaVrednost;
	}

	function __toString(){
		return "ime: $this->atr<br>";
	}
}

$a=new ime("Test");
$a->atr="Drugo ime";
echo "$->atr<br>";

$a->totalnoNoviAtribut="noviAtribut"; //doda novi atribut u objekat a, ali samo u taj objekat, ne u celu klasu
echo $a->totalnoNoviAtribut, "<br>";

$b=new ime("Test2");
echo "$b->atr<br>";
echo $b->totalnoNoviAtribut, "<br>"; //baca gresku, jer nema tog atributa
echo "$b";

//Overriding
class A{
	
	var $atr = "Stara vrednost";
	function operacija(){
		echo "nesto<br>";
		echo "Vrednost je $this->atr<br>";
	}
}

class B extends A
{
	var $atr = "Nova vrednost";
	function operacija(){
		echo "nest drugo<br>";
		echo "Vrednost je $this->atr<br>";
	}
}

$a=new A();
$a->operacija();

$b=new B();
$b->operacija();

//Parent

class C
{
	private $pri1;
	public function __construct($vrednost)
	{
		$this->pri1=$vrednost;
	}
	function op1(){
		echo "C::op1()<br>";
		$this->pri1='a';
		echo "$this->pri1<br>";
	}

	final function fjaBezNasledjivanja(){
		echo "fjaBezNasledjivanja<br>";
	}
}


class D extends C
{
	
	public function __construct($vrednost)
	{
		parent::__construct($vrednost);
	}

	function op1(){
		echo "D::op1()<br>";
		parent::op1();
	}

	/*function fjaBezNasledjivanja(){	//da nije zakomentarisana, ova bi greska bila ispisana
		echo "fjaBezNasledjivanja<br>"; //Cannot override final method C::fjaBezNasledjivanja() in C:\xampp\htdocs\Projekti\PHP_ucenje\PHP_OOP.php on line 141
	}*/
}

$c=new C("ParentKlasa");
$c->op1();

$d=new D("Child klasa");
$d->op1();

//Self

class pi {
  public static $value=3.14159;
  public function staticValue() {
    return Static::$value;        //moze i pi::$value
    							//da je bez self::, javljao bi gresku
  }
}

$pi = new pi();
echo $pi->staticValue(), "<br>"; 

//Self:: vs static::
class Foo
{
    protected static $bar = 1234;
     public static function instance()
    {
        echo self::$bar, "<br>"; //self se vezuje za klasu u kojoj je funkcija <=> Foo::$bar
        echo static::$bar, "<br>";	//static dinamicki referencira klasu => vratice vrednost $variable definisane u klasi iz koje je fja pozvana
    }
}

class Bar extends Foo
{
    protected static $bar = 4321;
}

class Bar2 extends Bar
{
    protected static $bar = 6789;
}

$foo = new Foo();
$foo->instance();

$bar = new Bar();
$bar->instance();

$bar2 = new Bar2();
$bar2->instance();


//Primena ovoga: for creating Base classes for Singleton Classes:
class Roditelj { // Base Class
    protected static $name = 'moje ime A';
    public static function getName() {
        return static::$name;
    }
}
class Dete extends Roditelj {
    protected static $name = 'MyCustomNameB';
}
class Dete2 extends Roditelj {
    protected static $name = 'MyCustomNameC';
}

echo Dete::getName(), "<br>"; // MyCustomNameB
echo Dete2::getName(), "<br>"; // MyCustomNameC


//Izuzeci

try{
	throw new Exception('Greska!!!',42);
}catch (Exception $e){
	echo 'Exception '.$e->getCode().' : '.$e->getMessage() ." u fajlu ". $e->getFile(). "na liniji "."<b>". $e->getLine(). "</b><br>";
}

?>