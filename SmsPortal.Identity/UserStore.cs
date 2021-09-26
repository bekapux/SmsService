using Microsoft.AspNetCore.Identity;
using SmsPortal.Models.Account;
using SmsPortal.Repository;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SmsPortal.Identity
{
    public class UserStore :
        IUserStore<ApplicationUserIdentity>,
        IUserPasswordStore<ApplicationUserIdentity>
    {
        private readonly IAccountRepository _accountRepsoitory;

        public UserStore(IAccountRepository accountRepository)
        {
            _accountRepsoitory = accountRepository;
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return await _accountRepsoitory.CreateAsync(user, cancellationToken);
        }

        public async Task<ApplicationUserIdentity> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            return await _accountRepsoitory.GetByUsernameAsync(normalizedUserName, cancellationToken);
        }

        public Task<IdentityResult> DeleteAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationUserIdentity> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetNormalizedUserNameAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedUsername);
        }

        public Task<string> GetPasswordHashAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash);
        }

        public Task<string> GetUserIdAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.ApplicationUserId.ToString());
        }

        public Task<string> GetUserNameAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Username);
        }

        public Task<bool> HasPasswordAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash != null);
        }

        public Task SetNormalizedUserNameAsync(ApplicationUserIdentity user, string normalizedName, CancellationToken cancellationToken)
        {
            user.NormalizedUsername = normalizedName;
            return Task.FromResult(0);
        }

        public Task SetPasswordHashAsync(ApplicationUserIdentity user, string passwordHash, CancellationToken cancellationToken)
        {
            user.PasswordHash = passwordHash;
            return Task.FromResult(0);
        }

        public Task SetUserNameAsync(ApplicationUserIdentity user, string userName, CancellationToken cancellationToken)
        {
            user.Username = userName;
            return Task.FromResult(0);
        }

        public Task<IdentityResult> UpdateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            // Nothing to dispose
        }

    }
}
