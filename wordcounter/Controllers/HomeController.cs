using Microsoft.AspNetCore.Mvc;
using Microservice;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index(string word, string text)
        {            
            Wordcounter service = new Wordcounter(); 
            return Json(service.CountWordInText(text,word));
        }
    }
}
