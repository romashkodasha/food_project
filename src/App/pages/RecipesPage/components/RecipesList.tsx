import { RecipesListModel } from "store/models/Recipe"
import styles from './../RecipesPage.module.scss'
import React from "react";
import Card from "components/Card";
import Text from "components/Text";
import Button from "components/Button"
import { useNavigate } from "react-router-dom";

type RecipesListProps = {
    list: RecipesListModel[];
}

const RecipesList: React.FC<RecipesListProps> = ({list}: RecipesListProps) => {
    const navigate = useNavigate()
    return(
        <div className={styles.items}>
            {list.map((recipe: RecipesListModel) => (
                <Card
                key={recipe.id}
                title={recipe.title}
                image={recipe.image}
                subtitle={recipe.ingredients}
                className="recipe_card"
                captionSlot={
                    <div
                        className={styles.caption_slot}
                    >
                        <img src="..\src\assets\time-preparation-logo.svg" />{' '}
                        <Text weight="medium">
                            {recipe.readyInMinutes}{' '}
                            minutes
                        </Text>
                    </div>
                }
                actionSlot={
                    <div className={styles.action_slot}>
                        <Text
                            weight="bold"
                            color="accent"
                            view="p-18"
                        >
                            {recipe.kcal} kcal
                        </Text>
                        <Button>Save</Button>
                    </div>
                }
                onClick={() =>
                    navigate(`/recipes/${recipe.id}`)
                }
            />
            ))}
        </div>
    )
}

export default React.memo(RecipesList);