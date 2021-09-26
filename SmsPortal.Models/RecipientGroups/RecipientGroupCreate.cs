using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models.RecipientGroups
{
    public class RecipientGroupCreate
    {
        public int? GroupId { get; set; }
        public string GroupName { get; set; }
    }
}