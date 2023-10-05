export type SendMessageChatBotParams = {
    apiKey: string;
    text: string;
    contextId?: number; 
}

export type GetSuggestionsChatBotParams = {
    apiKey: string;
    number: number; // от 1 до 25
}