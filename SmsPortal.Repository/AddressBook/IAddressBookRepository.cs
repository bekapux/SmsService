using SmsPortal.Models.AddressBook;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public interface IAddressBookRepository
    {
        public Task InsertAsync(Recipient recipient, int applicationUserId);
    }
}
