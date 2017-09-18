using System;
using System.Linq;
using System.Reflection;

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
    }
}
