using Microsoft.AspNetCore.Identity;
using SmsPortal.Models.Account;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public interface IAccountRepository
    {
        public Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, 
            CancellationToken cancellationToken);

        public Task<ApplicationUserIdentity> GetByUsernameAsync(string normalizedUsername, 
            CancellationToken cancellationToken);

        public Task<IEnumerable<ApplicationUserIdentity>> GetAllAsync(int applicationUserId);
        public Task<int> DeleteAsync(int smsTemplateId);
        public Task<int> Promote(int applicationUserId);
        public Task<int> Denote(int applicationUserId);
        public Task<ApplicationUserIdentity> GetAsync(int id);

    }
}
