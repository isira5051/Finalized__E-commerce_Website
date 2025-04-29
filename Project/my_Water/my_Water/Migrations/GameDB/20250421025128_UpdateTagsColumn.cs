using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_Water.Migrations.GameDB
{
    /// <inheritdoc />
    public partial class UpdateTagsColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "games",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tags",
                table: "games");
        }
    }
}
