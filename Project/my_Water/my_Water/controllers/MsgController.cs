using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace Msg.Controllers
{
    [ApiController]
    [Route("/api/admin/msg")]

    public class MsgController : ControllerBase
    {

        
    [HttpPost("post-msg")]
    public async Task<IActionResult> PostMessage([FromBody] MsgDto msgDto, [FromServices] UserDBContext user_context)
    {
        string id = Guid.NewGuid().ToString();
        var _user = await user_context.Users.FirstOrDefaultAsync(u => u.email == msgDto.sender_email);
        var _rec_user = await user_context.Users.FirstOrDefaultAsync(u => u.email == msgDto.rec_email);
        
        if (_user == null || _rec_user == null)
        {
            return BadRequest("Sender or Receiver not found.");
        }

    
        
        Message m = new Message(id, msgDto.msg_topic, msgDto.msg_content, msgDto.sender_email)
        {
            user = _user, 
            user_id = _user.id,
            rec_user_id = _rec_user.id
        };

        user_context.messages.Add(m);            
        await user_context.SaveChangesAsync();

        return Ok(m);
    }

    [HttpPost("get-msg-user")]
    public async Task<IActionResult> getMSG([FromServices] UserDBContext user_context, GetMSGDto dto)
    {
        
        var user = await user_context.Users
            .FirstOrDefaultAsync(u => u.email == dto.rec_email);

        if (user == null)
        {
            return NotFound("User Not Found");
        }

        var userMessages = await user_context.messages
            .Where(m => m.rec_user_id == user.id).Where(c => c.deleted == false)  
            .Select(m => new
            {
                m.message_id,
                m.msg_topic,
                m.message_content,
                m.sender_email,
                m.rec_user_id,
                m.date
            })
            .ToListAsync();

        

        return Ok(userMessages);
    }

    [HttpPost("delete-msg")]
    public async Task<IActionResult> DeleteMsg(DeleteMsgDto dto , [FromServices] UserDBContext user_context)
    {
        

        var message  = await user_context.messages.FindAsync(dto.msg_id);
        if(message == null)
        {
            return NotFound("Message");
        }
        message.deleted = true;

        await user_context.SaveChangesAsync();
        return Ok(message);


    }


    }
}