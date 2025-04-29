using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace my_Water.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Game",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<double>(type: "REAL", nullable: false),
                    Img_url = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Game", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<string>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    email = table.Column<string>(type: "TEXT", nullable: false),
                    password = table.Column<string>(type: "TEXT", nullable: false),
                    type = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "forums",
                columns: table => new
                {
                    forum_id = table.Column<string>(type: "TEXT", nullable: false),
                    forum_topic = table.Column<string>(type: "TEXT", nullable: false),
                    forum_content = table.Column<string>(type: "TEXT", nullable: false),
                    user_id = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_forums", x => x.forum_id);
                    table.ForeignKey(
                        name: "FK_forums_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "messages",
                columns: table => new
                {
                    message_id = table.Column<string>(type: "TEXT", nullable: false),
                    msg_topic = table.Column<string>(type: "TEXT", nullable: false),
                    message_content = table.Column<string>(type: "TEXT", nullable: false),
                    sender_email = table.Column<string>(type: "TEXT", nullable: false),
                    date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    user_id = table.Column<string>(type: "TEXT", nullable: false),
                    rec_user_id = table.Column<string>(type: "TEXT", nullable: false),
                    deleted = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_messages", x => x.message_id);
                    table.ForeignKey(
                        name: "FK_messages_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserGame",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    user_id = table.Column<string>(type: "TEXT", nullable: false),
                    game_id = table.Column<string>(type: "TEXT", nullable: false),
                    GameId = table.Column<string>(type: "TEXT", nullable: true),
                    Userid = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGame", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGame_Game_GameId",
                        column: x => x.GameId,
                        principalTable: "Game",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserGame_Users_Userid",
                        column: x => x.Userid,
                        principalTable: "Users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "userOrders",
                columns: table => new
                {
                    user_order_id = table.Column<string>(type: "TEXT", nullable: false),
                    price = table.Column<double>(type: "REAL", nullable: false),
                    user_id = table.Column<string>(type: "TEXT", nullable: false),
                    date = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userOrders", x => x.user_order_id);
                    table.ForeignKey(
                        name: "FK_userOrders_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "wishGames",
                columns: table => new
                {
                    WishGamesListId = table.Column<string>(type: "TEXT", nullable: false),
                    game_list = table.Column<string>(type: "TEXT", nullable: false),
                    user_id = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_wishGames", x => x.WishGamesListId);
                    table.ForeignKey(
                        name: "FK_wishGames_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_forums_user_id",
                table: "forums",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_messages_user_id",
                table: "messages",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserGame_GameId",
                table: "UserGame",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGame_Userid",
                table: "UserGame",
                column: "Userid");

            migrationBuilder.CreateIndex(
                name: "IX_userOrders_user_id",
                table: "userOrders",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_wishGames_user_id",
                table: "wishGames",
                column: "user_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "forums");

            migrationBuilder.DropTable(
                name: "messages");

            migrationBuilder.DropTable(
                name: "UserGame");

            migrationBuilder.DropTable(
                name: "userOrders");

            migrationBuilder.DropTable(
                name: "wishGames");

            migrationBuilder.DropTable(
                name: "Game");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
