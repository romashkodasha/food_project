import Card from 'components/Card';
import Text from 'components/Text'
import styles from './../PlanPage.module.scss'
import React from "react";
import { PlanningModel } from "store/models/Planning";
import preparationLogo from 'assets/time-preparation-logo.svg'
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

type MealListProps = {
    list: PlanningModel[];
}

const MealList: React.FC<MealListProps> = ({list}: MealListProps) => {
    const navigate= useNavigate();
    return(
        <div className={styles.items}>
            {list.map((meal: PlanningModel) => (
                <Card
                key={meal.id}
                title={meal.title}
                image={meal.image ? meal.image : 'assets/tak-stop.jpg'}
                subtitle= {`Number of servings: ${meal.servings}`}
                className="recipe_card"
                captionSlot={
                    <div className={styles.caption_slot}>
                        <img src={preparationLogo} />{' '}
                        <Text weight="medium">{meal.readyInMinutes} minutes</Text>
                    </div>
                }
                actionSlot={
                    <div className={styles.action_slot}>
                        <Text
                            weight="bold"
                            color="accent"
                            view="p-18"
                        >
                            Health score: {meal.healthScore}
                        </Text>
                        <Button onClick={() => {navigate(`/recipes/${meal.id}`)}}>Go to recipe</Button>
                    </div>
                }
            />
            ))}
        </div>
    )
}

export default React.memo(MealList);