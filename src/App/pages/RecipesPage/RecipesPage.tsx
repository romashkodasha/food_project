import './RecipesPage.module.scss'
import Text from '../../../components/Text'
import { useEffect, useCallback, createContext } from 'react'
import MultiDropdown, { Option } from 'components/MultiDropdown'
import { Pagination } from 'components/Pagination'
import Loader from 'components/Loader'
import { apiKey } from './../../../../apiKey'
import styles from './RecipesPage.module.scss'
import { observer, useLocalStore } from 'mobx-react-lite'
import { Meta } from 'utils/meta'
import RecipesList from './components/RecipesList'
import Search from './components/Search'
import RecipesStore from 'store/RecipesStore'
import { mealTypes } from 'config/mealTypesConfig'
import rootStore from 'store/RootStore'
import { useLocation, useNavigate } from 'react-router-dom'

export const RecipesContext = createContext(new RecipesStore())
const Provider = RecipesContext.Provider

const RecipesPage = () => {
    const recipesStore = useLocalStore(() => new RecipesStore())
    const queryStore = rootStore.query
    const location = useLocation()
    const navigate = useNavigate()
    const currentQuery = queryStore.getParam('query')
    const currentQueryString =
        currentQuery !== undefined ? currentQuery.toString() : ''
    const currentType = queryStore.getParam('type')
    console.log(queryStore.getParam('type'))
    const searchParams = new URLSearchParams(location.search)
    const currentTypeString =
        currentType !== undefined ? currentType.toString() : ''
    const page =
        queryStore.getParam(`page`) !== undefined
            ? Number(queryStore.getParam(`page`))
            : 1

    const handlePages = useCallback(
        (updatePage: number) => {

            if (location.search) {
                searchParams.set('page', updatePage.toString())
                
                navigate(location.pathname + `?${searchParams.toString()}`)
            } else {
                navigate(`/recipes?page=${updatePage}`)
            }
        },
        [location.pathname, location.search, navigate]
    )
    const handleChange = useCallback(
        (newSelectedOptions: Option[]) => {
            
            const options = newSelectedOptions
                .map((op) => {
                    if (op.value !== '') return op.value
                })
                .join(',')
            if (location.search) {
                console.log(searchParams.toString())
                searchParams.set('type', options)
                navigate(location.pathname + `?${searchParams.toString()}`)
            }
            else{
            navigate(`/recipes?type=${options}`)}
        },
        [location.pathname, location.search, navigate]
    )

    const getTitle = (value: Option[]) => {
        if (value.length === 0) {
            return 'Categories'
        } else {
            return value.map((option) => option.value).join(', ')
        }
    }

    useEffect(() => {
        recipesStore.getRecipesList({
            apiKey: apiKey,
            addRecipeNutrition: true,
            query: currentQueryString,
            type: currentTypeString,
        })
    }, [recipesStore,currentTypeString])
    return (
        <Provider value={recipesStore}>
            <div className="recipes-page">
                {recipesStore.meta === Meta.loading ? (
                    <Loader size="l" />
                ) : (
                    <>
                        <img
                            className={styles.image_recipes}
                            src="..\src\assets\frame.svg"
                        />
                        <div className={styles.recipes}>
                            <Text view="p-20" color="primary">
                                Find the perfect food and{' '}
                                <span style={{ textDecoration: 'underline' }}>
                                    drink ideas
                                </span>{' '}
                                for every occasion , from{' '}
                                <span style={{ textDecoration: 'underline' }}>
                                    {' '}
                                    weeknight dinners
                                </span>{' '}
                                to{' '}
                                <span style={{ textDecoration: 'underline' }}>
                                    {' '}
                                    holiday feasts
                                </span>
                            </Text>
                            <div className={styles.search_filter_container}>
                                <Search searchParams={searchParams}/>
                                <MultiDropdown
                                    value={
                                        currentTypeString
                                            ? currentTypeString
                                                  .split(',')
                                                  .map((val) => ({
                                                      key: val,
                                                      value: val,
                                                  }))
                                            : []
                                    }
                                    options={mealTypes}
                                    onChange={handleChange}
                                    getTitle={getTitle}
                                    className="food_categories"
                                />
                            </div>
                            <RecipesList
                                list={recipesStore.list.slice(
                                    (page - 1) * 9,
                                    page * 9
                                )}
                            />
                            <Pagination
                                page={page}
                                totalPages={Math.ceil(
                                    recipesStore.list.length / 9
                                )}
                                handlePagination={handlePages}
                            />
                        </div>
                    </>
                )}
            </div>
        </Provider>
    )
}

export default observer(RecipesPage)
