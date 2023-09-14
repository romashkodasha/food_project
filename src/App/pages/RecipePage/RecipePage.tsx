import './RecipePage.scss';
import { useParams } from 'react-router-dom';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';
import axios from 'axios';
import Loader from 'components/Loader';
import { apiKey } from './../../../../apiKey';

export type Recipe = {
  title: string;
  image: string; //image
  preparation: number; //preparationMinutes
  cooking: number; //cookingMinutes
  total: number; //readyInMinutes
  ratings: number; //aggregateLikes
  servings: number; //servings
  summary: string; //summary
  ingredients: string[]; //extendedIngredients
  equipment: string[]; //analyzedInstructions.steps.equipment
  directions: { numStep: number; step: string }[]; //analyzedInstructions.steps.step и номер .number
};

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const result = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
      });
      if (result.status===200){
      const raw = result.data;
      setRecipe({
        title: raw.title,
        image: raw.image,
        preparation: raw.preparationMinutes > 0 ? raw.preparationMinutes : 5,
        cooking: raw.preparationMinutes > 0 ? raw.cookingMinutes : raw.readyInMinutes - 5 ,
        total: raw.readyInMinutes,
        ratings: raw.aggregateLikes,
        servings: raw.servings,
        summary: raw.summary,
        ingredients: raw.extendedIngredients.map((ing: { original: string }) => ing.original),
        equipment: raw.analyzedInstructions[0].steps
          .flatMap((step: { equipment: { name: string }[] }) => step.equipment.map((eq: { name: string }) => eq.name))
          .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index),
        directions: raw.analyzedInstructions[0].steps.map((st: { number: number; step: string }) => ({
          numStep: st.number,
          step: st.step,
        })),
      });
      setLoading(false);}
    };
    fetch();
  }, [id]);
  
  return (
    <div className="recipe-page">
      {loading || !recipe ? (
        <Loader size="l" />
      ) : (
        <>
          <section className="title">
            <button
              onClick={() => {
                navigate('/recipes');
                console.log('click');
              }}
            >
              <ArrowRightIcon left color="accent" />
            </button>
            <Text view="title">{recipe.title}</Text>
          </section>
          <div className="recipe">
            <section className="withImage">
              <img src={recipe.image} />
              <div className="info">
                <div className="info-group">
                  <div>
                    <Text color="primary" view="p-16">
                      Preparation
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipe.preparation} minutes
                    </Text>
                  </div>
                  <div>
                    <Text color="primary" view="p-16">
                      Ratings
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipe.ratings} likes
                    </Text>
                  </div>
                </div>
                <div className="info-group">
                  <div>
                    <Text color="primary" view="p-16">
                      Cooking
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipe.cooking} minutes
                    </Text>
                  </div>
                  <div>
                    <Text color="primary" view="p-16">
                      Servings
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipe.servings} servings
                    </Text>
                  </div>
                </div>
                <div className="info-group">
                  <div>
                    <Text color="primary" view="p-16">
                      Total
                    </Text>
                    <Text color="accent" weight="medium">
                      {recipe.total} minutes
                    </Text>
                  </div>
                </div>
              </div>
            </section>
            <section className="text-container">
              <Text view="p-16" color="primary">
                {ReactHtmlParser(recipe.summary ?? '')}
              </Text>
            </section>
            <section className="ingredients-equipment">
              <div>
                <Text view="p-20" weight="medium">
                  Ingredients
                </Text>
                <div className="ie-items ing">
                  {recipe.ingredients.map((ingredient) => (
                    <div key={ingredient} className="ie-items__div">
                      <img src="..\src\assets\ingredients-logo.svg"></img>
                      <div>{ingredient}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="separator">
                <div className="vertical-line" />
                <div className="dot" />
              </div>
              <div>
                <Text view="p-20" weight="medium">
                  Equipment
                </Text>
                <div className="ie-items eq">
                  {recipe.equipment.map((equipment) => (
                    <div key={equipment} className="ie-items__div">
                      <img src="..\src\assets\equipment-logo.svg"></img>
                      <div>{equipment}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="directions">
              <Text view="p-20" weight="medium">
                Directions
              </Text>
              <div className="steps">
                {recipe.directions.map((dir) => (
                  <div key={dir.numStep} className="steps__div">
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

export default RecipePage;
