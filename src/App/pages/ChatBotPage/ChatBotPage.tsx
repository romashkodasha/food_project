import React from 'react'
import styles from './ChatBotPage.module.scss'
import Input from 'components/Input'
import Button from 'components/Button'
import { observer, useLocalStore } from 'mobx-react-lite'
import ChatBotStore from 'store/ChatBotStore'
import { apiKey } from '../../../../apiKey'
import { toJS } from 'mobx'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Text from 'components/Text'
import {isMobile} from 'react-device-detect';

const ChatBot = () => {
    const chatBotStore = useLocalStore(() => new ChatBotStore())
    const mediaSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 950, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1300, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    }
    return (
        <div className={styles['chat-container']}>
            <div className={styles['chat-messages']}>
                {chatBotStore.messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.type
                                ? `${styles.message} ${styles[message.type]}`
                                : styles.message
                        }
                    >
                        {message.answerText}
                        {message.media &&
                            message.media.length !== 0 &&
                            Array.isArray(message.media) && (
                                <Slider
                                    {...mediaSettings}
                                    className={styles.slider}
                                    dots={!isMobile}   
                                >
                                    {message.media.map((item) => (
                                        <div
                                            key={item.title}
                                            className={styles['media-item']}
                                        >
                                            <img
                                                src={item.image}
                                                className={styles.media_img}
                                            />
                                            <Text>{item.title}</Text>
                                        </div>
                                    ))}
                                </Slider>
                            )}
                    </div>
                ))}
            </div>
            {chatBotStore.input !== '' &&
                toJS(chatBotStore.suggestions).length !== 0 && (
                    <div className={styles['suggestions']}>
                        {chatBotStore.suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className={styles['suggestion']}
                                onClick={() =>
                                    chatBotStore.handleSuggestionClick(
                                        suggestion
                                    )
                                }
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            <div className={styles['chat-input']}>
                <Input
                    value={chatBotStore.input}
                    onChange={(e) => chatBotStore.handleInputChange(e)}
                    placeholder="Type your message..."
                />
                <Button
                    onClick={() => {
                        chatBotStore.sendMessage({
                            apiKey: apiKey,
                            text: chatBotStore.input,
                        })
                        chatBotStore.setInput('')
                    }}
                >
                    Send
                </Button>
            </div>
        </div>
    )
}

export default observer(ChatBot)
