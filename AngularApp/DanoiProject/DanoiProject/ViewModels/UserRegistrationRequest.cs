using Microsoft.AspNetCore.Http;

namespace DanoiProject.ViewModels
{
    public class UserRegistrationRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public IFormFile Avatar { get; set; }
    }
}