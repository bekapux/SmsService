using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmsPortal.Models;
using SmsPortal.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SmsPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmsTemplateController : ControllerBase
    {
        private readonly ISmsTemplateRepository _smsTemplateProvider;

        public SmsTemplateController(
            ISmsTemplateRepository smsTemplateProvider)
        {
            _smsTemplateProvider = smsTemplateProvider;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<SmsTemplate>> GetAllAsync()
        {
            var applicationUserId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);
            return await _smsTemplateProvider.GetAllAsync(applicationUserId);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<SmsTemplate> GetAsync(int id)
        {
            return await _smsTemplateProvider.GetAsync(id);
        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Create(SmsTemplateCreate smsTemplateCreate)
        {
            try
            {
                var applicationUserId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);

                await _smsTemplateProvider.InsertAsync(smsTemplateCreate, applicationUserId);

                return Ok();
            }
            catch (Exception ex)
            {
                string filePath = @"C:\Logs\smsTemplate.txt";
                using (StreamWriter sw = System.IO.File.AppendText(filePath))
                {
                    sw.WriteLine(DateTime.Now.ToString());
                    sw.WriteLine(ex);
                    sw.WriteLine();
                }
                throw ex;
            }

        }

        [Authorize]
        [HttpDelete("{smsTemplateId}")]
        public async Task<ActionResult<int>> Delete(int smsTemplateId)
        {
            var userId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);

            var foundSmsTemplate = await _smsTemplateProvider.GetAsync(smsTemplateId);

            if (foundSmsTemplate == null)
            {
                return BadRequest("SmsTemplate does not exist.");
            }

            var affectedRows = await _smsTemplateProvider.DeleteAsync(smsTemplateId);

            return Ok(affectedRows);
        }
    }
}

