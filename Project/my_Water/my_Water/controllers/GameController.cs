using juiceWater.dtos;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace YourNamespace.Controllers
{
    [Route("api/games")]
    [ApiController]
    public class GameController : ControllerBase
    {

        
        private readonly GameDBContext context;
        public GameController(GameDBContext dbContext)
        {
            context = dbContext;
            
        }
        
        [HttpPost("add-game")]
        public async Task<IActionResult> addGame([FromBody] GameDtos gameDtos)
        {
            if(gameDtos == null)
            {
                return BadRequest();
            }

            string normalized_name = Game.Normalize(gameDtos.name);


            var hasGame  = await context.games.Where(g => g.NormalizedName == normalized_name).ToListAsync();
            
            if(hasGame.Count > 0)
            {
               return Conflict("Game with the same name already exists.");
            }
            
            string game_id =Guid.NewGuid().ToString();

            Game g = new Game(game_id , gameDtos.name , gameDtos.price , gameDtos.img_url);
            g.NormalizedName = normalized_name;
            g.Description = gameDtos.des;
            g.Trailer = gameDtos.trailer;
            context.Add(g);
            await context.SaveChangesAsync();
            return Ok(g);
        }
        [HttpGet("view-game")]
        public async Task<IActionResult> ViewGame()
        {
            var games = await context.games.ToListAsync();

            if (games == null)
            {
                return NotFound();
            }

            return Ok(games);
        }


        [HttpPost("update-Game")]
        public async Task<IActionResult> UpdateGame([FromBody] GameDtos dto)
        {
            
           // var game = await context.games.FindAsync();
            

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(string id)
        {
            var game = await context.games.FindAsync(id);
            if (game == null) return NotFound();

            context.games.Remove(game);
            await context.SaveChangesAsync();

            return Ok();
        }



        [HttpPost("get-game-order")]
        public async Task<IActionResult> getGame([FromBody] GameIdListDto dto )
        {
            List<Game> games = new List<Game>();
            List<String> games_id = new List<string>();
            games_id = dto.game_id_list;

            if(games_id.Count == 0)
            {
                return NotFound("Game List Not Found from id list. Check DTO");
            }

            var games_list = await context.games.Where(g => games_id.Contains(g.Id)).ToListAsync();



            return Ok(games_list);
        }
       
        

        
    }
}
    

    

    
