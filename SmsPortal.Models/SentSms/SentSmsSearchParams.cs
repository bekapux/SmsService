using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models.SentSms
{
    public class SentSmsSearchParams
    {
        public string Author { get; set; }
        public string DateSentStart { get; set; }
        public string DateSentEnd { get; set; }
        public string ServiceId { get; set; }
        public string NumberOfRecipients { get; set; }
        public string Text { get; set; }
        public string TotalSmsNumber { get; set; }
    }
}
