using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace MvcMovie.Controllers
{
    public class HelloWorldController : Controller
    {
        // 
        // GET: /HelloWorld/

        public string Index()
        {
            return "This is my default action...";
        }

        
        // GET: /HelloWorld/Welcome/ 
        // Requires using System.Text.Encodings.Web; => 
        // https://localhost:{PORT}/HelloWorld/Welcome?name=Rick&numtimes=4
        public string Welcome(string name, int numTimes = 1)
        {
            return HtmlEncoder.Default.Encode($"Hello {name}, NumTimes is: {numTimes}");
        }

        // https://localhost:{PORT}/HelloWorld/Welcome/3?name=Rick
        // 3 ce biti uhvacena kao id jer je to opcioni parametar (definisano u Startup.cs)
        public string Welcome2(string name, int ID = 1)
        {
            return HtmlEncoder.Default.Encode($"Hello {name}, ID: {ID}");
        }
    }
}