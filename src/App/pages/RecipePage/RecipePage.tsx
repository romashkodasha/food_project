import styles from './RecipePage.module.scss';
import { useParams } from 'react-router-dom';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';
import Loader from 'components/Loader';
import { apiKey } from './../../../../apiKey';
import { observer, useLocalStore } from 'mobx-react-lite';
import RecipeItemStore from 'store/RecipeItemStore';
import { Meta } from 'utils/meta';
import React from 'react';
import ingredientsLogo from "assets/ingredients-logo.svg"
import equipmentLogo from "assets/equipment-logo.svg"

const RecipePage = () => {
  const recipeItemStore = useLocalStore(() => new RecipeItemStore())
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    recipeItemStore.getRecipeItem({
      apiKey: apiKey,
      id: Number(id)
    })
  }, [id, recipeItemStore]);
  
  return (
    <div className={styles.recipe_page}>
      {recipeItemStore.meta===Meta.loading || !recipeItemStore.recipe ? (
        <Loader size="l" />
      ) : (
        <>
          <section className={styles.title}>
            <button
              onClick={() => {
                navigate('/recipes');
                console.log('click');
              }}
            >
              <ArrowRightIcon left color="accent" />
            </button>
            <Text view="title">{recipeItemStore.recipe.title}</Text>
          </section>
          <div className={styles.recipe}>
            <section className={styles.withImage}>
              <img src={recipeItemStore.recipe.image} />
              <div className={styles.info}>
                <div className={styles.info_group}>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Preparation
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipeItemStore.recipe.preparation} minutes
                    </Text>
                  </div>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Ratings
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipeItemStore.recipe.ratings} likes
                    </Text>
                  </div>
                </div>
                <div className={styles.info_group}>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Cooking
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipeItemStore.recipe.cooking} minutes
                    </Text>
                  </div>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Servings
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipeItemStore.recipe.servings} servings
                    </Text>
                  </div>
                </div>
                <div className={styles.info_group}>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Total
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipeItemStore.recipe.total} minutes
                    </Text>
                  </div>
                </div>
              </div>
            </section>
            <section className={styles.text_container}>
              <Text view="p-16" color="primary">
                {ReactHtmlParser(recipeItemStore.recipe.summary ?? '')}
              </Text>
            </section>
            <section className={styles.ingredients_equipment}>
              <div>
                <Text view="p-20" weight="medium">
                  Ingredients
                </Text>
                <div className={`${styles.ie_items} ${styles.ing}`}>
                  {recipeItemStore.recipe.ingredients.map((ingredient) => (
                    <div key={ingredient} className={styles.ie_items__div}>
                      <img src={ingredientsLogo}></img>
                      <div>{ingredient}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.separator}>
                <div className={styles.vertical_line} />
                <div className={styles.dot} />
              </div>
              <div>
                <Text view="p-20" weight="medium">
                  Equipment
                </Text>
                <div className={styles.ie_items}>
                  {recipeItemStore.recipe.equipment.map((equipment) => (
                    <div key={equipment} className={styles.ie_items__div}>
                      <img src={equipmentLogo}></img>
                      <div>{equipment}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className={styles.directions}>
              <Text view="p-20" weight="medium">
                Directions
              </Text>
              <div className={styles.steps}>
                {recipeItemStore.recipe.directions.map((dir) => (
                  <div key={dir.numStep} className={styles.steps__div}>
                    <Text view="p-16" weight="medium">
                      Step {dir.numStep}
                    </Text>
                    <Text view="p-14">{dir.step}</Text>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default observer(RecipePage);
