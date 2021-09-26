using SmsPortal.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public interface ISmsTemplateRepository
    {
        public Task<IEnumerable<SmsTemplate>> GetAllAsync(int applicationUserId);
        public Task<SmsTemplate> GetAsync(int id);
        public Task InsertAsync(SmsTemplateCreate smsTemplateCreate, int applicationUserId);
        public Task<int> DeleteAsync(int smsTemplateId);
    }
}
