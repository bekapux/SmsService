using System;

namespace SmsPortal.Models
{
    public class ApplicationUser
    {
        public int ApplicationUserId { get; set; }
        public string Username { get; set; }
        public string Fullname { get; set; }
        public bool IsAdmin { get; set; }
        public string Token { get; set; }
    }
}
