using Microservice;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{
    public class ValuesController : Controller
    {
        [HttpGet]
        public IActionResult Index(string word, string text)
        {            
            Wordcounter service = new Wordcounter(); 
            return Json(service.CountWordInText(text,word));
        }

    }
}