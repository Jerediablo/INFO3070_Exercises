namespace ExercisesDAL
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Student
    {
        public int Id { get; set; }

        [StringLength(4)]
        public string Title { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        [StringLength(25)]
        public string PhoneNo { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        public int DivisionId { get; set; }

        public byte[] Picture { get; set; }

        [Column(TypeName = "timestamp")]
        [MaxLength(8)]
        [Timestamp]
        public byte[] Timer { get; set; }

        public virtual Division Division { get; set; }
    }
}
