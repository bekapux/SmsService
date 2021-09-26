using Dapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models.Account;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IConfiguration _config;

        public AccountRepository(IConfiguration config)
        {
            _config = config;
        }

        public async Task<IEnumerable<ApplicationUserIdentity>> GetAllAsync(int applicationUserId)
        {
            IEnumerable<ApplicationUserIdentity> smsTemplate;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                smsTemplate = await connection.QueryAsync<ApplicationUserIdentity>(
                    "dbo.Account_GetAllActive",
                    new { ApplicationUserId = applicationUserId }, commandType:
                    CommandType.StoredProcedure
                    );
            }
            return smsTemplate;
        }
        public async Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var dataTable = new DataTable();
            dataTable.Columns.Add("Username", typeof(string));
            dataTable.Columns.Add("NormalizedUsername", typeof(string));
            dataTable.Columns.Add("Fullname", typeof(string));
            dataTable.Columns.Add("IsAdmin", typeof(bool));
            dataTable.Columns.Add("PasswordHash", typeof(string));

            dataTable.Rows.Add(
                user.Username,
                user.NormalizedUsername,
                user.Fullname,
                user.IsAdmin,
                user.PasswordHash
                );

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync(cancellationToken);

                await connection.ExecuteAsync(
                    "Account_Insert",
                    new { Account = dataTable.AsTableValuedParameter("dbo.AccountType") },
                    commandType: CommandType.StoredProcedure
                    );
            }
            return IdentityResult.Success;
        }



        public async Task<ApplicationUserIdentity> GetByUsernameAsync(string normalizedUsername, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            ApplicationUserIdentity applicationUser;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync(cancellationToken);


                applicationUser = await connection.QuerySingleOrDefaultAsync<ApplicationUserIdentity>(
                    "Account_GetByUsername",
                    new { NormalizedUsername = normalizedUsername },
                    commandType: CommandType.StoredProcedure
                    );
            }
            return applicationUser;
        }

        public async Task<int> DeleteAsync(int applicationUserId)
        {
            int affectedRows = 0;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                affectedRows = await connection.ExecuteAsync(
                    "Account_Deactivate",
                    new { ApplicationUserId = applicationUserId },
                    commandType: CommandType.StoredProcedure);
            }

            return affectedRows;
        }

        public async Task<ApplicationUserIdentity> GetAsync(int applicationUserId)
        {
            ApplicationUserIdentity applicationUserIdentity;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                applicationUserIdentity = await connection.QuerySingleAsync<ApplicationUserIdentity>(
                    "dbo.Account_GetById",
                    new { ApplicationUserId = applicationUserId },
                    commandType: CommandType.StoredProcedure
                    );
            }
            return applicationUserIdentity;
        }

        public async Task<int> Promote(int applicationUserId)
        {
            int affectedRows = 0;
            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                affectedRows = await connection.ExecuteAsync(
                    "Account_Promote",
                    new { ApplicationUserId = applicationUserId },
                    commandType: CommandType.StoredProcedure);
            }
            return affectedRows;
        }
        public async Task<int> Denote(int applicationUserId)
        {
            int affectedRows = 0;
            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                affectedRows = await connection.ExecuteAsync(
                    "Account_Denote",
                    new { ApplicationUserId = applicationUserId },
                    commandType: CommandType.StoredProcedure);
            }
            return affectedRows;
        }
    }
}
