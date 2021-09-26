using SmsPortal.Models.RecipientGroups;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public interface IRecipientGroupRepository
    {
        public Task<RecipientGroup> GetAsync(int id);
        public Task InsertAsync(RecipientGroupCreate categoryCreate, int applicationUserId);
        public Task<IEnumerable<RecipientGroup>> GetAllAsync();
    }
}
