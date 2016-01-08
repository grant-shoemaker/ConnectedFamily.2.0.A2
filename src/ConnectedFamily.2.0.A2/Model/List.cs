using System.Collections.Generic;

namespace ConnectedFamily.Model
{
    public class List
    {
        public int ListId { get; set; }
        public string ListName { get; set; }
        public int OrderId { get; set; }

        public int ItemCount { get; set; }
        public List<ListItem> Items { get; set; }
    }
}
