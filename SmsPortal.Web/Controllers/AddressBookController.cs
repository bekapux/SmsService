using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmsPortal.Models.AddressBook;
using SmsPortal.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmsPortal.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressBookController : ControllerBase
    {
        private readonly IAddressBookRepository _addressBookRepository;

        public AddressBookController(
            IAddressBookRepository addressBookRepository)
        {
            _addressBookRepository = addressBookRepository;
        }


        [Authorize]
        [HttpPost]
        [Route("Single")]
        public async void Create(Recipient recipient)
        {
            try
            {
                var applicationUserId = int.Parse(User.Identities.First().Claims.First(c => c.Type == "nameid").Value);

                await _addressBookRepository.InsertAsync(recipient, applicationUserId);
            }
            catch (Exception ex)
            {
                string filePath = @"C:\Logs\AddressBookAddSignle.txt";
                using (StreamWriter sw = System.IO.File.AppendText(filePath))
                {
                    sw.WriteLine(DateTime.Now.ToString());
                    sw.WriteLine(ex);
                    sw.WriteLine();
                }
                throw ex;
            }
        }


        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
