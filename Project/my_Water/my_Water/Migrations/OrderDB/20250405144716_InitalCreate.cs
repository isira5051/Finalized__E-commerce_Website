using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_Water.Migrations.OrderDB
{
    /// <inheritdoc />
    public partial class InitalCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    _order_no = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    _date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    _item_list = table.Column<string>(type: "TEXT", nullable: false),
                    order_status = table.Column<string>(type: "TEXT", nullable: false),
                    user_id = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x._order_no);
                });

            migrationBuilder.CreateTable(
                name: "notifications",
                columns: table => new
                {
                    notfication_id = table.Column<string>(type: "TEXT", nullable: false),
                    notification_topc = table.Column<string>(type: "TEXT", nullable: false),
                    content = table.Column<string>(type: "TEXT", nullable: false),
                    order_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notifications", x => x.notfication_id);
                    table.ForeignKey(
                        name: "FK_notifications_orders_order_id",
                        column: x => x.order_id,
                        principalTable: "orders",
                        principalColumn: "_order_no",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_notifications_order_id",
                table: "notifications",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_orders_user_id",
                table: "orders",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "notifications");

            migrationBuilder.DropTable(
                name: "orders");
        }
    }
}
