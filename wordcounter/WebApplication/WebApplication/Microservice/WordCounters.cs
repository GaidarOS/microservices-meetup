using System;
using System.Text.RegularExpressions;

namespace Microservice
{
    public class Wordcounter 
    {
        public int CountWordInText(string text, string word)
        {
            if (text!=null && word!=null)
            {
                return Regex.Matches(Regex.Escape(text.ToLower()), word).Count;
            }
            else
            {
                return 112121;
            }
        }
    }
}
