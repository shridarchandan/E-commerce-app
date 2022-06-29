using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebApi.Models;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<TshirtDbcontext>(options => options.UseSqlServer(Configuration.GetConnectionString("DevConnection")));
            services.Configure<FormOptions>(o => {
                o.ValueLengthLimit = int.MaxValue;
                o.ValueCountLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = long.MaxValue;
                o.MultipartBoundaryLengthLimit = int.MaxValue;
                o.BufferBodyLengthLimit = long.MaxValue;
                o.BufferBody = true;
                o.MemoryBufferThreshold = int.MaxValue;
                o.KeyLengthLimit = int.MaxValue;
                o.MultipartHeadersLengthLimit = int.MaxValue;
                o.MultipartHeadersCountLimit = int.MaxValue;
            });
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options => options.WithOrigins("http://localhost:63603").AllowAnyHeader().AllowAnyMethod());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
