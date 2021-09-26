using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models
{
    public class SmsTemplateCreate
    {
        public int SmsTemplateId { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public bool IsActive { get; set; }

    }
}
