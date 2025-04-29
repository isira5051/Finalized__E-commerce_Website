using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Auth.Controllers
{
    [ApiController]
    [Route("/api/users/auth")]
    public class AuthController : ControllerBase
    {

        private readonly UserDBContext context;

        public AuthController(UserDBContext _context)
        {
            context = _context;
        }

        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] UserLoginDto user)
        {
            if(user == null)
            {
                return BadRequest("");
            }

            var temp_user = await context.Users.FirstOrDefaultAsync( u => u.email == user.email && u.password == user.password);
            

            if(temp_user == null)
            {
                return NotFound();
            }

            HttpContext.Session.SetString("email" , temp_user.email);
            HttpContext.Session.SetString("user_id" , temp_user.id);
            HttpContext.Session.SetString("name" , temp_user.name);
            HttpContext.Session.SetString("type" , temp_user.type);

            string ? email = HttpContext.Session.GetString("email");
            return Ok(temp_user);

        }

        

        
        



    }
}