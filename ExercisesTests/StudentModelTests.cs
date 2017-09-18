using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using ExercisesDAL;

namespace ExercisesTests
{
    [TestClass]
    public class StudentModelTests
    {
        [TestMethod]
        public void StudentModelGetbyLastnameShouldReturnStudent()
        {
            StudentModel model = new StudentModel();
            Student someStudent = model.GetByLastname("Peterson-Katz");
            Assert.IsNotNull(someStudent);
        }

        [TestMethod]
        public void StudentModelGetbyLastnameShouldNotReturnStudent()
        {
            StudentModel model = new StudentModel();
            Student someStudent = model.GetByLastname("Nosey");
            Assert.IsNull(someStudent); 
        }
    }
}
