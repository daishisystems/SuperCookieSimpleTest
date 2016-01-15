using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SuperCookieSimpleTest.Controllers
{
    public class HSTSResponse
    {
        public bool IsSet { get; set; }
    }

    [RoutePrefix("api/hsts")]
    public class ValuesController : ApiController
    {
        [Route("read")]
        [AcceptVerbs("GET")]
        public HSTSResponse Read()
        {
            if (Request.RequestUri.Scheme.Equals("https"))
            {
                return new HSTSResponse
                {
                    IsSet = true
                };
            }

            return new HSTSResponse();
        }

        [Route("write")]
        [AcceptVerbs("GET")]
        public HttpResponseMessage Write()
        {
            HttpResponseMessage response;

            if (Request.RequestUri.Scheme.Equals("https"))
            {
                response = Request.CreateResponse(HttpStatusCode.NoContent);
                response.Headers.Add("Strict-Transport-Security",
                    "max-age=31536000");

                return response;
            }

            response = Request.CreateResponse(HttpStatusCode.MovedPermanently);
            response.Headers.Location =
                new Uri(Request.RequestUri.AbsoluteUri.Replace("http", "https"));

            return response;
        }
    }
}