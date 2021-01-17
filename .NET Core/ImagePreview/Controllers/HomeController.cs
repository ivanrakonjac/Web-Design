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
using Microsoft.EntityFrameworkCore;

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

        public async Task<ImageViewModel> GetImageViewModel ( int index ){
            List<Image> images = await this.context.images.ToListAsync ( ) ;

            Image image = images.ElementAt ( index );

            //br slika u bazi
            int count = images.Count;

            ImageViewModel imageViewModel = new ImageViewModel ( ) {
                name = image.name,
                base64Data = Convert.ToBase64String ( image.data ),
                next = ( index + 1 ) < count ? index + 1 : -1,
                previous = ( index - 1 ) >= 0 ? index - 1 : -1
            };

            return imageViewModel;
        }

        public async Task<IActionResult> Index ( )
        {
            ImageViewModel imageViewModel = await this.GetImageViewModel ( 0 );
            return View( imageViewModel );
        }

        public async Task<IActionResult> GetImage ( int index )
        {
            ImageViewModel imageViewModel = await this.GetImageViewModel ( index );
            return PartialView( "ImageView", imageViewModel );
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
