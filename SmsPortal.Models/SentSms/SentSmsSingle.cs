using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models.SentSms
{
    public class SentSmsSingle
    {
        public int SentSmsId { get; set; }
        public string RecipientPhoneNumber { get; set; }
        public int ApplicationUserId { get; set; }
        public string FullName { get; set; }
        public int ServiceId { get; set; }
        public string Text { get; set; }
        public DateTime DateSent { get; set; }
        public string SentStatus { get; set; }
        public string ReturnedSentId { get; set; }
    }
}
