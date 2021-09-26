using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmsPortal.Models.RecipientGroups;
using SmsPortal.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmsPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipientGroupController : ControllerBase
    {
        private readonly IRecipientGroupRepository _recipientGroupRepository;

        public RecipientGroupController(IRecipientGroupRepository recipientGroupRepository)
        {
            _recipientGroupRepository = recipientGroupRepository;
        }

        [Authorize]
        [HttpGet]
        [Route("getAll")]
        public async Task<IEnumerable<RecipientGroup>> GetAllAsync()
        {
            return await _recipientGroupRepository.GetAllAsync();
        }

        [Authorize]
        [HttpPost]
        [Route("create")]
        public async Task<ActionResult> Create(RecipientGroupCreate groupCreate)
        {
            var applicationUserId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);

            await _recipientGroupRepository.InsertAsync(groupCreate, applicationUserId);

            return Ok();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<RecipientGroup> GetAsync(int id)
        {
            return await _recipientGroupRepository.GetAsync(id);
        }

    }
}
