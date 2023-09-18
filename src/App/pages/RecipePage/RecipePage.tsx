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
import RecipesStore from 'store/RecipesStore';
import { Meta } from 'utils/meta';

const RecipePage = () => {
  const recipesStore = useLocalStore(() => new RecipesStore())
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    recipesStore.getRecipeItem({
      apiKey: apiKey,
      id: Number(id)
    })
  }, [id, recipesStore]);
  
  return (
    <div className={styles.recipe_page}>
      {recipesStore.meta===Meta.loading || !recipesStore.recipe ? (
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
            <Text view="title">{recipesStore.recipe.title}</Text>
          </section>
          <div className={styles.recipe}>
            <section className={styles.withImage}>
              <img src={recipesStore.recipe.image} />
              <div className={styles.info}>
                <div className={styles.info_group}>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Preparation
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipesStore.recipe.preparation} minutes
                    </Text>
                  </div>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Ratings
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipesStore.recipe.ratings} likes
                    </Text>
                  </div>
                </div>
                <div className={styles.info_group}>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Cooking
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipesStore.recipe.cooking} minutes
                    </Text>
                  </div>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Servings
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipesStore.recipe.servings} servings
                    </Text>
                  </div>
                </div>
                <div className={styles.info_group}>
                  <div className={styles.info_group_div}>
                    <Text color="primary" view="p-16">
                      Total
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipesStore.recipe.total} minutes
                    </Text>
                  </div>
                </div>
              </div>
            </section>
            <section className={styles.text_container}>
              <Text view="p-16" color="primary">
                {ReactHtmlParser(recipesStore.recipe.summary ?? '')}
              </Text>
            </section>
            <section className={styles.ingredients_equipment}>
              <div>
                <Text view="p-20" weight="medium">
                  Ingredients
                </Text>
                <div className={`${styles.ie_items} ${styles.ing}`}>
                  {recipesStore.recipe.ingredients.map((ingredient) => (
                    <div key={ingredient} className={styles.ie_items__div}>
                      <img src="..\src\assets\ingredients-logo.svg"></img>
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
                  {recipesStore.recipe.equipment.map((equipment) => (
                    <div key={equipment} className={styles.ie_items__div}>
                      <img src="..\src\assets\equipment-logo.svg"></img>
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
                {recipesStore.recipe.directions.map((dir) => (
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
