using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConnectedFamily.Model
{
    public class RecipeStep
    {
        public int RecipeStepId { get; set; }
        public int StepNumber { get; set; }
        public string StepDescr { get; set; }
    }
}
