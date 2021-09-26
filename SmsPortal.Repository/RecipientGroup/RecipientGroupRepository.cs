using Dapper;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models.RecipientGroups;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public class RecipientGroupRepository : IRecipientGroupRepository
    {
        private readonly IConfiguration _config;

        public RecipientGroupRepository(IConfiguration config)
        {
            _config = config;
        }
        public async Task<IEnumerable<RecipientGroup>> GetAllAsync()
        {
            IEnumerable<RecipientGroup> recipientGroup;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                recipientGroup = await connection.QueryAsync<RecipientGroup>(
                    "dbo.Group_GetAll",
                    new { }, commandType:
                    CommandType.StoredProcedure
                    );
            }

            return recipientGroup;
        }

        public async Task<RecipientGroup> GetAsync(int GroupId)
        {
            RecipientGroup recipientGroup;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                recipientGroup = await connection.QuerySingleAsync<RecipientGroup>(
                    "dbo.RecipientGroup_GetById",
                    new { GroupID = GroupId },
                    commandType: CommandType.StoredProcedure
                    );
            }
            return recipientGroup;
        }

        public async Task InsertAsync(RecipientGroupCreate groupCreate, int applicationUserId)
        {
            var par = new DynamicParameters();
            par.Add("GroupId", groupCreate.GroupId);
            par.Add("CreatedBy", applicationUserId);
            par.Add("GroupName", groupCreate.GroupName);

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.ExecuteAsync("Group_InsUpd", par, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

