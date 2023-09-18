import {
    computed,
    makeObservable,
    observable,
    action,
    runInAction,
    // IReactionDisposer,
    // reaction,
} from 'mobx'
import ApiStore from 'store/ApiStore/ApiStore'
import {
    RecipeItemApi,
    RecipeItemModel,
    RecipesListApi,
    RecipesListModel,
    normalizeRecipeItem,
    normalizeRecipesList,
} from 'store/models/Recipe'
import { Meta } from 'utils/meta'
import { GetRecipeItemParams, GetRecipesListParams } from './types'
import { ApiResponse } from 'store/ApiStore/types'
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection,
} from 'store/models/shared/collection'
// import rootStore from 'store/RootStore'

import * as qs from 'qs'
// import { apiKey } from '../../../apiKey'

const BASE_URL = 'https://api.spoonacular.com/'

type PrivateFields = '_list' | '_meta' | '_recipe'

export default class RecipesStore {
    private readonly _apiStore = new ApiStore(BASE_URL)
    private _list: CollectionModel<number, RecipesListModel> =
        getInitialCollectionModel()
    private _meta: Meta = Meta.initial
    private _recipe: RecipeItemModel | null = null

    constructor() {
        makeObservable<RecipesStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _recipe: observable,
            list: computed,
            meta: computed,
            recipe: computed,
            getRecipesList: action,
        })
    }

    get list(): RecipesListModel[] {
        return linearizeCollection(this._list)
    }

    get meta(): Meta {
        return this._meta
    }

    get recipe(): RecipeItemModel | null {
        return this._recipe
    }

    async getRecipesList(params: GetRecipesListParams): Promise<void> {
        this._meta = Meta.loading
        this._list = getInitialCollectionModel()
        const queryString = qs.stringify(params)
        const response: ApiResponse<
            { totalResults: number; results: RecipesListApi[] },
            string
        > = await this._apiStore.request({
            method: 'get',
            endpoint: `/recipes/complexSearch?${queryString}`,
        })
        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error
            }
            if (response.success) {
                try {
                    const list: RecipesListModel[] = []
                    for (const item of response.data.results) {
                        list.push(normalizeRecipesList(item))
                    }
                    this._meta = Meta.success
                    this._list = normalizeCollection(
                        list,
                        (listItem) => listItem.id
                    )

                    return
                } catch {
                    this._meta = Meta.error
                    this._list = getInitialCollectionModel()
                }
            }
        })

        this._meta = Meta.error
    }

    async getRecipeItem(param: GetRecipeItemParams): Promise<void> {
        this._meta = Meta.loading
        this._recipe = null

        const response: ApiResponse<RecipeItemApi, string> =
            await this._apiStore.request({
                method: 'get',
                endpoint: `/recipes/${param.id}/information?apiKey=${param.apiKey}`,
            })
        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error
            }
            if (response.success) {
                try {
                    this._meta = Meta.success
                    this._recipe = normalizeRecipeItem(response.data)
                    return
                } catch {
                    this._meta = Meta.error
                    this._recipe = null
                }
            }
        })

        this._meta = Meta.error
    }

    destroy(): void {
        // this._qrReaction()
    }

    // private readonly _qrReaction: IReactionDisposer = reaction(
    //     () => rootStore.query.getParam('type'),
    //     async (type) => {
    //         if (type) {
    //             const addRecipeNutrition = true
    //             const query = rootStore.query.getParam('query')
    //             try {
    //                 if (typeof type === 'string') {
    //                     if (typeof query === 'string') {
    //                         await this.getRecipesList({
    //                             apiKey,
    //                             addRecipeNutrition,
    //                             type,
    //                             query,
    //                         })
    //                     } else
    //                         await this.getRecipesList({
    //                             apiKey,
    //                             addRecipeNutrition,
    //                             type,
    //                         })
    //                 }
    //             } catch (error) {
    //                 console.log(error)
    //             }
    //         }
    //     }
    //)
}
