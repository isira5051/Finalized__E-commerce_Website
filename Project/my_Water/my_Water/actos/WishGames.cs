using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class WishGames
{
    [Key]
    public string WishGamesListId {get; set;} 
    public List<String> game_list {get; set;}

    [ForeignKey("user_id")]
    public User user{get;set;}
    public string user_id {get;set;}
 }