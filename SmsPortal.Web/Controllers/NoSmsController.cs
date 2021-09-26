using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models.NoSms;
using SmsPortal.Repository;
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
    public class NoSmsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public NoSmsController( IConfiguration config)
        {
            _config = config;
        }
        
        // POST api/<NoSmsController>
        [HttpPost]
        [Route("insert")]
        public async Task<ActionResult> Create(NoSms noSms)
        {
            var UserId = 2;
            var par = new DynamicParameters();
            par.Add("NoSmsText", noSms.NoSmsText);
            par.Add("CreatorApplicationUserId", UserId);

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.ExecuteAsync("NoSms_InsUpd", par, commandType: CommandType.StoredProcedure);
            }
            return Ok();
        }

        // GET: api/<NoSmsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<NoSmsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

    }
}
