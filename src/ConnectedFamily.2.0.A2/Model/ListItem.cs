using System;

namespace ConnectedFamily.Model
{
    public class ListItem
    {
        public int ListItemId { get; set; }
        public int ListId { get; set; }
        public string ItemName { get; set; }
        public int OrderId { get; set; }
        public bool Checked { get; set; }
        public Nullable<int> RecipeId { get; set; }
    }
}
