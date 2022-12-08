using AutoMapper;
using CustomerMicroservice.Models;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace CustomerMicroservice.Helpers
{
    public class AutoMapProfile : Profile
    {
        public AutoMapProfile()
        {
            CreateMap<CustomerBase,Customer>().ReverseMap();
        }
    }
}
