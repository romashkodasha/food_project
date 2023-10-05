import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Text from 'components/Text'
import catImage1 from 'assets/kisspng-keeping-cats-mouse-dog-kitten-cats-5aba08c944ffc8.6720898815221413852826.png'
import catImage2 from 'assets/cat2-removebg-preview.png'
import catImage3 from 'assets/tak-stop-removebg-preview.png'
import catImage4 from 'assets/cat4.png'
import styles from './FallingCats.module.scss'

const FallingCats = () => {
    const [falling, setFalling] = useState(false)

    const startFalling = () => {
        setFalling(true)
    }
    const onAnimationComplete = () => {
        setFalling(false)
    }
    return (
        <div>
            <div onClick={startFalling} className={styles.meme}>
                <Text view="p-16" tag="span" color='primary' weight='normal'>
                    Show meme
                </Text>
            </div>
            {falling && (
                <div className={styles.falling_cats}>
                    <motion.img
                        key={Date.now() + 3}
                        src={catImage4}
                        alt="Falling Image"
                        initial={{ y: -1500, x: -300, opacity: 0.5 }}
                        animate={{ y: 100, x: -300, opacity: 1 }}
                        transition={{ duration: 3 }}
                        onAnimationComplete={onAnimationComplete}
                        className={styles.image}
                    />
                    <motion.img
                        key={Date.now()}
                        src={catImage1}
                        alt="Falling Image"
                        initial={{ y: -1000, x: 0, opacity: 0.5 }}
                        animate={{ y: 600, x: 0, opacity: 1 }}
                        transition={{ duration: 3 }}
                        onAnimationComplete={onAnimationComplete}
                        className={styles.image}
                    />
                    <motion.img
                        key={Date.now() + 1}
                        src={catImage2}
                        alt="Falling Image"
                        initial={{ y: -1250, x: 300, opacity: 0.5 }}
                        animate={{ y: 300, x: 300, opacity: 1 }}
                        transition={{ duration: 3 }}
                        onAnimationComplete={onAnimationComplete}
                        className={styles.image}
                    />
                    <motion.img
                        key={Date.now() + 2}
                        src={catImage3}
                        alt="Falling Image"
                        initial={{ y: -1000, x: 500, opacity: 0.5 }}
                        animate={{ y: 0, x: 500, opacity: 1 }}
                        transition={{ duration: 3 }}
                        onAnimationComplete={onAnimationComplete}
                        className={styles.image}
                    />
                    
                </div>
            )}
        </div>
    )
}

export default FallingCats
