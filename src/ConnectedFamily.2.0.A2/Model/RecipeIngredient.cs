using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectedFamily.Model
{
    public class RecipeIngredient
    {
        public int IngredientId { get; set; }
        public string Name { get; set; }
        public int OrderId { get; set; }
    }
}
