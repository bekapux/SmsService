using Dapper;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models.SentSms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public class SentSmsRepository : ISentSmsRepository
    {
        private readonly IConfiguration _config;

        public SentSmsRepository(IConfiguration config)
        {
            _config = config;
        }
        public async Task<IEnumerable<SentSmsGroup>> GetAllAsync(int applicationUserId)
        {
            IEnumerable<SentSmsGroup> sentSms;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                sentSms = await connection.QueryAsync<SentSmsGroup>(
                    "dbo.SentSms_GetAll",
                    new { ApplicationUserId = applicationUserId }, commandType:
                    CommandType.StoredProcedure
                    );
            }

            return sentSms;
        }


        public async Task<IEnumerable<SentSmsSingle>> GetAsync(DateTime dateSent)
        {
            IEnumerable<SentSmsSingle> sentSmsSingle;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                sentSmsSingle = await connection.QueryAsync<SentSmsSingle>(
                    "dbo.SentSms_GetByDateSent",
                    new { DateSent = dateSent },
                    commandType: CommandType.StoredProcedure
                    );
            }
            return sentSmsSingle;
        }

        public async Task<IEnumerable<SentSmsGroup>> GetAllFilteredAsync(int applicationUserId, SentSmsSearchParams sentSmsSearchParams)
        {
            IEnumerable<SentSmsGroup> sentSmsFiltered;

            if (sentSmsSearchParams.DateSentStart == null)
            {
                sentSmsSearchParams.DateSentStart = "2020-01-01";
            }

            if (sentSmsSearchParams.DateSentEnd == null)
            {
                sentSmsSearchParams.DateSentEnd = "2070-01-01";
            }
            if(sentSmsSearchParams.Author == null)
            {
                sentSmsSearchParams.Author = "";
            }

            if(sentSmsSearchParams.NumberOfRecipients == "")
            {
                sentSmsSearchParams.NumberOfRecipients = null;
            }
            if(sentSmsSearchParams.TotalSmsNumber == "")
            {
                sentSmsSearchParams.TotalSmsNumber = null;
            }

            var par = new DynamicParameters();
            par.Add("ApplicationUserId", applicationUserId);
            par.Add("Author", sentSmsSearchParams.Author);
            par.Add("DateSentStart", sentSmsSearchParams.DateSentStart);
            par.Add("DateSentEnd", sentSmsSearchParams.DateSentEnd);
            par.Add("ServiceId", sentSmsSearchParams.ServiceId);
            par.Add("NumberOfRecipients", sentSmsSearchParams.NumberOfRecipients);
            par.Add("TotalSmsNumber", sentSmsSearchParams.TotalSmsNumber);
            par.Add("Text", sentSmsSearchParams.Text);

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                sentSmsFiltered = await connection.QueryAsync<SentSmsGroup>(
                    "dbo.SentSms_GetFiltered",
                    par, commandType:
                    CommandType.StoredProcedure);
            }

            return sentSmsFiltered;
        }
    }
}
