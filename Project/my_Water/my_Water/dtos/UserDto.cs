 public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } 
        public string Email { get; set; }

        public UserDto(int id, string username, string password, string email)
        {
            Id = id;
            Username = username;
            Password = password;
            Email = email;
        }
    }