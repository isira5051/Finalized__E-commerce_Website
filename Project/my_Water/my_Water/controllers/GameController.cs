using Azure.Core;
using juiceWater.dtos;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Text;
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

        [HttpPost("update-game")]
        public async Task<IActionResult> UpdateGame([FromBody] UpdateGameDto dto)
        {
            var game = await context.games.FindAsync(dto.Id);
            if (game == null)
            {
                return NotFound("Game not found.");
            }

            if(dto.Description != null)
            {
                game.Description = dto.Description;
            }

            if(dto.Img_url != null)
            {
                game.Img_url = dto.Img_url;
            }

            if(dto.name != null)
            {
                game.Name = dto.name;
                string normalized_name = Game.Normalize(dto.name);
                game.NormalizedName = normalized_name;   
            }

            if(dto. tags != null )
            {
                game.Tags = dto.tags;
            }

            if(dto.price != null)
            {
                game.Price = (double) dto.price;
            }

            if(dto.Trailer != null )
            {
                game.Trailer = dto.Trailer;
            }
            
            await context.SaveChangesAsync();
            
            return Ok(game);

        }

        [HttpPost("filter-game")]

        public async Task<IActionResult> Filter([FromBody] FilterGameDto dto)
        {
            
            var query = context.games.AsQueryable();

            if(dto.name != null)
            {
                string normalized_name = Game.Normalize(dto.name);
                query = query.Where(g => g.NormalizedName.Contains(normalized_name));
            }

            if (dto.price != null)
            {
              query = query.Where(g => g.Price >= dto.price);
            }

            if (dto.tags != null && dto.tags.Any())
            {
                query = query.Where(g => dto.tags.All(tag => g.Tags.Contains(tag)));
            }


            var filteredGames = await query.ToListAsync();

            if (filteredGames.Count == 0)
                {
                    return NotFound();
                }

            return Ok(filteredGames);             
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
    

    

    
