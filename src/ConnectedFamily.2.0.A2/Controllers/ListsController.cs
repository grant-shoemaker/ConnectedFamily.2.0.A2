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
    public class ListsController : Controller
    {
        private readonly SiteSettings _settings;
        private readonly string _connStr;
        private readonly Guid _familyId;

        public ListsController(IOptions<SiteSettings> settings)
        {
            _settings = settings.Value;
            _connStr = _settings.ConFamConnectionString;
            _familyId = _settings.FamilyId;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_connStr);
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Model.List> Get()
        {
            var lists = new List<Model.List>();
            var sql = @"
                SELECT l.ListId, l.ListName, l.OrderId, SUM(1) AS ItemCount
                FROM cf.List l 
                LEFT JOIN cf.ListItem li ON l.ListId = li.ListId
                WHERE FamilyId = @FamilyId
                GROUP BY l.ListId, l.ListName, l.OrderId
                ORDER BY l.OrderId";

            using (var conn = GetConnection())
            {
                conn.Open();

                using (var cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@FamilyId", _familyId);
                    using (var rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            lists.Add(new Model.List
                            {
                                ListId = (int)rdr["ListId"],
                                ListName = (string)rdr["ListName"],
                                OrderId = (int)rdr["OrderId"],
                                ItemCount = (int)rdr["ItemCount"]
                            });
                        }
                    }
                }

                conn.Close();
            }

            return lists;
        }

        // GET api/values/5
        [HttpGet("{listId}")]
        public Model.List Get(int listId)
        {
            Model.List list = null;
            var sql = @"
                SELECT ListId, ListName, OrderId 
                FROM cf.List 
                WHERE ListId = @ListId 
                    AND FamilyId = @FamilyId 
                ORDER BY OrderId";

            using (var conn = GetConnection())
            {
                conn.Open();

                using (var cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@ListId", listId);
                    cmd.Parameters.AddWithValue("@FamilyId", _familyId);
                    using (var rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            list = new Model.List
                            {
                                ListId = (int)rdr["ListId"],
                                ListName = (string)rdr["ListName"],
                                OrderId = (int)rdr["OrderId"],
                                Items = new List<Model.ListItem>()
                            };
                        }
                    }
                }

                using (var cmd = new SqlCommand("SELECT ListItemId, ListId, ItemName, OrderId, Checked, RecipeId FROM cf.ListItem WHERE ListId = @ListId ORDER BY OrderId", conn))
                {
                    cmd.Parameters.AddWithValue("@ListId", listId);

                    using (var rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            list.Items.Add(new Model.ListItem
                            {
                                ListItemId = (int)rdr["ListItemId"],
                                ListId = (int)rdr["ListId"],
                                ItemName = (string)rdr["ItemName"],
                                OrderId = (int)rdr["OrderId"],
                                Checked = (bool)rdr["Checked"],
                                RecipeId = (int)rdr["RecipeId"],
                            });
                        }
                    }
                }

                conn.Close();
            }

            return list;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string listName)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                int orderId = 99;
                using (var cmd = new SqlCommand("SELECT MAX(OrderId) + 1 FROM cf.List WHERE FamilyId = @FamilyId", conn))
                {
                    orderId = (int)cmd.ExecuteScalar();
                }

                using (var cmd = new SqlCommand("INSERT INTO cf.List (FamilyId, ListName, OrderId) VALUES (@FamilyId, @ListName, @OrderId)", conn))
                {
                    cmd.Parameters.AddWithValue("@FamilyId", _familyId);
                    cmd.Parameters.AddWithValue("@ListName", listName);
                    cmd.Parameters.AddWithValue("@OrderId", orderId);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }

        // PUT api/values/5
        [HttpPut("{listId}")]
        public void Put(int listId, [FromBody]Model.List value)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                using (var cmd = new SqlCommand("UPDATE cf.List SET ListName = @ListName, OrderId = @OrderId WHERE ListId = @ListId", conn))
                {
                    cmd.Parameters.AddWithValue("@ListId", listId);
                    cmd.Parameters.AddWithValue("@ListName", value.ListName);
                    cmd.Parameters.AddWithValue("@OrderId", value.OrderId);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }

        // DELETE api/values/5
        [HttpDelete("{listId}")]
        public void Delete(int listId)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                using (var cmd = new SqlCommand("DELETE FROM cf.List WHERE ListId = @ListId", conn))
                {
                    cmd.Parameters.AddWithValue("@ListId", listId);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }
    }
}
