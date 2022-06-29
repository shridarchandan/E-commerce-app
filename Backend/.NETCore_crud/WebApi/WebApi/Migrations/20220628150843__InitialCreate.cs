using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class _InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "T_Shirt",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    size = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    price = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    color = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    made = table.Column<string>(type: "nvarchar(25)", nullable: true),
                    style = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    gender = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    image = table.Column<string>(type: "nvarchar(400)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(1000)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_Shirt", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "T_Shirt");
        }
    }
}
