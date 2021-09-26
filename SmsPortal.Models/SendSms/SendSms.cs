using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models.SentSms
{
    public class SendSms
    {
        public string[] Recipients { get; set; }
        public string Message { get; set; }
        public int ServiceId { get; set; }
        public bool SmsOff { get; set; }
        public int Encoding { get; set; }
        public int TotalSmsNumber { get; set; }
    }
}
