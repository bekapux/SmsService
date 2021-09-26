using Dapper;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models.AddressBook;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public class AddressBookRepository : IAddressBookRepository
    {
        private readonly IConfiguration _config;

        public AddressBookRepository(IConfiguration config)
        {
            _config = config;
        }
        public async Task InsertAsync(Recipient recipient, int applicationUserId)
        {
            var par = new DynamicParameters();
            par.Add("FirstName", recipient.FirstName);
            par.Add("LastName", recipient.LastName);
            par.Add("Group", recipient.Group);
            par.Add("Category", recipient.Category);
            par.Add("PhoneNumber", recipient.PhoneNumber);
            par.Add("DateAdded", DateTime.Now);
            par.Add("AddedBy", applicationUserId);

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.ExecuteAsync("Recipient_InsUpd", par, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
