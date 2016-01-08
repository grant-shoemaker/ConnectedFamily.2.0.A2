/***************************************************************************
** LISTS
***************************************************************************/
export interface ListItem {
    listItemId: number;
    listId: number;
    itemName: string;
    orderId: number;
    checked: boolean;
    recipeId?: number;
}

export interface List {
    listId: number;
    listName: string;
    orderId: number;
    itemCount: number;
    items: ListItem[];
}
/***************************************************************************
** RECIPES
***************************************************************************/
export interface Recipe {
    recipeId: number;
    title: string;
    recipeDescr: string;
    nbrServings: number;
    notes: string;
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
}

export class RecipeVM implements Recipe {
    
    constructor(
        public recipeId: number,
        public title: string,
        public recipeDescr: string,
        public nbrServings: number,
        public notes: string,
        public ingredients: RecipeIngredient[],
        public steps: RecipeStep[],

        public filtered: boolean) { }

    static fromRecipeModel(recipe: Recipe) {
        return new RecipeVM(
            recipe.recipeId,
            recipe.title,
            recipe.recipeDescr,
            recipe.nbrServings,
            recipe.notes,
            recipe.ingredients,
            recipe.steps,
            false
        );
    }
}

export interface RecipeIngredient {
    ingredientId: number;
    name: string;
    orderId: number;
}

export interface RecipeStep {
    recipeStepId: number;
    stepNumber: number;
    stepDescr: string;
}