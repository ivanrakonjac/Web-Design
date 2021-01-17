using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ImagePreview.Models;
using ImagePreview.Models.View;
using System.IO;

namespace ImagePreview.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private ImagePreviewContext context;

        public HomeController(ILogger<HomeController> logger, ImagePreviewContext context)
        {
            _logger = logger;
            this.context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult AddImage ( ) {
            return View();
        }    

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddImage ( AddImageModel model ) {

            if( !ModelState.IsValid ){
                return View ( model );
            }

            using ( BinaryReader reader = new BinaryReader ( model.file.OpenReadStream ( ) ) ){
                Image image = new Image ( ) {
                    name = model.name,
                    data = reader.ReadBytes ( Convert.ToInt32 ( reader.BaseStream.Length ) )
                };

                await this.context.images.AddAsync ( image );
                await this.context.SaveChangesAsync ( );
            }

            return RedirectToAction ( nameof ( HomeController.Index ) );
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        
    }
}
