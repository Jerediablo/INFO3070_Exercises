namespace ExercisesDAL
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Grade : SchoolEntity
    {

        public int StudentId { get; set; }

        public int CourseId { get; set; }

        public int Mark { get; set; }

        [StringLength(200)]
        public string Comments { get; set; }

        public virtual Course Cours { get; set; }

        public virtual Student Student { get; set; }
    }
}
