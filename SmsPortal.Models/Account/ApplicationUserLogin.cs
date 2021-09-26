using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmsPortal.Models.Account
{
    public class ApplicationUserLogin
    {
        [Required(ErrorMessage ="Username is required")]
        [MinLength(4, ErrorMessage ="Length must be 4-30 characters")]
        [MaxLength(30, ErrorMessage ="Length must be 4-30 characters")]
        public string Username { get; set; }

        [Required(ErrorMessage ="Password is required")]
        [MinLength(4, ErrorMessage = "Length must be 4-30 characters")]
        [MaxLength(30, ErrorMessage = "Length must be 4-30 characters")]
        public string Password { get; set; }
    }
}
