using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.OptionsModel;
using System.Data.SqlClient;

namespace ConnectedFamily.Controllers
{
    [Route("api/[controller]")]
    public class ListItemsController : Controller
    {
        private readonly SiteSettings _settings;
        private readonly string _connStr;
        private readonly Guid _familyId;

        public ListItemsController(IOptions<SiteSettings> settings)
        {
            _settings = settings.Value;
            _connStr = _settings.ConFamConnectionString;
            _familyId = _settings.FamilyId;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_connStr);
        }

        //// GET: api/listitems
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/listitems/5
        [HttpGet("{id}")]
        public Model.ListItem Get(int id)
        {
            Model.ListItem item = null;

            using (var conn = GetConnection())
            {
                conn.Open();

                using (var cmd = new SqlCommand("SELECT ListItemId, ItemName, OrderId, Checked, RecipeId FROM cf.ListItem WHERE ListItemId = @ListItemId", conn))
                {
                    cmd.Parameters.AddWithValue("@ListItemId", id);

                    using (var rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            item = new Model.ListItem
                            {
                                ListItemId = (int)rdr["ListItemId"],
                                ItemName = (string)rdr["ItemName"],
                                OrderId = (int)rdr["OrderId"],
                                Checked = (bool)rdr["Checked"],
                                RecipeId = (int)rdr["RecipeId"]
                            };
                        }
                    }
                }

                conn.Close();
            }

            return item;
        }

        // POST api/listitems
        [HttpPost]
        public void Post([FromBody]Model.ListItem value)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                using (var cmd = new SqlCommand("INSERT INTO cf.ListItem (ListItemId, ListId, ItemName, OrderId, Checked, RecipeId) VALUES (ListItemId, ListId, ItemName, OrderId, Checked, RecipeId)", conn))
                {
                    cmd.Parameters.AddWithValue("@ListItemId", value.ListItemId);
                    cmd.Parameters.AddWithValue("@ListId", value.ListId);
                    cmd.Parameters.AddWithValue("@ItemName", value.ItemName);
                    cmd.Parameters.AddWithValue("@OrderId", value.OrderId);
                    cmd.Parameters.AddWithValue("@Checked", value.Checked);
                    cmd.Parameters.AddWithValue("@RecipeId", value.RecipeId);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }

        // PUT api/listitems/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Model.ListItem value)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                using (var cmd = new SqlCommand("UPDATE cf.ListItem SET ItemName=@ItemName, OrderId=@OrderId, Checked=@Checked, RecipeId=@RecipeId WHERE ListItemId = @ListItemId", conn))
                {
                    cmd.Parameters.AddWithValue("@ListItemId", value.ListItemId);
                    cmd.Parameters.AddWithValue("@ItemName", value.ItemName);
                    cmd.Parameters.AddWithValue("@OrderId", value.OrderId);
                    cmd.Parameters.AddWithValue("@Checked", value.Checked);
                    cmd.Parameters.AddWithValue("@RecipeId", value.RecipeId);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }

        // DELETE api/listitems/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                using (var cmd = new SqlCommand("DELETE FROM cf.ListItem WHERE ListItemId = @ListItemId", conn))
                {
                    cmd.Parameters.AddWithValue("@ListItemId", id);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }
    }
}
