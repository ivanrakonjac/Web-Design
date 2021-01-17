using Microsoft.EntityFrameworkCore;

namespace ImagePreview.Models {
    public class ImagePreviewContext : DbContext {
        public DbSet<Image> images { get; set; }
        public ImagePreviewContext ( DbContextOptions options ) : base ( options ) { }
    }
}