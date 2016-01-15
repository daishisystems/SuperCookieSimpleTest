using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SuperCookieSimpleTest;
using SuperCookieSimpleTest.Controllers;

namespace SuperCookieSimpleTest.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Home Page", result.ViewBag.Title);
        }
    }
}
