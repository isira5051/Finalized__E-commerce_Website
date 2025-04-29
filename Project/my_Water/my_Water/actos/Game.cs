using System.ComponentModel.DataAnnotations.Schema;

public class Game
{
    public string Id { get; set; }  
    public string Name { get; set; }  
    public double Price { get; set; }  
    public string Img_url {get; set;}
    public string Description{get;set;}
    public string NormalizedName {get;set;}
    public string Trailer {get;set;}

    public List<string> Tags {get; set;} = new List<string>();
    public List<UserGame> UserGames { get; set; } = new List<UserGame>();
   
    

    public Game()
    {}
    public Game(string id, string name, double price , string _img_url )
    {
        Id = id;
        Name = name;
        Price = price;
        Img_url = _img_url;
    }

    public static string Normalize(string name)
    {
        return new string(name
            .Where(char.IsLetterOrDigit)
            .ToArray())
            .ToLower();
    }

    public void setTags(List<string> tags_list)
    {
        Tags = tags_list;

    }

}

