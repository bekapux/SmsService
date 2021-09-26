using Dapper;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models.NoSms;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public class NoSmsTextRepository : INoSmsTextRepository
    {
        private readonly IConfiguration _config;

        public NoSmsTextRepository(IConfiguration config)
        {
            _config = config;
        }

        public async Task InsertAsync(NoSms noSms, int applicationUserId)
        {

            var par = new DynamicParameters();
            par.Add("NoSmsText", noSms.NoSmsText);
            par.Add("UpdateDate", DateTime.Now);

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.ExecuteAsync("NoSms_InsUpd", par, commandType: CommandType.StoredProcedure);
            }
        }


    }
}
