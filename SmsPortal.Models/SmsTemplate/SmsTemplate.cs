using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models
{
    public class SmsTemplate : SmsTemplateCreate
    {
        public DateTime DateCreated { get; set; }
        public int ApplicationUserId { get; set; }
    }
}
