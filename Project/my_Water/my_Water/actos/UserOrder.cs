using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class UserOrder
{
    [Key]
    public string user_order_id {get; set;}
    public double price {get; set;}

    [ForeignKey("user_id")]
    public User user {get; set;}
    public string user_id {get;set;}
    public DateTime date {get; set;} = DateTime.UtcNow;

}

////// PURCHASE HISTORY