using SmsPortal.Models.SentSms;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmsPortal.Services
{
    public interface ISmsSendService
    {
        public Task<SendSms> InsertAsync(SendSms sendSms, int applicationUserId);
    }
}
