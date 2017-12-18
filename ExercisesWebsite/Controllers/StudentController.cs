using System;
using System.Web.Http;
using ExercisesViewModels;
using System.Collections.Generic;



namespace ExercisesWebsite.Controllers
{
    public class StudentController : ApiController
    {
        [Route("api/students/{name}")]
        public IHttpActionResult Get(string name)
        {
            try
            {
                StudentViewModel stu = new StudentViewModel();
                stu.Lastname = name;
                stu.GetByLastName();
                return Ok(stu);
            }
            catch (Exception ex)
            {
                return BadRequest("Retrieved failed - " + ex.Message);
            }
        }

        [Route("api/students")]
        public IHttpActionResult Put(StudentViewModel stu)
        {
            try
            {
                int retVal = stu.Update();
                switch (retVal)
                {
                    case 1:
                        return Ok("Student " + stu.Lastname + " updated!");
                    case -1:
                        return Ok("Student " + stu.Lastname + " not updated!");
                    case -2:
                        return Ok("Data is stale for " + stu.Lastname + ", Student not updated!");
                    default:
                        return Ok("Student " + stu.Lastname + " not updated!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Update failed - " + ex.Message);
            }
        }

        [Route("api/students")]
        public IHttpActionResult GetAll()
        {
            try
            {
                StudentViewModel stu = new StudentViewModel();
                List<StudentViewModel> allStudents = stu.GetAll();
                return Ok(allStudents);
            }
            catch (Exception ex)
            {
                return BadRequest("Retrieve failed - " + ex.Message);
            }
        }

        [Route("api/students")]
        public IHttpActionResult Post(StudentViewModel stu)
        {
            try
            {
                stu.Add();
                if (stu.Id > 0)
                {
                    return Ok("Student " + stu.Lastname + " added!");
                }
                else
                {
                    return Ok("Student" + stu.Lastname + " not added!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Creation failed - Contact Tech Support");
            }
        }

        [Route("api/students/{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                StudentViewModel stu = new StudentViewModel();
                stu.Id = id;

                if (stu.Delete() == 1)
                {
                    return Ok("Student deleted!");
                }
                else
                {
                    return Ok("Student not deleted!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Delete failed - Contact Tech Support");
            }
        }
    }
}