using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;

namespace ExercisesDAL
{
    public class StudentModel
    {
        IRepository<Student> repo;

        public StudentModel()
        {
            repo = new SomeSchoolRepository<Student>();
        }

        public Student GetByLastname(string name)
        {
            List<Student> selectedStudents = null;

            try
            {
                selectedStudents = repo.GetByExpression(stu => stu.LastName == name);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return selectedStudents.FirstOrDefault();
        }

        public Student GetById(int id)
        {
            List<Student> selectedStudents = null;

            try
            {
                selectedStudents = repo.GetByExpression(stu => stu.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return selectedStudents.FirstOrDefault();
        }

        public List<Student> GetAll()
        {
            List<Student> allStudents = new List<Student>();

            try
            {
                allStudents = repo.GetAll();
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
               repo.Add(newStudent); 
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return newStudent.Id;
        }

        public UpdateStatus Update(Student updatedStudent)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;

            try
            {
                opStatus = repo.Update(updatedStudent);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return opStatus;
        }

        public int Delete(int id)
        {
            int studentsDeleted = -1;

            try
            {
                studentsDeleted = repo.Delete(id);
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
