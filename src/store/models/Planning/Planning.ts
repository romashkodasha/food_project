export type PlanningApi = {
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
}

export type PlanningModel ={
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number; //поменять
    sourceUrl: string;
    image?: string;
    aggregateLikes?: number;
    healthScore?: number
}

export const normalizePlanningList = (
    from: PlanningApi
): PlanningModel => ({
    id: from.id,
    title: from.title,
    readyInMinutes: from.readyInMinutes,
    servings: from.servings,
    sourceUrl: from.sourceUrl
})