using Microsoft.EntityFrameworkCore.Migrations;

namespace Authors.Migrations
{
    public partial class GenreBook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "genres",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_genres", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "books",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(nullable: false),
                    genreId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_books", x => x.id);
                    table.ForeignKey(
                        name: "FK_books_genres_genreId",
                        column: x => x.genreId,
                        principalTable: "genres",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "authorBook",
                columns: table => new
                {
                    authorId = table.Column<int>(nullable: false),
                    bookId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_authorBook", x => new { x.authorId, x.bookId });
                    table.ForeignKey(
                        name: "FK_authorBook_authors_authorId",
                        column: x => x.authorId,
                        principalTable: "authors",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_authorBook_books_bookId",
                        column: x => x.bookId,
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "genres",
                columns: new[] { "id", "name" },
                values: new object[] { 1, "Science fiction" });

            migrationBuilder.InsertData(
                table: "books",
                columns: new[] { "id", "genreId", "name" },
                values: new object[] { 1, 1, "Red rising" });

            migrationBuilder.InsertData(
                table: "authorBook",
                columns: new[] { "authorId", "bookId" },
                values: new object[] { 1, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_authorBook_bookId",
                table: "authorBook",
                column: "bookId");

            migrationBuilder.CreateIndex(
                name: "IX_books_genreId",
                table: "books",
                column: "genreId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "authorBook");

            migrationBuilder.DropTable(
                name: "books");

            migrationBuilder.DropTable(
                name: "genres");
        }
    }
}
