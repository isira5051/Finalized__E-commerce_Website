using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

public class Forum
{
    [Key]
    public string forum_id {get; set;}

    public string forum_topic {get; set;}
    public string forum_content {get; set;}

    public string forum_selection {get;set;}

    public DateTime date{get;set;}


    [ForeignKey("user_id")]
    public string user_id { get; set; }  
    
    public User user { get; set; }   
    
    public Forum()
    {}

    public Forum(string _forum_id , string _forum_topic ,  string _forum_content  , string _user_id)
    {
        forum_id = _forum_id;
        forum_content = _forum_content;
        date = DateTime.UtcNow;
        user_id = _user_id;
        forum_topic = _forum_topic;
    }


}