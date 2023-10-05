import styles from './Header.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import mainLogo from 'assets/logo-simple-framed-green-gradient.svg'
import logoHeart from 'assets/logo-heart.svg'
import menuIcon from 'assets/menu-icon.svg'

import Text from '../Text'
import React, { useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import FallingCats from 'components/FallingCats'

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const navItems = [
        { path: '/recipes', text: 'Recipes' },
        { path: '/planning', text: 'Meal Planning' },
        { path: '/chatbot', text: 'ChatBot' },
    ]
    const [isMenuOpen, setIsMenuOpen] = useState(false) // Состояние для отслеживания открытия/закрытия меню

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen) // Инвертируем состояние при каждом клике
    }
    return (
        <>
            <BrowserView>
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
                        <div  className={styles.navigation}>
                            {navItems.map((item) => (
                                <Text
                                    view="p-16"
                                    tag="span"
                                    color={
                                        location.pathname === item.path
                                            ? 'accent'
                                            : 'primary'
                                    }
                                    weight={
                                        location.pathname === item.path
                                            ? 'medium'
                                            : 'normal'
                                    }
                                    key={item.path}
                                >
                                    <Link
                                        to={item.path}
                                        className={styles.link}
                                    >
                                        {item.text}
                                    </Link>
                                </Text>
                            ))}
                            <FallingCats />
                        </div>
                    </div>
                    <img
                        className={styles.logo_heart}
                        alt="logo-heart"
                        src={logoHeart}
                        onClick={() => {
                            navigate('/favorites')
                        }}
                    />
                </header>
            </BrowserView>
            <MobileView>
                <header>
                    <div className={styles.nav}>
                        <img
                            src={mainLogo}
                            alt="Menu Icon"
                            className={styles.logo}
                        />
                        <Text color="primary" view="p-20" weight="bold">
                            Food client
                        </Text>
                    </div>
                    <div className={styles.auth_fav}>
                        <img
                            className={styles.logo_heart}
                            alt="logo-heart"
                            src={logoHeart}
                            onClick={() => {
                                navigate('/favorites')
                            }}
                        />
                        <img src={menuIcon} onClick={handleMenuToggle} />
                    </div>
                </header>
                {isMenuOpen && (
                    <div className={styles.mobileMenu}>
                        {navItems.map((item) => (
                            <Text
                                view="p-16"
                                tag="span"
                                color={
                                    location.pathname === item.path
                                        ? 'accent'
                                        : 'primary'
                                }
                                weight={
                                    location.pathname === item.path
                                        ? 'medium'
                                        : 'normal'
                                }
                            >
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={styles.link}
                                >
                                    {item.text}
                                </Link>
                            </Text>
                        ))}
                        <FallingCats />
                    </div>
                )}
            </MobileView>
        </>
    )
}

export default Header
