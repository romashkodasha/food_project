export type SendMessageChatBotApi = {
    answerText: string
    media: {
        title: string
        image: string
        link: string
    }[]
}

export type SendMessageChatBotModel = {
    answerText: string
    media?: {
        title: string
        image: string
        link: string
    }[]
    type?: string
}

export const normalizeSendMessageChatBot = (
    from: SendMessageChatBotApi
): SendMessageChatBotModel => ({
    answerText: from.answerText,
    media: from.media,
})

export type GetSuggestionsChatBotApi = {
    suggests: {
        _: {
            name: string
        }[]
    }
    words: string[]
}

export type GetSuggestionsChatBotModel = string[]

export const normalizeGetSuggestionsChatBot = (
    from: GetSuggestionsChatBotApi
): GetSuggestionsChatBotModel => (
    from.suggests._.map(item => (item.name))
)
