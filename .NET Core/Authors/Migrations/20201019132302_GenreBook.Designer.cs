﻿// <auto-generated />
using Authors.Models.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Authors.Migrations
{
    [DbContext(typeof(AuthorsContext))]
    [Migration("20201019132302_GenreBook")]
    partial class GenreBook
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Authors.Models.Database.Author", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("country")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("firstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("lastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("authors");

                    b.HasData(
                        new
                        {
                            id = 1,
                            country = "United States",
                            firstName = "Pierce",
                            lastName = "Brown"
                        });
                });

            modelBuilder.Entity("Authors.Models.Database.AuthorBook", b =>
                {
                    b.Property<int>("authorId")
                        .HasColumnType("int");

                    b.Property<int>("bookId")
                        .HasColumnType("int");

                    b.HasKey("authorId", "bookId");

                    b.HasIndex("bookId");

                    b.ToTable("authorBook");

                    b.HasData(
                        new
                        {
                            authorId = 1,
                            bookId = 1
                        });
                });

            modelBuilder.Entity("Authors.Models.Database.Book", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("genreId")
                        .HasColumnType("int");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.HasIndex("genreId");

                    b.ToTable("books");

                    b.HasData(
                        new
                        {
                            id = 1,
                            genreId = 1,
                            name = "Red rising"
                        });
                });

            modelBuilder.Entity("Authors.Models.Database.Genre", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("genres");

                    b.HasData(
                        new
                        {
                            id = 1,
                            name = "Science fiction"
                        });
                });

            modelBuilder.Entity("Authors.Models.Database.AuthorBook", b =>
                {
                    b.HasOne("Authors.Models.Database.Author", "author")
                        .WithMany()
                        .HasForeignKey("authorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Authors.Models.Database.Book", "book")
                        .WithMany("authorBookList")
                        .HasForeignKey("bookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Authors.Models.Database.Book", b =>
                {
                    b.HasOne("Authors.Models.Database.Genre", "genre")
                        .WithMany("books")
                        .HasForeignKey("genreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
