using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace users.Controllers
{

    [ApiController]
    [Route("/api/users")]

    public class UserController : ControllerBase
    {
        readonly UserDBContext context;

        public UserController(UserDBContext _context)
        {
            context = _context;
            
        }


        [HttpPost("add-user")]
        public  async Task<IActionResult> AddUser([FromBody] RegisterUserDto dto)
        {
            User u1 = new User(dto.user_id , dto.name , dto.email , dto.password , dto.type);
            context.Add(u1);
            await context.SaveChangesAsync();
            return Created("" , u1);
        }

        [HttpGet("get-user")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var list = await context.Users.ToListAsync();

                if (list == null || !list.Any())
                {
                    return NotFound("No users found.");
                }

                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    

        [HttpDelete("delete-user/{id}")]

        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await  context.Users.FindAsync(id);

            if(user == null)
            {
                return NotFound("User Not Found!");
            }
            
            context.Remove(user);
            await context.SaveChangesAsync();
            return Ok(user);

        }

    }


}