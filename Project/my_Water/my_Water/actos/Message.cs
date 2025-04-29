using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Message
{
    [Key]
    public string message_id { get; set; }
    public string msg_topic { get; set; }
    public string message_content { get; set; }
    public string sender_email { get; set; }
    public DateTime date { get; set; }

   
    public string user_id { get; set; }  
    public string rec_user_id { get; set; }  

    public bool deleted{get;set;} = false;

    
    [ForeignKey("user_id")]
    public User user { get; set; }  

  
    public Message() { }

    public Message(string _message_id, string _msg_topic, string _content, string _sender_email)
    {
        message_id = _message_id;
        message_content = _content;
        msg_topic = _msg_topic;
        date = DateTime.UtcNow;
        sender_email = _sender_email;
    }
}
