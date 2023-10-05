import {
    computed,
    makeObservable,
    observable,
    action,
    runInAction,
} from 'mobx'

import {
    RecipeItemApi,
    RecipeItemModel,
    normalizeRecipesList,
} from 'store/models/Recipe'
import { Meta } from 'utils/meta'
import {GetRecipesListParams } from './types'
import { ApiResponse } from 'store/ApiStore/types'
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection,
} from 'store/models/shared/collection'


import * as qs from 'qs'

import rootStore from 'store/RootStore'


type PrivateFields = '_list' | '_meta' | '_totalResults'

export default class RecipesStore {
    private _list: CollectionModel<number, RecipeItemModel> =
        getInitialCollectionModel()
    private _meta: Meta = Meta.initial
    private _totalResults: number = 0

    constructor() {
        makeObservable<RecipesStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _totalResults:observable,
            list: computed,
            meta: computed,
            totalResults: computed,
            getRecipesList: action,
        })
    }

    get list(): RecipeItemModel[] {
        return linearizeCollection(this._list)
    }

    get meta(): Meta {
        return this._meta
    }

    get totalResults(): number {
        return this._totalResults
    }
    
    async getRecipesList(params: GetRecipesListParams): Promise<void> {
        this._meta = Meta.loading
        this._list = getInitialCollectionModel()
        this._totalResults=0;
        const queryString = qs.stringify(params)
        const response: ApiResponse<
            { totalResults: number; results: RecipeItemApi[] },
            string
        > = await rootStore.apiStore.request({
            method: 'get',
            endpoint: `/recipes/complexSearch?${queryString}`,
        })
        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error
            }
            if (response.success) {
                try {
                    const list: RecipeItemModel[] = []
                    for (const item of response.data.results) {
                        list.push(normalizeRecipesList(item))
                    }
                    this._meta = Meta.success
                    this._list = normalizeCollection(
                        list,
                        (listItem) => listItem.id
                    )
                    this._totalResults=response.data.totalResults

                    return
                } catch {
                    this._meta = Meta.error
                    this._list = getInitialCollectionModel()
                }
            }
        })

        this._meta = Meta.error
    }

    destroy(): void {
        this._list = getInitialCollectionModel();
        this._meta = Meta.initial;
        this._totalResults=0;
    }
}
