using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmsPortal.Models;
using SmsPortal.Models.Account;
using SmsPortal.Repository;
using SmsPortal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace SmsPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<ApplicationUserIdentity> _userManager;
        private readonly SignInManager<ApplicationUserIdentity> _signInManager;
        private readonly IAccountRepository _accountRepository;

        public AccountController(
            ITokenService tokenService,
            UserManager<ApplicationUserIdentity> userManager,
            SignInManager<ApplicationUserIdentity> signInManager,
            IAccountRepository accountRepository
            )
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _accountRepository = accountRepository;
        }

        [Authorize]
        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> Register(ApplicationUserCreate applicationUserCreate)
        {

            var applicationUserIdentity = new ApplicationUserIdentity
            {
                Username = applicationUserCreate.Username,
                Fullname = applicationUserCreate.Fullname,
                IsAdmin = applicationUserCreate.IsAdmin
            };

            var result = await _userManager.CreateAsync(applicationUserIdentity, applicationUserCreate.Password);

            if (result.Succeeded)
            {
                applicationUserIdentity = await _userManager.FindByNameAsync(applicationUserCreate.Username);

                ApplicationUser applicationUser = new ApplicationUser()
                {
                    ApplicationUserId = applicationUserIdentity.ApplicationUserId,
                    Username = applicationUserIdentity.Username,
                    Fullname = applicationUserIdentity.Fullname,
                    IsAdmin = applicationUserIdentity.IsAdmin,
                    Token = _tokenService.CreateToken(applicationUserIdentity)
                };

                return Ok(applicationUser);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApplicationUser>> Login(ApplicationUserLogin applicationUserLogin)
        {
            try
            {
                var applicationUserIdentity = await _userManager.FindByNameAsync(applicationUserLogin.Username);

                if (applicationUserIdentity != null && applicationUserIdentity.IsActive)
                {
                    var result = await _signInManager.CheckPasswordSignInAsync(applicationUserIdentity, applicationUserLogin.Password, false);

                    if (result.Succeeded)
                    {
                        ApplicationUser applicationUser = new ApplicationUser
                        {
                            ApplicationUserId = applicationUserIdentity.ApplicationUserId,
                            Username = applicationUserIdentity.Username,
                            Fullname = applicationUserIdentity.Fullname,
                            IsAdmin = applicationUserIdentity.IsAdmin,
                            Token = _tokenService.CreateToken(applicationUserIdentity),

                        };

                        Console.WriteLine(applicationUser);
                        Console.WriteLine(applicationUserIdentity);

                        return Ok(applicationUser);
                    }
                }

                if (applicationUserIdentity != null && applicationUserIdentity.IsActive == false)
                {
                    return BadRequest("User Is Not Active");
                }
                return BadRequest("Invalid login attempt.");
            }
            catch (Exception ex)
            {
                string filePath = @"C:\Logs\test.txt";
                System.IO.File.WriteAllText(filePath, ex.ToString());
                throw ex;
            }
           
        }

        [Authorize]
        [HttpDelete("{applicationUserId}")]
        public async Task<ActionResult<int>> Delete(int applicationUserId)
        {
            var foundSmsTemplate = await _accountRepository.GetAsync(applicationUserId);
            if (foundSmsTemplate == null) return BadRequest("User does not exist.");
            var affectedRows = await _accountRepository.DeleteAsync(applicationUserId);
            return Ok(affectedRows);
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<ApplicationUserIdentity>> Get()
        {
            var applicationUserId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);

            return await _accountRepository.GetAllAsync(applicationUserId);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ApplicationUserIdentity> GetAsync(int id)
        {
            return await _accountRepository.GetAsync(id);
        }

        [Authorize]
        [HttpPost("promote/{id}")]
        public async Task<int> Promote(int id)
        {
            return await _accountRepository.Promote(id);
        }

        [Authorize]
        [HttpPost("denote/{id}")]
        public async Task<int> Denote(int id)
        {
            return await _accountRepository.Denote(id);
        }
    }
}
