using Microsoft.EntityFrameworkCore;

public class UserDBContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Message> messages {get; set;}

    public DbSet<UserOrder> userOrders {get; set;}
    public DbSet<Forum> forums {get; set;}
    public DbSet<WishGames> wishGames {get;set;}

    public UserDBContext(DbContextOptions<UserDBContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Message>()
            .HasOne(m => m.user)
            .WithMany(u => u.Messages)  
            .HasForeignKey(m => m.user_id)
            .OnDelete(DeleteBehavior.Cascade); 
            

        modelBuilder.Entity<Forum>()
            .HasOne(m => m.user) // Each message has one User
            .WithMany(u => u.ForumComments)  // User has many messages (rec_messages)
            .HasForeignKey(m => m.user_id)  // Foreign Key
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<WishGames>()
            .HasOne(m => m.user)
            .WithOne(u => u.wishGames) //
            .HasForeignKey<WishGames>(w => w.user_id)  // Foreign Key
            .OnDelete(DeleteBehavior.Cascade);

         modelBuilder.Entity<UserOrder>()
            .HasOne(uo => uo.user) // Each order belongs to one User
            .WithMany(u => u.user_orders) // One User can have many Orders
            .HasForeignKey(uo => uo.user_id) // Foreign Key in UserOrder
            .OnDelete(DeleteBehavior.Cascade);
        
        
    }
}
