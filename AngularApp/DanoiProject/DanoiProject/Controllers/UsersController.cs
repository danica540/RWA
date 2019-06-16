using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DanoiProject.Model;
using DanoiProject.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace DanoiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private static readonly IList<User> RegisteredUsers = new List<User>();
        
        [HttpGet]
        public ActionResult<IList<User>> Get()
        {
            return Ok(RegisteredUsers);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Post([FromForm] UserRegistrationRequest request)
        {
            var filePath = Path.GetTempFileName().Replace(".tmp", ".jpg"); //TODO: extract from Avatar.FileName
            
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.Avatar.CopyToAsync(stream);
            }
            
            var newUser = new User
            {
                Email = request.Email,
                Password = request.Password,
                AvatarPath = filePath,
            };

            RegisteredUsers.Add(newUser);
            
            return Ok(newUser);
        }
    }
}