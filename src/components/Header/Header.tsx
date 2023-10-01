import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import mainLogo from 'assets/logo-simple-framed-green-gradient.svg'
import logoHeart from "assets/logo-heart.svg"
import logoUser from "assets/logo-user.svg"

import Text from "../Text";
import React from "react";

const Header = () => {
  const location = useLocation();
  return (
    <header>
      <div className={styles.nav}>
        <img
          className={styles.logo}
          alt="logo"
          src={mainLogo}
        />
        <Text color="primary" view="p-20" weight="bold">
          Food client
        </Text>
        <ul className={styles.navigation}>
          <Text
            view="p-16"
            tag="span"
            color={location.pathname === "/" ? "accent" : "primary"}
            weight={location.pathname === "/" ? "medium" : "normal"}
          >
            <Link to="/recipes" className={styles.link}>Recipes</Link>
          </Text>
          <Text view="p-16" tag="span" color="primary">
            <Link to="" className={styles.link}>Ingradients</Link>
          </Text>
          <Text view="p-16" tag="span" color="primary">
            <Link to="" className={styles.link}> Products</Link>
          </Text>
          <Text view="p-16" tag="span" color="primary">
            <Link to="" className={styles.link}> Menu Items</Link>
          </Text>
          <Text view="p-16" tag="span" color="primary">
            <Link to="" className={styles.link}>Meal Planning</Link>
          </Text>
        </ul>
      </div>
      <div className={styles.auth_fav}>
        <img
          className={styles.logo_heart}
          alt="logo-heart"
          src={logoHeart}
        />
        <img
          className={styles.logo_user}
          alt="logo-user"
          src={logoUser}
        />
      </div>
    </header>
  );
};

export default Header;
