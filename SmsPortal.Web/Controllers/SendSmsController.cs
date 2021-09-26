using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmsPortal.Models.SentSms;
using SmsPortal.Services;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SmsPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendSmsController : ControllerBase
    {
        private readonly ISmsSendService _sendSmsService;
        private readonly IConfiguration _config;

        public SendSmsController(ISmsSendService sendSmsService, IConfiguration config)
        {
            _sendSmsService = sendSmsService;
            _config = config;
        }
        private static readonly HttpClient client = new HttpClient();

        //POST api/<SendSmsController>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create(SendSms sendSms)
        {
            try
            {
                var userId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);
                var dateSent = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
                string smsOff="";
                if (sendSms.SmsOff == true)
                {
                    smsOff = " NOSMS 91940";
                }

                if (sendSms.Encoding == 1)
                {
                    foreach (var recipient in sendSms.Recipients)
                    {
                        HttpResponseMessage response;

                        if (sendSms.Encoding == 1)
                        {
                            response = await client.GetAsync("http://81.95.160.47/mt/oneway?username={username}&password={password}&client_id={id}&" +
                            "service_id=" + sendSms.ServiceId +
                            "&to=" + recipient +
                            "&text=" + sendSms.Message +
                            smsOff);
                        }
                        else
                        {
                            response = await client.GetAsync("http://81.95.160.47/mt/oneway?username={username}&password={password}&client_id={id}&" +
                            "service_id=" + sendSms.ServiceId +
                            "&to=" + recipient +
                            "&text=" + sendSms.Message +
                            smsOff +
                            "&coding=" + sendSms.Encoding);
                        }
                        

                        var result = await response.Content.ReadAsStringAsync();
                        string status = result.Substring(0, 4);
                        string returnedSentId = result.Substring(7, 9);

                        var par = new DynamicParameters();
                        par.Add("RecipientPhoneNumber", recipient);
                        par.Add("ApplicationUserId", userId);
                        par.Add("Text", sendSms.Message + smsOff);
                        par.Add("SentStatus", status);
                        par.Add("ReturnedSentId", returnedSentId);
                        par.Add("DateSent", dateSent);
                        par.Add("ServiceId", sendSms.ServiceId);
                        par.Add("TotalSmsNumber", sendSms.TotalSmsNumber);

                        using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                        {
                            await connection.ExecuteAsync("SentSms_Insert", par, commandType: CommandType.StoredProcedure);
                        }
                    }
                }                

                return Ok();
            }
            catch (Exception ex)
            {
                string filePath = @"C:\Logs\sendSms.txt";
                using (StreamWriter sw = System.IO.File.AppendText(filePath))
                {
                    sw.WriteLine(DateTime.Now.ToString());
                    sw.WriteLine(ex);
                    sw.WriteLine();
                }
                throw ex;
            }
        }
    }
}
