using System;

namespace CustomerMicroservice.Models
{
    public class CustomerUpdate
    {
        #nullable enable
        public string ?Name { get; set; }
        public string ?Surname { get; set; }
        public string ?Address { get; set; }
        public int Age { get; set; }
        public string ?Phone { get; set; }
        #nullable disable
    }
}
