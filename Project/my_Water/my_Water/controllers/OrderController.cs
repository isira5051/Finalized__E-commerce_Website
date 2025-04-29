using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Orders.Controllers
{


    [Route("/api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly OrderDBContext order_context;

        public OrderController(OrderDBContext _context)
        {
            order_context = _context;
        }

        // add order

        [HttpPost("add-order")]
        public async Task<IActionResult> AddOrder([FromBody] OrderDto orderDto  , [FromServices] UserDBContext user_context)
        {
            var _user = await user_context.Users.FindAsync(orderDto.user_id);

            Order order = new Order
            {
                user_id = _user.id
            };
            int cur_count =  await order_context.orders.CountAsync();
            order._order_no = cur_count + 1;
            order._item_list = orderDto.item_list;
            order.order_status = "Created";
            

            order_context.orders.Add(order);
            Notification notification = new Notification
            {
                order = order,  
                order_id = order._order_no, 
                notfication_id = Guid.NewGuid().ToString(),
                notification_topc = "Order Created",
                content = $"Order Created with Order No {order._order_no} at {DateTime.UtcNow} wait for Processing"
            };
            
            order_context.notifications.Add(notification);

            await order_context.SaveChangesAsync();

            return Ok(order);
            
        }

        // process order

        [HttpPost("add-user-order")]
        public async Task<IActionResult> AddUserOrder([FromBody] UserOrderDtos userOrderDtos , [FromServices] GameDBContext game_context , [FromServices] UserDBContext user_context)
        {
            var order = await order_context.orders.FindAsync(userOrderDtos.order_id);
            var _user = await user_context.Users.FindAsync(userOrderDtos.user_id);

            if (order == null)
            {
                return BadRequest("can't find order. Possible Order null in dtos");
            }

            List<string> list = order._item_list;
            double total_price = 0.0;

            for(int i = 0 ; i < list.Count ; i ++)
            {
                var game = await game_context.games.FindAsync(list[i]);
                total_price += game.Price;
            }


            order.total_price = total_price;
            // doublt final_price = offerservice.applyOffer()
            

            UserOrder userOrder = new UserOrder
            {
                user = _user , 
                user_id = userOrderDtos.user_id,
                user_order_id = Guid.NewGuid().ToString(),
                price = total_price
            };

            user_context.userOrders.Add(userOrder);
            await user_context.SaveChangesAsync();
            Notification notification = new Notification
            {
                order = order,  
                order_id = order._order_no, 
                notfication_id = Guid.NewGuid().ToString(),
                notification_topc = "Order Processed",
                content = $"Order Processed with Order No {order._order_no} at {DateTime.UtcNow} wait for Confirmation"
            };
            order.order_status = "Processed";
            order_context.notifications.Add(notification);

            await order_context.SaveChangesAsync();

            return Ok(userOrder);

        }

        //complete

        [HttpPost("complete-order")]
        public async Task<IActionResult> ConfirmOrder( [FromServices] GameDBContext game_context , [FromBody ]AddtoGameLibraryDto dto)
        {
            

            var order = await order_context.orders.FindAsync(dto.order_id);
            
            if(order == null)
            {
                return NotFound("Order Not Found");
            }

            List<string> list = order._item_list;

            var games = await game_context.games.Where(g => list.Contains(g.Id)).ToListAsync();

            if(games.Count == 0)
            {
                return NotFound("No games in Order");
            }


            for(int i = 0 ; i < games.Count ; i ++)
            {
                
                UserGame userGame = new UserGame
                {
                    game_id = games[i].Id , 
                    user_id = dto.user_id
                };
                game_context.userGames.Add(userGame);
                
                
            }

            await game_context.SaveChangesAsync();
            Notification notification = new Notification
            {
                order = order , 
                order_id = dto.order_id ,
                notfication_id = Guid.NewGuid().ToString(),
                notification_topc = "Order Completed. Game Added to Library",
                content = $"Order Completed with Order No {dto.order_id} at {DateTime.UtcNow} Enjoy your games"
            };

            order_context.notifications.Add(notification);
            order.order_status = "Completed";
            
            await order_context.SaveChangesAsync();
       
            return Ok("Games Added to Library");

        }




        [HttpPost("get-full-order")]
        public async Task<IActionResult> GetFullOrder( [FromServices] UserDBContext user_context , [FromBody] UserOrderDtos dto ) 
        {
            var order = await order_context.orders.FirstOrDefaultAsync(o => o._order_no == dto.order_id);
            var user = await user_context.Users.FindAsync(dto.user_id);

            var userOrder = user_context.userOrders.FirstOrDefault(u => u.user == user);
            FullOrder fullOrder = new FullOrder();
            fullOrder.order_id = order._order_no;
            fullOrder.date = order._date;
            fullOrder.email = user.email;
            fullOrder.order_item_list = order._item_list;
            fullOrder.price = userOrder.price;
            fullOrder.status = order.order_status;

            return Ok(fullOrder);
        }


        //filter orders by user_id

        [HttpPost("get-by-user")]
        public async Task<IActionResult> GetOrdersByUser([FromBody] AllnotificationbyUserDto dto)
        {
            var orders =  await order_context.orders
            .Where(o => o.user_id == dto.user_id)
            .ToListAsync();
            return Ok(orders);


        }

        // filter notifications of orders

        [HttpPost("notification-by-order")]
        public async Task<IActionResult> GetNotificationByOrder([FromBody] NotificationFilterOrderDto dto )
        {
            var notifications = await order_context.notifications.Where(n => n.order_id == dto.order_id).ToListAsync();
            return Ok(notifications);

        }

        [HttpPost("all-notifications")]
        public async Task<IActionResult> GetNotificationByUser([FromBody] AllnotificationbyUserDto dto )
        {
            var notifications = await order_context.notifications.Include(o => o.order).Where(n => n.order.user_id == dto.user_id).
            ToListAsync();
            return Ok(notifications);

        }

        //get purchase history
        


    }
}