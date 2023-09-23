import {
    computed,
    makeObservable,
    observable,
    action,
    runInAction,
} from 'mobx'

import {
    RecipeApi,
    RecipeModel,
    normalizeRecipeItem,
} from 'store/models/Recipe'
import { Meta } from 'utils/meta'
import { GetRecipeItemParams } from './types'
import { ApiResponse } from 'store/ApiStore/types'



import rootStore from 'store/RootStore'


type PrivateFields = '_meta' | '_recipe'

export default class RecipeItemStore {
    private _meta: Meta = Meta.initial
    private _recipe: RecipeModel | null = null

    constructor() {
        makeObservable<RecipeItemStore, PrivateFields>(this, {
            _meta: observable,
            _recipe: observable,
            meta: computed,
            recipe: computed,
            getRecipeItem: action,
        })
    }

    get meta(): Meta {
        return this._meta
    }

    get recipe(): RecipeModel | null {
        return this._recipe
    }

    
    async getRecipeItem(param: GetRecipeItemParams): Promise<void> {
        this._meta = Meta.loading
        this._recipe = null

        const response: ApiResponse<RecipeApi, string> =
            await rootStore.apiStore.request({
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
        this._recipe = null
        this._meta = Meta.initial;
    }
}
