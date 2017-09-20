using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using ExercisesDAL;
using System.Collections.Generic;

namespace ExercisesTests
{
    [TestClass]
    public class StudentModelTests
    {
        //[TestMethod]
        //public void StudentModelGetbyLastnameShouldReturnStudent()
        //{
        //    StudentModel model = new StudentModel();
        //    Student someStudent = model.GetByLastname("Peterson-Katz");
        //    Assert.IsNotNull(someStudent);
        //}

        //[TestMethod]
        //public void StudentModelGetbyLastnameShouldNotReturnStudent()
        //{
        //    StudentModel model = new StudentModel();
        //    Student someStudent = model.GetByLastname("Nosey");
        //    Assert.IsNull(someStudent); 
        //}

        [TestMethod]
        public void StudentModelGetAllShouldReturnList()
        {
            StudentModel model = new StudentModel();
            List<Student> allStudents = model.GetAll();
            Assert.IsTrue(allStudents.Count > 0);
        }

        [TestMethod]
        public void StudentModelAddShouldReturnNewId()
        {
            StudentModel model = new StudentModel();
            Student newStudent = new Student();
            newStudent.Title = "Mr.";
            newStudent.FirstName = "Test";
            newStudent.LastName = "Student";
            newStudent.Email = "ts@abc.com";
            newStudent.PhoneNo = "(555)555-5551";
            newStudent.DivisionId = 10;
            int newId = model.Add(newStudent);
            Assert.IsTrue(newId > 0);
        }

        [TestMethod]
        public void StudentModelGetbyIdShouldReturnStudent()
        {
            StudentModel model = new StudentModel();
            Student someStudent = model.GetByLastname("Student");
            Student anotherStudent = model.GetById(someStudent.Id);
            Assert.IsNotNull(anotherStudent);
        }

        [TestMethod]
        public void StudentModelUpdateShouldReturnOne()
        {
            StudentModel model = new StudentModel();
            Student updateStudent = model.GetByLastname("Student");
            updateStudent.Email = "ts@xyz.com";
            int StudentsUpdated = model.Update(updateStudent);
            Assert.IsTrue(StudentsUpdated == 1);
        }

        [TestMethod]
        public void StudentModelDeleteShouldReturnOne()
        {
            StudentModel model = new StudentModel();
            Student deleteStudent = model.GetByLastname("Student");
            int StudentsDeleted = model.Delete(deleteStudent.Id);
            Assert.IsTrue(StudentsDeleted == 1);
        }
    }
}
