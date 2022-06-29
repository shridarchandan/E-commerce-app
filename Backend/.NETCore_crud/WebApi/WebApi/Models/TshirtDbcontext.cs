using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class TshirtDbcontext : DbContext
    {
        public TshirtDbcontext(DbContextOptions<TshirtDbcontext> options) : base(options)
        {

        }
        public DbSet<T_shirts> T_Shirt { get; set; }
    }
}
