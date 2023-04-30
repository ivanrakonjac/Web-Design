package hello;

public class HelloService {
	
	private static final HelloService instace = new HelloService();
	
	public static HelloService getInstace() {
		return instace;
	}
	
	public void sayHello(String name) {
		System.out.println("Hello " + name + " from HelloService!");
	}
	
}
