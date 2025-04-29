using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Order
{
    [Key]
    public  int _order_no {get; set;}
    public DateTime _date {get; set;} = DateTime.UtcNow;
    
    public List<String> _item_list {get; set;}

    public string order_status {get; set;}
    
    public double total_price {get;set;}
    public List<Notification> notification_list {get;set;} = new List<Notification>();

    [ForeignKey("user_id")]
    public string user_id {get; set;}
    

    

    public Order()
    {
        
    }

    public Order(int orderNo, List<String> itemList)
    {
        _order_no = orderNo;
        _item_list = itemList ?? new List<String>(); 
    }

}