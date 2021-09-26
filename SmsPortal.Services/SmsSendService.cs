using SmsPortal.Models.SentSms;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace SmsPortal.Services
{
    public class SmsSendService : ISmsSendService
    {
        public Task<SendSms> InsertAsync(SendSms sendSms, int applicationUserId)
        {
            throw new NotImplementedException();
        }
    }
}