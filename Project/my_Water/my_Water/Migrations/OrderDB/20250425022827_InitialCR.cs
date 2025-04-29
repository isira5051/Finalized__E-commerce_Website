using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_Water.Migrations.OrderDB
{
    /// <inheritdoc />
    public partial class InitialCR : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "total_price",
                table: "orders",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "total_price",
                table: "orders");
        }
    }
}
