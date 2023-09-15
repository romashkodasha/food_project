import './RecipesPage.module.scss';
import Text from '../../../components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import { useState, useEffect, useCallback } from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Card from 'components/Card';
import axios from 'axios';
import { Pagination } from 'components/Pagination';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { apiKey } from './../../../../apiKey';
import styles from './RecipesPage.module.scss';

const OPTIONS: Option[] = [
  { key: 'kt1', value: 'Kategoria1' },
  { key: 'kt2', value: 'Kategoria2' },
  { key: 'kt3', value: 'Kategoria3' },
];

export type Recipe = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  ingredients: string;
  kcal: number;
};

export type RawServer = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  nutrition: {
    ingredients: { name: string }[];
    nutrients: { amount: number }[];
  };
};

const RecipesPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlePages = useCallback((updatePage: number) => {
    setPage(updatePage);
  }, []);
  const handleChange = useCallback((newSelectedOptions: Option[]) => {
    setSelectedOptions(newSelectedOptions);
  }, []);
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const getTitle = (value: Option[]) => {
    if (value.length === 0) {
      return 'Categories';
    } else {
      return value.map((option) => option.value).join(', ');
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true`, //добавить параметр number для количества записей (по умолчанию 10)
      });
      if (result.status === 200) {
        setRecipes(
          result.data.results.map((raw: RawServer) => ({
            id: raw.id,
            image: raw.image,
            title: raw.title,
            readyInMinutes: raw.readyInMinutes,
            ingredients: raw.nutrition.ingredients.map((ing: { name: string }) => ing.name).join(' + '),
            kcal: raw.nutrition.nutrients[0].amount,
          })),
        );
        setLoading(false);
      }
    };
    fetch();
  }, []);
  return (
    <div className="recipes-page">
      {loading ? (
        <Loader size="l" />
      ) : (
        <>
          <img className={styles.image_recipes} src="..\src\assets\frame.svg" />
          <div className={styles.recipes}>
            <Text view="p-20" color="primary">
              Find the perfect food and <span style={{ textDecoration: 'underline' }}>drink ideas</span> for every
              occasion , from <span style={{ textDecoration: 'underline' }}> weeknight dinners</span> to{' '}
              <span style={{ textDecoration: 'underline' }}> holiday feasts</span>
            </Text>
            <div className={styles.search_filter_container}>
              <div className={styles.search_field}>
                <Input value={inputValue} onChange={handleInputChange} placeholder="Enter dishes" />
                <Button>
                  <img src="..\src\assets\search-button.svg" />
                </Button>
              </div>
              <MultiDropdown
                value={selectedOptions}
                options={OPTIONS}
                onChange={handleChange}
                getTitle={getTitle}
                className="food_categories"
              />
            </div>
            <div className={styles.items}>
              {recipes.slice((page - 1) * 9, page * 9).map((recipe: Recipe) => (
                <Card
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  subtitle={recipe.ingredients}
                  className="recipe_card"
                  captionSlot={
                    <div className={styles.caption_slot}>
                      <img src="..\src\assets\time-preparation-logo.svg" />{' '}
                      <Text weight="medium">{recipe.readyInMinutes} minutes</Text>
                    </div>
                  }
                  actionSlot={
                    <div className={styles.action_slot}>
                      <Text weight="bold" color="accent" view="p-18">
                        {recipe.kcal} kcal
                      </Text>
                      <Button>Save</Button>
                    </div>
                  }
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                />
              ))}
            </div>
            <Pagination page={page} totalPages={Math.ceil(recipes.length / 9)} handlePagination={handlePages} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipesPage;
