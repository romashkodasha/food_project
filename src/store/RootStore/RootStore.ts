
import ApiStore from "store/ApiStore/ApiStore";
import QueryParamsStore from "./QueryParamsStore"

const BASE_URL = 'https://api.spoonacular.com/'

export default class RootStore {
    readonly query = new QueryParamsStore();
    readonly apiStore: ApiStore;

    constructor() {
        this.apiStore = new ApiStore(BASE_URL);
    }
}
