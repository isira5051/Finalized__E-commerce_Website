public class UpdateGameDto
{
     public string Id { get; set; }
    public string ? name {get;set;}
    public string ?  Img_url {get; set;}
    public double ? price {get;set;}
    public string ?  Description{get;set;}
    public string ?  Trailer {get;set;}

    public List<string> ? tags {get;set;}

}