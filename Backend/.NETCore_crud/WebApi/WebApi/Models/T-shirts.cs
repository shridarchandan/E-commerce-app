using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class T_shirts
    {
        [Key]
        public int id { get; set; }
        [Column(TypeName="nvarchar(20)")]
        public string size { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string price { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string color { get; set; }
        [Column(TypeName = "nvarchar(25)")]
        public string made { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string style { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        public string gender { get; set; }
        //[Column(TypeName = "nvarchar(100)")]

        //Added for Image Upload
        //public string ImageName { get; set; }

        //[NotMapped]
        //public IFormFile image { get; set; }
        [Column(TypeName = "nvarchar(400)")]
        public string image { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string description { get; set; }
   
    }
}
