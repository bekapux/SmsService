using SmsPortal.Models.SentSms;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace SmsPortal.Repository
{
    public interface ISentSmsRepository
    {
        public Task<IEnumerable<SentSmsGroup>> GetAllAsync(int applicationUserId);
        public Task<IEnumerable<SentSmsGroup>> GetAllFilteredAsync(int applicationUserId, SentSmsSearchParams sentSmsSearchParams);
        public Task<IEnumerable<SentSmsSingle>> GetAsync(DateTime dateSent);
    }
}
