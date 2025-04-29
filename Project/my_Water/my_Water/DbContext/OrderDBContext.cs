
using Microsoft.EntityFrameworkCore;

public class OrderDBContext : DbContext
{
    
    public DbSet<Order> orders {get; set;}
    public DbSet<Notification> notifications {get;set;}
    
    public OrderDBContext(DbContextOptions<OrderDBContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>()
        .Property(o => o.user_id)
        .IsRequired();
    
    // Optionally, create an index for faster lookups:
        modelBuilder.Entity<Order>()
        .HasIndex(o => o.user_id);

        modelBuilder.Entity<Notification>()
            .HasOne(n => n.order)
            .WithMany(o => o.notification_list)
            .HasForeignKey(n => n.order_id)
            .OnDelete(DeleteBehavior.Cascade);
    
    }


}