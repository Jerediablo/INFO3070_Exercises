using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;


namespace ExercisesDAL
{
    public class DivisionModel
    {
       
        public List<Division> GetAll()
        {
            List<Division> allDivisions = new List<Division>();

            try
            {
                SomeSchoolRepository<Division> repo = new SomeSchoolRepository<Division>();
                allDivisions = repo.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return allDivisions;
        }
    }
}
