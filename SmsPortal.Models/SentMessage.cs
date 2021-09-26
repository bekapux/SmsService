using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models
{
    public class SentMessage
    {
        public int SentId { get; set; }
        public int TemplateId { get; set; }
        public List<int> Recipients { get; set; }
    }
}
