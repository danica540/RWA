using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace DanoiProject.ViewModels
{
    public class PhotoUpload
    {
        public IFormFile Photo { get; set; }
    }
}
