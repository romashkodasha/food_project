import Card from 'components/Card'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RecipeItemModel } from 'store/models/Recipe'
import styles from './RecipeCard.module.scss'
import preparationLogo from 'assets/time-preparation-logo.svg'
import Text from 'components/Text'
import Button from 'components/Button'

export type RecipeCardProps = {
    recipe: RecipeItemModel;
    onUnsave?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onUnsave}) => {
    const navigate = useNavigate()
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        const recipeInFavorites = favorites.some(
            (favRecipe: RecipeItemModel) => favRecipe.id === recipe.id
        )
        setIsFavorite(recipeInFavorites)
    }, [recipe.id])
    const handleSaveClick = (
        recipe: RecipeItemModel,
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation()
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        favorites.push(recipe)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        setIsFavorite(true)
    }
    const handleUnsaveClick = (
        recipeId: number,
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation()
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        const updatedFavorites = favorites.filter(
            (recipe: RecipeItemModel) => recipe.id !== recipeId
        )
        setIsFavorite(false)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
        if (onUnsave) {
            onUnsave();
        } //для обновления состояния favorites
    }

    return (
        <Card
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            subtitle={recipe.ingredients}
            className="recipe_card"
            captionSlot={
                <div className={styles.caption_slot}>
                    <img src={preparationLogo} />{' '}
                    <Text weight="medium">{recipe.readyInMinutes} minutes</Text>
                </div>
            }
            actionSlot={
                <div className={styles.action_slot}>
                    <Text weight="bold" color="accent" view="p-18">
                        {recipe.kcal} kcal
                    </Text>
                    {isFavorite ? (
                        <Button
                            onClick={(event) =>
                                handleUnsaveClick(recipe.id, event)
                            }
                        >
                            Unsave
                        </Button>
                    ) : (
                        <Button
                            onClick={(event) => handleSaveClick(recipe, event)}
                        >
                            Save
                        </Button>
                    )}
                </div>
            }
            onClick={() => navigate(`/recipes/${recipe.id}`)}
        />
    )
}

export default RecipeCard
