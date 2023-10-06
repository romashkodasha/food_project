import { RecipeItemModel } from 'store/models/Recipe'
import styles from './../RecipesPage.module.scss'
import React from 'react'
import RecipeCard from 'components/RecipeCard'
import { motion } from 'framer-motion'

type RecipesListProps = {
    list: RecipeItemModel[]
}

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.8,
            staggerChildren: 0.3,
        },
    },
}

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
}

const RecipesList: React.FC<RecipesListProps> = ({
    list,
}: RecipesListProps) => {
    return (
        <motion.div
            className={styles.container}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {list.map((recipe: RecipeItemModel) => (
                <motion.div variants={item}>
                    <RecipeCard recipe={recipe} />
                </motion.div>
            ))}
        </motion.div>
    )
}

export default React.memo(RecipesList)
