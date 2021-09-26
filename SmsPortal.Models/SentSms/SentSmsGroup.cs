using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models.SentSms
{
    public class SentSmsGroup
    {
        public DateTime DateSent { get; set; }
        public string Text { get; set; }
        public string FullName { get; set; }
        public int NumberOfRecipients { get; set; }
        public int ServiceId { get; set; }
        public int TotalSmsNumber { get; set; }
    }
}
