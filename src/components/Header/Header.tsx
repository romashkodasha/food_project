import "./Header.scss";
import { Link, useLocation } from "react-router-dom";

import Text from "../Text";

const Header = () => {
  const location = useLocation();
  return (
    <header>
      <div className="nav">
        <img
          className="logo"
          alt="logo"
          src="..\src\assets\logo-simple-framed-green-gradient.svg"
        />
        <Text color="primary" view="p-20" weight="bold">
          Food client
        </Text>
        <ul className="navigation">
          <Text
            view="p-16"
            tag="span"
            color={location.pathname === "/" ? "accent" : "primary"}
            weight={location.pathname === "/" ? "medium" : "normal"}
          >
            <Link to="/recipes">Recipes</Link>
          </Text>
          <Text view="p-16" tag="span" color="primary">
            <Link to="">Ingradients</Link>
          </Text>
          <Text view="p-16" tag="span" color="primary">
            <Link to=""> Products</Link>
          </Text>
          <Text view="p-16" tag="span" color="primary">
            <Link to=""> Menu Items</Link>
          </Text>
          <Text view="p-16" tag="span" color="primary">
            <Link to="">Meal Planning</Link>
          </Text>
        </ul>
      </div>
      <div className="auth-fav">
        <img
          className="logo-heart"
          alt="logo-heart"
          src="..\src\assets\logo-heart.svg"
        />
        <img
          className="logo-user"
          alt="logo-user"
          src="..\src\assets\logo-user.svg"
        />
      </div>
    </header>
  );
};

export default Header;
