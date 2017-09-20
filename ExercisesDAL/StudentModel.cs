using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;

namespace ExercisesDAL
{
    public class StudentModel
    {
        public Student GetByLastname(string name)
        {
            Student selectedStudent = null;

            try
            {
                SomeSchoolContext ctx = new SomeSchoolContext();
                selectedStudent = ctx.Students.FirstOrDefault(stu => stu.LastName == name);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return selectedStudent;
        }

        public Student GetById(int id)
        {
            Student selectedStudent = null;

            try
            {
                SomeSchoolContext ctx = new SomeSchoolContext();
                selectedStudent = ctx.Students.FirstOrDefault(stu => stu.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return selectedStudent;
        }

        public List<Student> GetAll()
        {
            List<Student> allStudents = new List<Student>();

            try
            {
                SomeSchoolContext ctx = new SomeSchoolContext();
                allStudents = ctx.Students.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return allStudents;
        }

        public int Add(Student newStudent)
        {
            try
            {
                SomeSchoolContext ctx = new SomeSchoolContext();
                ctx.Students.Add(newStudent);
                ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return newStudent.Id;
        }

        public int Update(Student updatedStudent)
        {
            int studentsUpdated = -1;

            try
            {
                SomeSchoolContext ctx = new SomeSchoolContext();
                Student currentStudent = ctx.Students.FirstOrDefault(stu => stu.Id == updatedStudent.Id);
                ctx.Entry(currentStudent).CurrentValues.SetValues(updatedStudent);
                studentsUpdated = ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return studentsUpdated;
        }

        public int Delete(int id)
        {
            int studentsDeleted = -1;

            try
            {
                SomeSchoolContext ctx = new SomeSchoolContext();
                Student currentStudent = ctx.Students.FirstOrDefault(stu => stu.Id == id);
                ctx.Students.Remove(currentStudent);
                studentsDeleted = ctx.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return studentsDeleted;
        }
    }
}
