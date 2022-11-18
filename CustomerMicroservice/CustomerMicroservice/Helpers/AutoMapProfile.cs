using AutoMapper;
using CustomerMicroservice.Entities;
using CustomerMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerMicroservice.Helpers
{
    public class AutoMapProfile : Profile
    {
        public AutoMapAttribute() => CreateMap<CustomerModel, Customer>().ReverseMap();
    }
}
