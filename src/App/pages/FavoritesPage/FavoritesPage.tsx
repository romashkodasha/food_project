import React, { useState } from 'react'
import { RecipeItemModel } from 'store/models/Recipe'
import Text from 'components/Text'
import styles from './FavoritesPage.module.scss'
import RecipeCard from 'components/RecipeCard'


const FavoritesPage: React.FC = () => {
    const [favorites, setFavorites] = useState<RecipeItemModel[]>(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return storedFavorites;
    });

    const removeFromFavorites = (recipeId: number) => {
        const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    return (
        <div className={styles.favorites_page}>
            <Text color='primary' view='title'>Favorites Recipes</Text>
            <div className={styles.items}>
                {favorites.map((recipe: RecipeItemModel) => (
                    <RecipeCard recipe = {recipe} onUnsave={() => removeFromFavorites(recipe.id)}/>
                ))}
            </div>
        </div>
    )
}

export default FavoritesPage
