using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class UserOrder
{
    [Key]
    public string user_order_id {get; set;}
    public double price {get; set;}
    public double current_price {get; set;} // offer

    public string ?  offer_id {get; set;}

    public string ?  admin_offer_id {get; set;}



    [ForeignKey("user_id")]
    public User user {get; set;}
    public string user_id {get;set;}
    public DateTime date {get; set;} = DateTime.UtcNow;

    public static bool apllicable(int offer_val , int current_val)
    {
        return offer_val > current_val;
    }
    

}

////// PURCHASE HISTORY