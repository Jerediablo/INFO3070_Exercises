using System;
using ExercisesDAL;
using System.Reflection;
using System.Collections.Generic;

namespace ExercisesViewModels
{
    public class StudentViewModel
    {
        private StudentModel _model;
        public string Title { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Phoneno { get; set; }
        public string Timer { get; set; }
        public int DivisionId { get; set; }
        public int Id { get; set; }
        public string Picture64 { get; set; }

        // constructor
        public StudentViewModel()
        {
            _model = new StudentModel();
        }

        //
        // find student using Lastname property
        //

        public void GetByLastName()
        {
            try
            {
                Student stu = _model.GetByLastname(Lastname);
                Title = stu.Title;
                Firstname = stu.FirstName;
                Lastname = stu.LastName;
                Phoneno = stu.PhoneNo;
                Email = stu.Email;
                Id = stu.Id;
                DivisionId = stu.DivisionId;
                if (stu.Picture != null)
                {
                    Picture64 = Convert.ToBase64String(stu.Picture);
                }
                Timer = Convert.ToBase64String(stu.Timer);
            }
            catch (NullReferenceException nex)
            {
                Lastname = "not found";
             
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }

        public int Update()
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                Student stu = new Student();
                stu.Title = Title;
                stu.FirstName = Firstname;
                stu.LastName = Lastname;
                stu.PhoneNo = Phoneno;
                stu.Email = Email;
                stu.Id = Id;
                stu.DivisionId = DivisionId;
                if (Picture64 != null)
                {
                    stu.Picture = Convert.FromBase64String(Picture64);
                }
                stu.Timer = Convert.FromBase64String(Timer);
                opStatus = _model.Update(stu);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return Convert.ToInt16(opStatus);
        }

        public List<StudentViewModel> GetAll()
        {
            List<StudentViewModel> allVms = new List<StudentViewModel>();
            try
            {
                List<Student> allStudents = _model.GetAll();
                foreach (Student stu in allStudents)
                {
                    StudentViewModel stuVm = new StudentViewModel();
                    stuVm.Title = stu.Title;
                    stuVm.Firstname = stu.FirstName;
                    stuVm.Lastname = stu.LastName;
                    stuVm.Phoneno = stu.PhoneNo;
                    stuVm.Email = stu.Email;
                    stuVm.Id = stu.Id;
                    stuVm.DivisionId = stu.DivisionId;
                   // stuVm.DivisionName = stu.Division.Name; 
                    stuVm.Timer = Convert.ToBase64String(stu.Timer);
                    allVms.Add(stuVm);
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

        public void Add()
        {
            Id = -1;
            try
            {
                Student stu = new Student();
                stu.Title = Title;
                stu.FirstName = Firstname;
                stu.LastName = Lastname;
                stu.PhoneNo = Phoneno;
                stu.Email = Email;
                stu.DivisionId = DivisionId;
                Id = _model.Add(stu);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " +
                    MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }

        public int Delete()
        {
            int studentsDeleted = -1;
            
            try
            {
                studentsDeleted = _model.Delete(Id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + MethodBase.GetCurrentMethod().Name + ex.Message);
            }
            return studentsDeleted;
        }
    }
}
