using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace Server.Controllers
{
    using HubConfig;
    using Infrastructure;
    using Models;

    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private IHubContext<ProductHub> _hub;
        private readonly ProductContext _context;

        private readonly ILogger<ProductController> _logger;

        public ProductController(
            ProductContext context,
            IHubContext<ProductHub> hub,
            ILogger<ProductController> logger
        )
        {
            _context = context;
            _hub = hub;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _context.Products;
        }

        [HttpPost]
        public IActionResult Create(
            [FromBody] Product data
        ) {
            if (ModelState.IsValid) {
                _context.Add(data);
                _context.SaveChanges();
                _hub.Clients.All.SendAsync(
                    "productData", _context.Products
                );
                return Ok(data.Id);
            }
            else
                return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Update(
            int id,
            [FromBody] Product data
        ) {
            if (ModelState.IsValid) {
                data.Id = id;
                _context.Update(data);
                _context.SaveChanges();
                return Ok();
            }
            else
                return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public void DeleteProduct(int id)
        {
            _context.Products.Remove(
                new Product { Id = id }
            );
            _context.SaveChanges();
        }
    }
}
