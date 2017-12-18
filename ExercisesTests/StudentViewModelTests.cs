using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ExercisesViewModels;

namespace ExercisesTests
{
    [TestClass]
    public class StudentViewModelTests
    {
        [TestMethod]
        public void StudentViewModelReturnByLastNameShouldReturnAllData()
        {
            StudentViewModel vm = new StudentViewModel();
            vm.Lastname = "Peterson-Katz";
            vm.GetByLastName();
            Assert.IsTrue(vm.Firstname.Length > 0); // means student has data
        }

        [TestMethod]
        public void StudentViewModelUpdateTwiceShouldReturnStaleInt()
        {
            StudentViewModel vm1 = new StudentViewModel();
            StudentViewModel vm2 = new StudentViewModel();
            vm1.Lastname = "Peterson-Katz";
            vm2.Lastname = "Peterson-Katz";
            vm1.GetByLastName();
            vm2.GetByLastName();
            vm1.Phoneno = "(555)555-5555";
            vm2.Phoneno = "(555)555-4414";
            if (vm1.Update() == 1)
            {
                Assert.IsTrue(vm2.Update() == -2); // -2 represents a stale status
            }
            else
                Assert.Fail();
        }
    }
}
