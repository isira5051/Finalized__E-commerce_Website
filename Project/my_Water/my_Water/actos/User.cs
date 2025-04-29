using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class User
{   
    [Key]
    public string id {get ; set;}
    public string name {get ; set;}

    public string email {get ; set;}

    public string password {get; set;}

    public string type {get;set;}
    public List<Message> Messages { get; set; } = new List<Message>();
    //public List<Suggestions> Suggetions { get; set; } = new List<Suggestions>();
    
    public List<UserGame> UserGames { get; set; } = new List<UserGame>();
    //public List<ReviewGame> Reviews { get; set; } = new List<ReviewGame>();
    public List<Forum> ForumComments { get; set; } = new List<Forum>();

    public WishGames wishGames {get; set;}
    public List<UserOrder> user_orders {get;set;} = new List<UserOrder>();

    public User() {}

    public User(string _id , string _name  , string _email , string _password , string _type)
    {
        id = _id;
        name = _name;
        email = _email;
        password = _password;
        type = _type;
    }
}