using System;
using System.Collections.Generic;
using System.Text;

namespace SmsPortal.Models.RecipientCategories
{
    public class RecipientCategoryCreate
    {
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
