using System;
using System.Web.Http;
using ExercisesViewModels;
using System.Collections.Generic;

namespace ExercisesWebsite.Controllers
{
    public class DivisionController : ApiController
    {
        [Route("api/divisions")]
        public IHttpActionResult GetAll()
        {
            try
            {
                DivisionViewModel div = new DivisionViewModel();
                List<DivisionViewModel> alldivisions = div.GetAll();
                return Ok(alldivisions);
            }
            catch (Exception ex)
            {
                return BadRequest("Retrieve failed - " + ex.Message);
            }
        }
    }
}