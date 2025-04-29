using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UserLibrary.Controllers
{
    [ApiController]
    [Route("api/user/library")]
    public class UserLibraryController : ControllerBase
    {
        [HttpPost("view-library")]
        public async Task<IActionResult> GetLibrary([FromServices] GameDBContext game_context, [FromBody] UserLibraryDto dto)
        {
            if (dto == null)   
            {
                return BadRequest("Invalid user ID.");
            }

            var gamesList = await game_context.userGames.Where(u => u.user_id == dto.user_id).Select(g => g.game_id).ToListAsync();

            var selectGames = await game_context.games
                            .Where(g => gamesList.Contains(g.Id))
                            .Distinct()
                            .ToListAsync();

            if (!gamesList.Any())
            {
                return NotFound("No games found for this user.");
            }            

            return Ok(selectGames);
            
        }
    }
}
