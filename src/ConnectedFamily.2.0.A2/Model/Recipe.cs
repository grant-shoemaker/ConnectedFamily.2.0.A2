using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectedFamily.Model
{
    public class RecipeVM
    {
        public int RecipeId { get; set; }
        public string Title { get; set; }

        public static RecipeVM FromRecipe(Recipe r)
        {
            return new RecipeVM
            {
                RecipeId = r.RecipeId,
                Title = r.Title
            };
        }
    }

    public class Recipe
    {
        public int RecipeId { get; set; }
        public string Title { get; set; }
        public string RecipeDescr { get; set; }
        public int NbrServings { get; set; }
        public string Notes { get; set; }

        public List<RecipeIngredient> Ingredients { get; set; }
        public List<RecipeStep> Steps { get; set; }
    }
}
