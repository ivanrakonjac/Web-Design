using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ImagePreview.Models{
    public class Image {
        [Key]
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public byte[] data { get; set; }
    }

    public class ImageConfiguration : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
            builder.Property ( image => image.id )
                .ValueGeneratedOnAdd ( );
        }
    }
}