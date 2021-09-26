using SmsPortal.Models.RecipientCategories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public interface IRecipientCategoryRepository
    {
        public Task<RecipientCategory> GetAsync(int id);
        public Task InsertAsync(RecipientCategoryCreate categoryCreate, int applicationUserId);
        public Task<IEnumerable<RecipientCategory>> GetAllAsync();
    }
}
