using System.Text.RegularExpressions;


namespace Microservice
{
    public class Wordcounter 
    {
        public int CountWordInText(string text, string word){
            return Regex.Matches(Regex.Escape(text.ToLower()), word).Count;
        }
    }
}
