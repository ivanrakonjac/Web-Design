using Microsoft.EntityFrameworkCore.Migrations;

namespace MessagingApp.Migrations
{
    public partial class RolesInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "bb6752d0-5cc6-4fec-9d14-410c8e22987d", "591ffe80-2c53-4ccc-95a3-1a12e306c3af", "Administrator", "ADMINISTRATOR" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a66cb204-7976-4d39-92f7-dcf71240cb12", "fb190423-4d8a-42bc-882d-24e01c13b20a", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a66cb204-7976-4d39-92f7-dcf71240cb12");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bb6752d0-5cc6-4fec-9d14-410c8e22987d");
        }
    }
}
