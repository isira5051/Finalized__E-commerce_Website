using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class UserGame
{
    [Key]
    public int Id { get; set; }

    [ForeignKey("user_id")]
    public string user_id { get; set; }
    

    // Foreign Key for Game
    [ForeignKey("game_id")]
    public string game_id { get; set; }
    public Game Game { get; set; }
}
