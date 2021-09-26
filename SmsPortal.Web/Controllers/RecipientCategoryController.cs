using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmsPortal.Models.RecipientCategories;
using SmsPortal.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmsPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipientCategoryController : ControllerBase
    {
        private readonly IRecipientCategoryRepository _recipientCategoryRepository;

        public RecipientCategoryController(IRecipientCategoryRepository recipientCategoryRepository)
        {
            _recipientCategoryRepository = recipientCategoryRepository;
        }

        [Authorize]
        [HttpGet]
        [Route("getAll")]
        public async Task<IEnumerable<RecipientCategory>> GetAllAsync()
        {
            return await _recipientCategoryRepository.GetAllAsync();
        }

        [Authorize]
        [HttpPost]
        [Route("create")]
        public async Task Create(RecipientCategoryCreate categoryCreate)
        {
            var applicationUserId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);
            await _recipientCategoryRepository.InsertAsync(categoryCreate, applicationUserId);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<RecipientCategory> GetAsync(int id)
        {
            return await _recipientCategoryRepository.GetAsync(id);
        }

    }
}
