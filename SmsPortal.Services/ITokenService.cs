using SmsPortal.Models.Account;
using System;

namespace SmsPortal.Services
{
    public interface ITokenService
    {
        public string CreateToken(ApplicationUserIdentity user);
    }
}
