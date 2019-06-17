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

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] PhotoUpload request)
        {
            //var filePath = Path.GetTempFileName().Replace(".tmp", ".jpg"); //TODO: extract from Avatar.FileName

            string filepath =
                "C:\\Users\\korisnik\\Documents\\GitHub\\RWA\\AngularApp\\EventScheduler\\src\\assets\\img\\" +
                request.Photo.FileName;

            using (var stream = new FileStream(filepath, FileMode.Create))
            {
                await request.Photo.CopyToAsync(stream);
            }

            return Ok();
        }
    }
}