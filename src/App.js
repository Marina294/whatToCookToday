import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import pan from './assets/pan.png';
import { BiSearchAlt } from "react-icons/bi";
import "./index.css";

const APP_ID = "47915a59";
const APP_KEY = "daa28f2d2ccd74d661d0be4832236c41";

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;

const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SeeMoreText = styled.span`
  color: #eb3300;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
`;

const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
`;

const SeeNewTab = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState("");

  const { label, image, ingredients, url } = props.recipe;
  return (
    <RecipeContainer>
      <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(!show)}>
        Ingredients
      </IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>
        See Complete Recipe
      </SeeMoreText>
    </RecipeContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #FCE38A;
  color: #413a30;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  font-size: 1.6rem;
  font-weight: bold;
  @media only screen and (max-width: 650px) {
    background-color: pink;
    color: black;
    display: block;
    justify-content: center;
    text-align: center;
    align-items: center;
    // padding: 1rem;
    // font-size: 1.6rem;
    // font-weight: bold;
  }
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 1rem;
  border-radius: 0.8rem;
  margin-left: 1rem;
  width: 60%;
  background-color: #ffffff;
  @media only screen and (max-width: 650px) {
    flex-direction: row;
    padding: 1.5rem 1.5rem;
    border-radius: 0.8rem;
    margin: auto;
    width: 60%;
    background-color: #ffffff;
  }
`;

const RecipeImage = styled.img`
  width: 4rem;
  height: auto;
  margin: 1rem;
  @media only screen and (max-width: 650px) {
    width: 4rem;
    height: auto;
    margin: 1rem 1rem 1rem 0rem;
    text-align: center;
  }
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 650px) {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  text-align: center;
  }
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;
`;

const SearchInput = styled.input`
  color: #413a30;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 3rem;
  gap: 3rem;
  justify-content: space-evenly;
`;

const AppComponent = () => {
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <RecipeImage src={pan} />
          What To Cook Today
        </AppName>
        <SearchBox>
            <BiSearchAlt />
          <SearchInput
            placeholder="food name, ingredients"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList?.length ? (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe} />
          ))
        ) : (
          <Placeholder src={pan} />
        )}
      </RecipeListContainer>
    </Container>
  );
};

export default AppComponent;
