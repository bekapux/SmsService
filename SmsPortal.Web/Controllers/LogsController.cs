using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models.DetailsVisitLog;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmsPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public LogsController(IConfiguration config)
        {
            _config = config;
        }

        // POST api/<DetailsVisitLog>
        [HttpPost]
        [Route("details")]
        public async Task<ActionResult> Post(DetailsVisit detailsVisit)
        {
            var applicationUserId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);

            var par = new DynamicParameters();
            par.Add("ApplicationUserId", applicationUserId);
            par.Add("DateSentVisited", detailsVisit.dateSent);

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.ExecuteAsync("DetailsVisitLog_insert", par, commandType: CommandType.StoredProcedure);
            }

            return Ok();
        }
    }
}
