import Button from 'components/Button'
import Input from 'components/Input'
import rootStore from 'store/RootStore'
import styles from './../RecipesPage.module.scss'
import { useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiKey } from '../../../../../apiKey'
import { RecipesContext } from './../RecipesPage'
import React from 'react'
import searchButton from 'assets/search-button.svg'

export type SearchProps = {
    searchParams: URLSearchParams
}


const Search: React.FC<SearchProps>  = ({searchParams}) => {
    const recipesStore = useContext(RecipesContext)
    const queryStore = rootStore.query
    const navigate = useNavigate()
    const location = useLocation()
    const currentQuery = queryStore.getParam('query')
    const currentQueryString =
        currentQuery !== undefined ? currentQuery.toString() : ''

    const handleInputChange = useCallback(
        (value: string) => {
            if (location.search){
                searchParams.set('query', value)
                navigate(location.pathname + `?${searchParams.toString()}`)
            }
            else{
            navigate(`/recipes?query=${value}`)}
        },
        [location.pathname, navigate, queryStore]
    )

    const handleSearch = useCallback(() => {
        recipesStore.getRecipesList({
            apiKey: apiKey,
            addRecipeNutrition: true,
            query: currentQueryString,
        })
    }, [currentQueryString, recipesStore])

    return (
        <div className={styles.search_field}>
            <Input
                value={currentQueryString}
                onChange={handleInputChange}
                placeholder="Enter dishes"
            />
            <Button onClick={handleSearch}>
                <img src={searchButton} />
            </Button>
        </div>
    )
}

export default observer(Search)
