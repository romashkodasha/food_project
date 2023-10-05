import { apiKey } from './../../../../apiKey'
import Button from 'components/Button'
import Input from 'components/Input'
import Text from 'components/Text'
import { observer, useLocalStore } from 'mobx-react-lite'
import React, { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MealPlanningStore from 'store/MealPlanningStore'
import rootStore from 'store/RootStore'
import searchButton from 'assets/search-button.svg'
import styles from './PlanPage.module.scss'
import { Meta } from 'utils/meta'
import MealList from './components/MealList'
import Loader from 'components/Loader'



const PlanPage = () => {
    const queryStore = rootStore.query
    const currentQuery = queryStore.getParam('query')
    const currentQueryNumber =
        currentQuery !== undefined ? Number(currentQuery) : ''
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    const planningStore = useLocalStore(() => new MealPlanningStore())

    const handleInputChange = useCallback(
        (value: string) => {
            if (location.search) {
                searchParams.set('query', value)
                navigate(location.pathname + `?${searchParams.toString()}`)
            } else {
                navigate(`/planning?query=${value}`)
            }
        },
        [location.pathname, navigate, queryStore]
    )
    const handleSearch = useCallback(() => {
        planningStore.getPlanningList({
            apiKey: apiKey,
            timeFrame: 'day',
            targetCalories: Number(currentQueryNumber),
        })
    }, [currentQueryNumber, planningStore])
    useEffect(() => {
        planningStore.getPlanningList({
            apiKey: apiKey,
            timeFrame: 'day',
            targetCalories: Number(currentQueryNumber),
        })
    }, [planningStore])

    return (
        <main className={styles.planning_page}>
            <Text view="title">Get your meal plan!</Text>
            <div className={styles.search_field}>
                <Input
                    value={currentQueryNumber.toString()}
                    onChange={handleInputChange}
                    placeholder="Enter calories"
                />
                <Button onClick={handleSearch}>
                    <img src={searchButton} />
                </Button>
            </div>
            {planningStore.meta !== Meta.loading && !planningStore.nutrients ? <></> :
            planningStore.meta === Meta.loading || !planningStore.nutrients ? (
                <Loader />
            ) : (
                <div>
                    <Text color='accent' weight='bold' view='title'>Nutrients</Text>
                    <div className={styles.nutrients}>
                        <Text view='p-18' weight='medium' className={styles.nutrient}> Calories: {planningStore.nutrients.calories}</Text>
                        <Text view='p-18' weight='medium' className={styles.nutrient}> Protein: {planningStore.nutrients.protein}</Text>
                        <Text view='p-18' weight='medium' className={styles.nutrient}> Fat: {planningStore.nutrients.fat}</Text>
                        <Text view='p-18' weight='medium' className={styles.nutrient}> Carbohydrates: {planningStore.nutrients.carbohydrates}</Text>
                    </div>
                    <MealList list={planningStore.list} />
                </div>
            )}
            
        </main>
    )
}

export default observer(PlanPage)
