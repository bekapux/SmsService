using Dapper;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models.RecipientCategories;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SmsPortal.Repository
{
    public class RecipientCategoryRepository : IRecipientCategoryRepository
    {
        private readonly IConfiguration _config;

        public RecipientCategoryRepository(IConfiguration config)
        {
            _config = config;

        }
        public async Task<IEnumerable<RecipientCategory>> GetAllAsync()
        {
            IEnumerable<RecipientCategory> recipientCategories;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                recipientCategories = await connection.QueryAsync<RecipientCategory>(
                    "dbo.Category_GetAll",
                    new { }, commandType:
                    CommandType.StoredProcedure
                    );
            }

            return recipientCategories;
        }

        public async Task<RecipientCategory> GetAsync(int CategoryId)
        {
            RecipientCategory recipientCategory;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                recipientCategory = await connection.QuerySingleAsync<RecipientCategory>(
                    "dbo.RecipientCategory_GetById",
                    new { CategoryId = CategoryId },
                    commandType: CommandType.StoredProcedure
                    );
            }
            return recipientCategory;
        }

        public async Task InsertAsync(RecipientCategoryCreate categoryCreate, int applicationUserId)
        {
            var par = new DynamicParameters();
            par.Add("CategoryId", categoryCreate.CategoryId);
            par.Add("CreatedBy", applicationUserId);
            par.Add("CategoryName", categoryCreate.CategoryName);

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.ExecuteAsync("Category_InsUpd", par, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
