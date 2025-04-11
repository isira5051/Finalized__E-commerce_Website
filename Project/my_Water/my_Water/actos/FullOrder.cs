public class FullOrder
{
    public string user_id {get ; set;}
    public string email {get ; set;}
    public int order_id {get;set;}
    public List<string> order_item_list{ get ; set;}

    public double price {get;set;}
    public DateTime date {get;set;}
    public string status {get;set;}
}