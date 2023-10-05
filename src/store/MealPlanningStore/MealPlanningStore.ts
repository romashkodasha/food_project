import { computed, makeObservable, observable, action, runInAction } from 'mobx'

import {
    PlanningApi,
    PlanningModel,
    normalizePlanningList,
} from 'store/models/Planning'
import { Meta } from 'utils/meta'
import { GetPlanningListParams } from './types'
import { ApiResponse } from 'store/ApiStore/types'
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection,
} from 'store/models/shared/collection'

import { RecipeApi } from 'store/models/Recipe'

import * as qs from 'qs'

import rootStore from 'store/RootStore'

type PrivateFields = '_list' | '_meta' | '_nutrients'

export default class MealPlanningStore {
    private _list: CollectionModel<number, PlanningModel> =
        getInitialCollectionModel()
    private _meta: Meta = Meta.initial
    private _nutrients: {
        calories: number
        protein: number
        fat: number
        carbohydrates: number
    } | null = null

    constructor() {
        makeObservable<MealPlanningStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _nutrients: observable,
            list: computed,
            meta: computed,
            nutrients: computed,
            getPlanningList: action,
        })
    }

    get list(): PlanningModel[] {
        return linearizeCollection(this._list)
    }

    get nutrients(): {
        calories: number
        protein: number
        fat: number
        carbohydrates: number
    } | null {
        return this._nutrients
    }

    get meta(): Meta {
        return this._meta
    }

    

    async getPlanningList(params: GetPlanningListParams): Promise<void> {
        this._meta = Meta.loading
        this._list = getInitialCollectionModel()
        this._nutrients = null
        const queryString = qs.stringify(params)
        const response: ApiResponse<
            {
                meals: PlanningApi[]
                nutrients: {
                    calories: number
                    protein: number
                    fat: number
                    carbohydrates: number
                }
            },
            string
        > = await rootStore.apiStore.request({
            method: 'get',
            endpoint: `/mealplanner/generate?${queryString}`,
        })

        runInAction(async () => {
            if (!response.success) {
                this._meta = Meta.error
            }
            if (response.success) {
                try {
                    const list: PlanningModel[] = []
                    for (const item of response.data.meals) {
                        const normalizedItem = normalizePlanningList(item)
                        const responseImage: ApiResponse<RecipeApi, string> =
                            await rootStore.apiStore.request({
                                method: 'get',
                                endpoint: `/recipes/${item.id}/information?apiKey=${params.apiKey}`,
                            })
                        if (responseImage.success) {
                            normalizedItem.image = responseImage.data.image
                            normalizedItem.healthScore=responseImage.data.healthScore;
                        }
                        list.push(normalizedItem)
                    }
                    this._meta = Meta.success
                    this._list = normalizeCollection(
                        list,
                        (listItem) => listItem.id
                    )
                    this._nutrients = response.data.nutrients

                    return
                } catch {
                    this._meta = Meta.error
                    this._list = getInitialCollectionModel()
                    this._nutrients = null
                }
            }
        })

        this._meta = Meta.error
    }

    destroy(): void {
        this._list = getInitialCollectionModel()
        this._meta = Meta.initial
        this._nutrients = null
    }
}
