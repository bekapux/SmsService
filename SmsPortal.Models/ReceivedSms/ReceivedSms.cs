using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models.NoSms
{
    class ReceivedSms
    {
        public int ClientId { get; set; }
        public int ServiceId { get; set; }
        public int MessageId { get; set; }
        public string SenderNumber { get; set; }
        public string Text { get; set; }
    }
}