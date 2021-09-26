using Dapper;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public class SmsTemplateRepository : ISmsTemplateRepository
    {
        private readonly IConfiguration _config;

        public SmsTemplateRepository(IConfiguration config)
        {
            _config = config;
        }

        public async Task<int> DeleteAsync(int smsTemplateId)
        {
            int affectedRows = 0;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                affectedRows = await connection.ExecuteAsync(
                    "SmsTemplate_Delete",
                    new { SmsTemplateId = smsTemplateId },
                    commandType: CommandType.StoredProcedure);
            }

            return affectedRows;
        }



        public async Task<IEnumerable<SmsTemplate>> GetAllAsync(int applicationUserId)
        {
            IEnumerable<SmsTemplate> smsTemplate;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                smsTemplate = await connection.QueryAsync<SmsTemplate>(
                    "dbo.SmsTemplate_GetAll",
                    new { ApplicationUserId = applicationUserId }, commandType:
                    CommandType.StoredProcedure
                    );
            }

            return smsTemplate;
        }

        public async Task<SmsTemplate> GetAsync(int id)
        {
            SmsTemplate smsTemplate;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                smsTemplate = await connection.QuerySingleAsync<SmsTemplate>(
                    "dbo.SmsTemplate_GetById",
                    new { SmsTemplateId = id },
                    commandType: CommandType.StoredProcedure
                    );
            }
            return smsTemplate;
        }

        public async Task InsertAsync(SmsTemplateCreate smsTemplateCreate, int applicationUserId)
        {
            var par = new DynamicParameters();
            par.Add("SmsTemplateId", smsTemplateCreate.SmsTemplateId);
            par.Add("Title", smsTemplateCreate.Title);
            par.Add("Text", smsTemplateCreate.Text);
            par.Add("IsActive", smsTemplateCreate.IsActive);
            par.Add("UserCreated", applicationUserId);

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.ExecuteAsync("SmsTemplate_InsUpd", par, commandType: CommandType.StoredProcedure).ConfigureAwait(false);
            }
        }

        
    }
}