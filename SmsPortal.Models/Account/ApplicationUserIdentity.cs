using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models.Account
{
    public class ApplicationUserIdentity
    {
        public int ApplicationUserId { get; set; }
        public string Username { get; set; }
        public string NormalizedUsername { get; set; }
        public string Fullname { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
        public DateTime UserCreationDate { get; set; }
        public string PasswordHash { get; set; }
    }
}
