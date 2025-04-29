
using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Forums.Controllers
{

    [ApiController]
    [Route("/api/user/forum")]

    public class ForumController : ControllerBase
    {
        

        [HttpPost("add")]
        public async Task<IActionResult> AddForum([FromBody] ForumDto forumDto , [FromServices] UserDBContext user_context)
        {
            string id = Guid.NewGuid().ToString();
            try
            {
                 
                var find_user = await user_context.Users.FindAsync(forumDto.user_id);

                if(find_user == null)
                {
                    return NotFound("User Not Found");
                }

                Forum forum = new Forum(id, forumDto.topic, forumDto.forum_content, find_user.id)
                {
                    user = find_user  ,
                    forum_selection = forumDto.Selection
                    
                };
                user_context.forums.Add(forum);
                await user_context.SaveChangesAsync();
                return Ok(forum);
            }
            catch (Exception ex)
            {
                return BadRequest(new 
                { 
                    error = ex.Message, 
                    innerException = ex.InnerException?.Message 
                });
            }
        }

        [HttpPost("filter")]
        public async Task<IActionResult> ViewFilter([FromServices] UserDBContext user_context , [FromBody] FilterForumsDto dto)
        
        {
            var query = user_context.forums.AsQueryable();
            
            if(!dto.Date.HasValue && dto.Selection != null)
            {   query = query.Where(f => f.forum_selection == dto.Selection);
            }
            
            else if(dto.Date.HasValue && dto.Selection == null)
            {
                query = query.Where(f => f.date.Date == dto.Date.Value.Date);
            }
             
            else 
            {
                query = query.Where(f => f.date.Date == dto.Date.Value.Date && f.forum_selection == dto.Selection);
            }

            var forums = await query.ToListAsync();
            
            return Ok(forums);
            

        }


        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteForum([FromBody] DeleteForumDto dto , [FromServices] UserDBContext user_context)
        {
            
            var forum = await user_context.forums.FindAsync(dto.id);
            if(forum == null)
            {
                return NotFound();
            }

            user_context.forums.Remove(forum);
            await user_context.SaveChangesAsync();
            return Ok(new { message = "Forum deleted successfully." });
        }



    }


}