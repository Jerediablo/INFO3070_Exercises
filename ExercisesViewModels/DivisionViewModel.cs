using System;
using ExercisesDAL;
using System.Reflection;
using System.Collections.Generic;

namespace ExercisesViewModels
{
    public class DivisionViewModel
    {

        private DivisionModel _model;
        public int Id { get; set; }
        public string Name { get; set; }
        public string Timer { get; set; }

        public DivisionViewModel()
        {
            _model = new DivisionModel();
        }

        public List<DivisionViewModel> GetAll()
        {
            List<DivisionViewModel> allVms = new List<DivisionViewModel>();
            try
            {
                List<Division> allDivisions = _model.GetAll();
                foreach (Division div in allDivisions)
                {
                    DivisionViewModel divVm = new DivisionViewModel();
                    divVm.Id = div.Id;
                    divVm.Name = div.Name; 
                    divVm.Timer = Convert.ToBase64String(div.Timer);
                    allVms.Add(divVm);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return allVms;
        }
    }
}
