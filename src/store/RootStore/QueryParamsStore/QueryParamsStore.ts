import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
    private _params: qs.ParsedQs = {};
    private _query: string = '';

    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable.ref,
            setQuery: action,
        })
    }

    getParam(
        key: string
    ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
        return this._params[key];
    }

    setQuery(query: string) {
        query = query.startsWith('?') ? query.slice(1) : query;

        if (this._query !== query) {
            this._query=query;
            this._params=qs.parse(query);
        }
    }
}