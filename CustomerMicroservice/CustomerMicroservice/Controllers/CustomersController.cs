using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerMicroservice.Data;
using CustomerMicroservice.Models;
using CustomerMicroservice.Services.Interfaces;
using log4net;

namespace CustomerMicroservice.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _service;
        private static log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public CustomersController(ICustomerService service)
        {
            _service = service;
        }

        // GET: api/customers
        [HttpGet]
        public async Task<ActionResult> List()
        {
            Log.Info("[CustomerRest]:[List] Operation read all");
            return Ok(await _service.List());
        }

        // GET: api/customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> Index(int id)
        {
            Log.Info("[CustomerRest]:[Index] Operation read one. ID: "+id);
            var customer = await _service.Index(id);

            if (customer == null)
            {

                Log.Error("[CustomerRest]:[Index] Customer not found");
                return NotFound();
            }

            return Ok(customer);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id,[FromBody] CustomerUpdate customer)
        {
            try
            {
                Log.Info("[CustomerRest]:[Update] Operation update one. ID: " + id);
                return Ok(await _service.Update(id, customer));
            }catch(Exception e)
            {
                return NotFound(e.Message);
            }
        }

        // POST: api/customers
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CustomerBase customer)
        {
            if (customer == null)
            {
                Log.Error("[CustomerRest]:[Create] Create fields are null");
                return BadRequest("Customer fields are null");
            }
            Log.Info("[CustomerRest]:[Create] Operation create");
            var _entity = await _service.Create(customer);

            return Created(nameof(Index), _entity);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCustomer(int id)
        {
            try
            {
                Log.Info("[CustomerRest]:[Delete] Operation delete");
                await _service.Delete(id);
            }catch(Exception e)
            {
                Log.Error("[CustomerRest]:[Delete] Customer not found");
                return NotFound(e.Message);
            }
            return NoContent();
        }

    }
}
