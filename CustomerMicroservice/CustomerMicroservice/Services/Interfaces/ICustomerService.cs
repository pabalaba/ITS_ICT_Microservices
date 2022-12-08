using CustomerMicroservice.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomerMicroservice.Services.Interfaces
{
    public interface ICustomerService
    {

        public Task<List<Customer>> List();
        public Task<Customer> Index(int id);
        public Task<Customer> Create(CustomerBase customer);
        public Task<Customer> Update(int id,CustomerUpdate customer);
        public Task Delete(int id);

    }
}
