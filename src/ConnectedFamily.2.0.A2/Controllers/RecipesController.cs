using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.OptionsModel;
using System.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ConnectedFamily.Controllers
{
    [Route("api/[controller]")]
    public class RecipesController : Controller
    {
        private readonly SiteSettings _settings;
        private readonly string _connStr;
        private readonly Guid _familyId;

        public RecipesController(IOptions<SiteSettings> settings)
        {
            _settings = settings.Value;
            _connStr = _settings.ConFamConnectionString;
            _familyId = _settings.FamilyId;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_connStr);
        }

        // GET: api/recipes
        [HttpGet]
        public IEnumerable<Model.RecipeVM> Get()
        {
            var recipes = new List<Model.RecipeVM>();
            var sql = @"
                SELECT r.RecipeId, r.Title
                FROM cf.Recipe r
                WHERE FamilyId = @FamilyId
                ORDER BY r.Title";

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
                            recipes.Add(new Model.RecipeVM
                            {
                                RecipeId = (int)rdr["RecipeId"],
                                Title = (string)rdr["Title"]
                            });
                        }
                    }
                }

                conn.Close();
            }

            return recipes;
        }

        // GET api/recipes/5
        [HttpGet("{recipeId}")]
        public Model.Recipe Get(int recipeId)
        {
            Model.Recipe recipe = null;

            using (var conn = GetConnection())
            {
                conn.Open();

                var sql = @"
                SELECT r.RecipeId, r.Title, r.RecipeDescr, r.NbrServings, r.Notes
                FROM cf.Recipe r
                WHERE r.RecipeId = @RecipeId
                    AND FamilyId = @FamilyId";
                using (var cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@RecipeId", recipeId);
                    cmd.Parameters.AddWithValue("@FamilyId", _familyId);
                    using (var rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            recipe = new Model.Recipe
                            {
                                RecipeId = (int)rdr["RecipeId"],
                                Title = (string)rdr["Title"],
                                RecipeDescr = (string)rdr["RecipeDescr"],
                                NbrServings = (int)rdr["NbrServings"],
                                Notes = (string)rdr["Notes"]
                            };
                        }
                    }
                }

                // Add Ingredients
                sql = @"
                    SELECT r.IngredientId, r.Name, r.OrderId
                    FROM cf.RecipeIngredient r
                    WHERE r.RecipeId = @RecipeId
                    ORDER BY r.OrderId";
                using (var cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@RecipeId", recipeId);
                    using (var rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            if (recipe.Ingredients == null)
                                recipe.Ingredients = new List<Model.RecipeIngredient>();
                            recipe.Ingredients.Add(new Model.RecipeIngredient
                            {
                                IngredientId = (int)rdr["IngredientId"],
                                Name = (string)rdr["Name"],
                                OrderId = (int)rdr["OrderId"]
                            });
                        }
                    }
                }

                // Add Steps
                sql = @"
                    SELECT r.RecipeStepId, r.StepNumber, r.StepDescr
                    FROM cf.RecipeStep r
                    WHERE r.RecipeId = @RecipeId
                    ORDER BY r.StepNumber";
                using (var cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@RecipeId", recipeId);
                    using (var rdr = cmd.ExecuteReader())
                    {
                        while (rdr.Read())
                        {
                            if (recipe.Steps == null)
                                recipe.Steps = new List<Model.RecipeStep>();
                            recipe.Steps.Add(new Model.RecipeStep
                            {
                                RecipeStepId = (int)rdr["RecipeStepId"],
                                StepNumber = (int)rdr["StepNumber"],
                                StepDescr = (string)rdr["StepDescr"]
                            });
                        }
                    }
                }

                conn.Close();
            }

            return recipe;
        }

        // POST api/recipes
        [HttpPost]
        public int Post(Model.Recipe recipe)
        {
            var recipeId = -1;

            using (var conn = GetConnection())
            {
                conn.Open();

                var sql = @"
                    INSERT INTO cf.Recipe (Title, RecipeDescr, FamilyId, NbrServings, Notes)
                    OUTPUT Inserted.RecipeId
                    VALUES (@Title, @RecipeDescr, @FamilyId, @NbrServings, @Notes)";

                using (var cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@Title", recipe.Title);
                    cmd.Parameters.AddWithValue("@RecipeDescr", recipe.RecipeDescr);
                    cmd.Parameters.AddWithValue("@FamilyId", _familyId);
                    cmd.Parameters.AddWithValue("@NbrServings", recipe.NbrServings);
                    cmd.Parameters.AddWithValue("@Notes", recipe.Notes);

                    var o = cmd.ExecuteScalar();
                    if (o.GetType() == typeof(int))
                    {
                        recipeId = (int)o;
                    }
                }

                if (recipeId != -1)
                {

                    sql = @"
                        INSERT INTO cf.RecipeIngredient (RecipeId, Name, OrderId)
                        VALUES (@RecipeId, @Name, @OrderId)";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@RecipeId", recipeId);
                        cmd.Parameters.AddWithValue("@Name", string.Empty);
                        cmd.Parameters.AddWithValue("@OrderId", 0);

                        foreach (var ingr in recipe.Ingredients)
                        {
                            cmd.Parameters["@Name"].Value = ingr.Name;
                            cmd.Parameters["@OrderId"].Value = ingr.OrderId;

                            cmd.ExecuteNonQuery();
                        }
                    }

                    sql = @"
                        INSERT INTO cf.RecipeStep (RecipeId, StepNumber, StepDescr)
                        VALUES (@RecipeId, @StepNumber, @StepDescr)";
                    using (var cmd = new SqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@RecipeId", recipeId);
                        cmd.Parameters.AddWithValue("@StepNumber", 0);
                        cmd.Parameters.AddWithValue("@StepDescr", string.Empty);

                        foreach (var step in recipe.Steps)
                        {
                            cmd.Parameters["@StepNumber"].Value = step.StepNumber;
                            cmd.Parameters["@StepDescr"].Value = step.StepDescr;

                            cmd.ExecuteNonQuery();
                        }
                    }
                }

                conn.Close();
            }

            return recipeId;
        }

        // PUT api/recipes/5
        [HttpPut("{recipeId}")]
        public void Put(int recipeId, [FromBody]Model.Recipe recipe)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                var sql = @"
                    UPDATE cf.Recipe SET 
                        Title=@Title, 
                        RecipeDescr=@RecipeDescr, 
                        NbrServings=@NbrServings, 
                        Notes=@Notes
                    WHERE RecipeId = @RecipeId";
                using (var cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@RecipeId", recipeId);
                    cmd.Parameters.AddWithValue("@Title", recipe.Title);
                    cmd.Parameters.AddWithValue("@RecipeDescr", recipe.RecipeDescr);
                    cmd.Parameters.AddWithValue("@NbrServings", recipe.NbrServings);
                    cmd.Parameters.AddWithValue("@Notes", recipe.Notes);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }

        // DELETE api/recipes/5
        [HttpDelete("{recipeId}")]
        public void Delete(int recipeId)
        {
            using (var conn = GetConnection())
            {
                conn.Open();

                var sql = @"
                    DELETE FROM cf.RecipeStep WHERE RecipeId = @RecipeId
                    DELETE FROM cf.RecipeIngredient WHERE RecipeId = @RecipeId
                    DELETE FROM cf.Recipe WHERE RecipeId = @RecipeId";
                using (var cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@RecipeId", recipeId);

                    cmd.ExecuteNonQuery();
                }

                conn.Close();
            }
        }
    }
}
