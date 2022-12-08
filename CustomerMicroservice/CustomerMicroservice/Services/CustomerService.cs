using AutoMapper;
using CustomerMicroservice.Data;
using CustomerMicroservice.Models;
using CustomerMicroservice.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomerMicroservice.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly CustomerContext _context;
        private readonly IMapper _mapper;
        private static log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public CustomerService(CustomerContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Customer> Create(CustomerBase customer)
        {
            var _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds();
            var _entity = _mapper.Map<Customer>(customer);
            await _context.Customer.AddAsync(_entity);
            await _context.SaveChangesAsync();
            _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds() - _systime;
            Log.Info("[CustomerService]:[Create] Time required to create a record: "+_systime+"ms");
            return _entity;
        }

        public async Task Delete(int id)
        {
            var _entity = await _context.Customer.FirstOrDefaultAsync(x => x.Id == id);

            if(_entity == null)
            {
                Log.Error("[CustomerService]:[Delete] Customer does not exist");
                throw new Exception("Customer not found");
            }

            var _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds();
            _context.Remove(_entity);
            await _context.SaveChangesAsync();
            _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds() - _systime;
            Log.Info("[CustomerService]:[Create] Time required to remove a record: " + _systime + "ms");
        }

        public async Task<Customer> Index(int id)
        {
            var _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds();
            var _entity = await _context.Customer.FirstOrDefaultAsync(x => x.Id == id);
            _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds() - _systime;
            Log.Info("[CustomerService]:[Create] Time required to find a record: " + _systime + "ms");
            return _entity;
        }

        public async Task<List<Customer>> List()
        {
            var _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds();
            var _entities = await _context.Customer.ToListAsync();
            _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds() - _systime;
            Log.Info("[CustomerService]:[Create] Time required to find all records: " + _systime + "ms");
            return _entities;
        }

        public async Task<Customer> Update(int id, CustomerUpdate customer)
        {
            var _entity = await _context.Customer.FirstOrDefaultAsync(x => x.Id == id);

            if (_entity == null)
            {

                Log.Error("[CustomerService]:[Delete] Customer does not exist");
                throw new Exception("Customer not found");
            }

            if(!string.IsNullOrEmpty(customer.Name))
                _entity.Name = customer.Name;
            if(!string.IsNullOrEmpty(customer.Surname))
                _entity.Surname = customer.Surname;
            if(!string.IsNullOrEmpty(customer.Address))
                _entity.Address = customer.Address;
            if(!string.IsNullOrEmpty(customer.Phone))
                _entity.Phone = customer.Phone;
            if(customer.Age != 0)
                _entity.Age = customer.Age;

            var _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds();
            _context.Update(_entity);
            await _context.SaveChangesAsync();
            _systime = DateTimeOffset.Now.ToUnixTimeMilliseconds() - _systime;
            Log.Info("[CustomerService]:[Create] Time required to update a records: " + _systime + "ms");
            return _entity;

        }
    }
}
