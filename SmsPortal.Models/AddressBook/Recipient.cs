using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models.AddressBook
{
    public class Recipient
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Group { get; set; }
        public string Category { get; set; }
    }
}
