using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SmsPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiveSmsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ReceiveSmsController(IConfiguration config)
        {
            _config = config;
        }

        // GET api/<ReceiveSmsController>/5
        [HttpGet]
        [Route("receive")]
        public async Task<string> Get(
            [FromQuery(Name = "client_id")] string clientId,
            [FromQuery(Name = "service_id")] string serviceId,
            [FromQuery(Name = "message_id")] string messageId,
            [FromQuery(Name = "from")] string sender,
            [FromQuery(Name = "text")] string text)
        {
            if (text.Substring(0,8).ToUpper().Contains("NOSMS") || text.Substring(0, 8).ToUpper().Contains("NO-SMS"))
            {
                var off = new DynamicParameters();
                off.Add("PhoneNumber", sender);
                using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {
                    await connection.ExecuteAsync("BlacklistRecipients_Insert", off, commandType: CommandType.StoredProcedure);
                }
                return "added to blacklist";
            }
            else
            {
                var par = new DynamicParameters();
                par.Add("ClientId", clientId);
                par.Add("ServiceId", serviceId);
                par.Add("MessageId", messageId);
                par.Add("SenderPhoneNumber", sender);
                par.Add("Text", text);

                using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {
                    await connection.ExecuteAsync("ReceivedSms_Insert", par, commandType: CommandType.StoredProcedure);
                }
                return "message received";
            }
        }
    }
}
//http://localhost:57039/api/receivesms/receive?client_id=811&service_id=3&message_id=66323477&from=%2B995551345679&text=test%20HTTP/1.1