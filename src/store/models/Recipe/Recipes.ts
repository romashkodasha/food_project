export type RecipeItemApi = {
    id: number
    image: string
    title: string
    readyInMinutes: number
    nutrition: {
        ingredients: { name: string }[]
        nutrients: { amount: number }[]
    }
}

export type RecipeItemModel = {
    id: number
    image: string
    title: string
    readyInMinutes: number
    ingredients: string
    kcal: number
}

export type RecipeApi = {
    title: string
    image: string
    preparationMinutes: number
    cookingMinutes: number
    readyInMinutes: number
    aggregateLikes: number
    servings: number
    summary: string
    extendedIngredients: { original: string }[]
    analyzedInstructions: {
        steps: { number: number; step: string; equipment: { name: string }[] }[]
    }[]
}

export type RecipeModel = {
    title: string
    image: string
    preparation: number
    cooking: number
    total: number
    ratings: number
    servings: number
    summary: string
    ingredients: string[]
    equipment: string[]
    directions: { numStep: number; step: string }[]
}

export const normalizeRecipesList = (
    from: RecipeItemApi
): RecipeItemModel => ({
    id: from.id,
    image: from.image,
    title: from.title,
    readyInMinutes: from.readyInMinutes,
    ingredients: from.nutrition.ingredients
        .map((ing: { name: string }) => ing.name)
        .join(' + '),
    kcal: from.nutrition.nutrients[0].amount,
})

export const normalizeRecipeItem = (from: RecipeApi): RecipeModel => ({
    title: from.title,
    image: from.image,
    preparation: from.preparationMinutes > 0 ? from.preparationMinutes : 5,
    cooking:
        from.preparationMinutes > 0
            ? from.cookingMinutes
            : from.readyInMinutes - 5,
    total: from.readyInMinutes,
    ratings: from.aggregateLikes,
    servings: from.servings,
    summary: from.summary,
    ingredients: from.extendedIngredients.map(
        (ing: { original: string }) => ing.original
    ),
    equipment: from.analyzedInstructions[0].steps
        .flatMap((step: { equipment: { name: string }[] }) =>
            step.equipment.map((eq: { name: string }) => eq.name)
        )
        .filter(
            (value: string, index: number, self: string[]) =>
                self.indexOf(value) === index
        ),
    directions: from.analyzedInstructions[0].steps.map(
        (st: { number: number; step: string }) => ({
            numStep: st.number,
            step: st.step,
        })
    ),
})
