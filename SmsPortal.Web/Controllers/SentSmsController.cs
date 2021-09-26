using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmsPortal.Models.SentSms;
using SmsPortal.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmsPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SentSmsController : ControllerBase
    {

        private readonly ISentSmsRepository _sentSmsRepository;
        public SentSmsController(ISentSmsRepository sentSmsRepository)
        {
            _sentSmsRepository = sentSmsRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<SentSmsGroup>> Get()
        {
            var applicationUserId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);

            return await _sentSmsRepository.GetAllAsync(applicationUserId);
        }

        [Authorize]
        [HttpGet("{dateSent}")]
        public async Task<IEnumerable<SentSmsSingle>> GetAsync(DateTime dateSent)
        {
            return await _sentSmsRepository.GetAsync(dateSent);
        }

        [Authorize]
        [HttpPost]
        [Route("filter")]
        public async Task<IEnumerable<SentSmsGroup>> GetAllAsync(SentSmsSearchParams sentSmsSearchParams)
        {
            var applicationUserId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);
            var ragac = await _sentSmsRepository.GetAllFilteredAsync(applicationUserId, sentSmsSearchParams);
            return ragac;
        }
    }
}
