using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class T_shirtsController : ControllerBase
    {
        private readonly TshirtDbcontext _context;
        //Added for Image Upload
        //private readonly IWebHostEnvironment _hostEnvironment;

        //public T_shirtsController(TshirtDbcontext context,IWebHostEnvironment hostEnvironment)
        public T_shirtsController(TshirtDbcontext context)
        {
            _context = context;
            //Added for Image Upload
            //this._hostEnvironment = hostEnvironment;
        }

        // GET: api/T_shirts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<T_shirts>>> GetT_Shirt()
        {
            return await _context.T_Shirt.ToListAsync();
        }

        // GET: api/T_shirts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<T_shirts>> GetT_shirts(int id)
        {
            var t_shirts = await _context.T_Shirt.FindAsync(id);

            if (t_shirts == null)
            {
                return NotFound();
            }

            return t_shirts;
        }

        // PUT: api/T_shirts/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutT_shirts(int id, T_shirts t_shirts)
        {
            //if (id != t_shirts.id)
            //{
            //    return BadRequest();
            //}
            t_shirts.id = id;

            _context.Entry(t_shirts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!T_shirtsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/T_shirts
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [DisableRequestSizeLimit]
        [HttpPost]
        //Added for Image Upload
        //public async Task<ActionResult<T_shirts>> PostT_shirts([FromForm]T_shirts t_shirts)
        public async Task<ActionResult<T_shirts>> PostT_shirts(T_shirts t_shirts)
        {
            //Added for Image Upload
            //t_shirts.ImageName= await SaveImage(t_shirts.image);
            _context.T_Shirt.Add(t_shirts);
            await _context.SaveChangesAsync();

            return StatusCode(201);
           // return CreatedAtAction("GetT_shirts", new { id = t_shirts.id }, t_shirts);
        }

        // DELETE: api/T_shirts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<T_shirts>> DeleteT_shirts(int id)
        {
            var t_shirts = await _context.T_Shirt.FindAsync(id);
            if (t_shirts == null)
            {
                return NotFound();
            }

            _context.T_Shirt.Remove(t_shirts);
            await _context.SaveChangesAsync();

            return t_shirts;
        }

        private bool T_shirtsExists(int id)
        {
            return _context.T_Shirt.Any(e => e.id == id);
        }
        //Added for Image Upload
        //[NonAction]
        //public async Task<string> SaveImage(IFormFile imageFile)
        //{
        //    string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
        //    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
        //    var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "images", imageName);
        //    using (var fileStream = new FileStream(imagePath, FileMode.Create))
        //    {
        //        await imageFile.CopyToAsync(fileStream);
        //    }
        //    return imageName;
        //}
    }
}
