using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Authors.Models;
using Authors.Models.Database;

namespace Authors.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private AuthorsContext context;

        public HomeController(ILogger<HomeController> logger, AuthorsContext context)
        {
            _logger = logger;
            this.context = context;
        }

        public IActionResult Index()
        {
            Random random = new Random();
            int n = random.Next();
            return View(n);
        }

        public IActionResult Authors ( ) {
            return View(this.context.authors.ToList());
        }

        public IActionResult HelloWorld()
        {
            Random random = new Random();
            int n = random.Next() % 20;
            return View(n);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
