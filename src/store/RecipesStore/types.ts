export type GetRecipesListParams = {
    apiKey: string;
    addRecipeNutrition: boolean;
    number?: number;
    query?: string;
    type?: string;
}

export type GetRecipeItemParams ={
    apiKey: string;
    id: number;
}