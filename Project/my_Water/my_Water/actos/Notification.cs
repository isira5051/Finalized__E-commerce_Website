using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Notification
{
    [Key]
    public string notfication_id {get; set;}
    public string notification_topc {get; set;}

    public string content {get; set;}

    [ForeignKey("order_id")]
    public int order_id{get; set;}
    public Order order{get;set;}
}