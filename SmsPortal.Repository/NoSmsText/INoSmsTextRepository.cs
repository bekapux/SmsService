using SmsPortal.Models.NoSms;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public interface INoSmsTextRepository
    {
        public Task InsertAsync(NoSms noSms, int applicationUserId);
    }
}
