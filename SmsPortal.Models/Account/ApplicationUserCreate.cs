using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SmsPortal.Models.Account
{
    public class ApplicationUserCreate : ApplicationUserLogin
    {
        [Required]
        [MinLength(4, ErrorMessage = "Length must be 4-50 characters")]
        [MaxLength(50, ErrorMessage = "Length must be 4-50 characters")]
        public string Fullname { get; set; }
        public bool IsAdmin { get; set; }
    }
}
