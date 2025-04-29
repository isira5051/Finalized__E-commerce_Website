
using Microsoft.EntityFrameworkCore;

public class GameDBContext : DbContext
{
    public DbSet<Game> games {get; set;}
    public DbSet<UserGame> userGames {get; set;}


    public GameDBContext(DbContextOptions<GameDBContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Foreign key exists in UserGame, not Game

        modelBuilder.Entity<UserGame>()
            .HasOne(ug => ug.Game)
            .WithMany(g => g.UserGames)
            .HasForeignKey(ug => ug.game_id);
    }


}