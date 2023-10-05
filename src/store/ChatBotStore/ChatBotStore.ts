import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { ApiResponse } from 'store/ApiStore/types'
import {
    GetSuggestionsChatBotApi,
    GetSuggestionsChatBotModel,
    SendMessageChatBotApi,
    SendMessageChatBotModel,
    normalizeGetSuggestionsChatBot,
    normalizeSendMessageChatBot,
} from 'store/models/ChatBot'
import { Meta } from 'utils/meta'
import { GetSuggestionsChatBotParams, SendMessageChatBotParams } from './types'
import rootStore from 'store/RootStore'
import { apiKey } from '../../../apiKey'

type PrivateFields = '_meta' | '_messages' | '_suggestions' | '_input'| '_contextId'

export default class ChatBotStore {
    private _meta: Meta = Meta.initial
    private _messages: SendMessageChatBotModel[] = []
    private _suggestions: GetSuggestionsChatBotModel = []
    private _input: string = ''
    private _contextId: number = Math.round(Math.random() * 100000);

    constructor() {
        makeObservable<ChatBotStore, PrivateFields>(this, {
            _meta: observable,
            _messages: observable,
            _suggestions: observable,
            _input: observable,
            _contextId: observable,
            meta: computed,
            messages: computed,
            suggestions: computed,
            input: computed,
            sendMessage: action,
            getSuggestions: action,
            setInput: action,
            setMessages: action,
            setSuggestions: action,
            handleInputChange: action,
            handleSuggestionClick: action,
        })
    }

    get meta(): Meta {
        return this._meta
    }

    get messages(): SendMessageChatBotModel[] {
        return this._messages
    }

    get suggestions(): GetSuggestionsChatBotModel {
        return this._suggestions
    }

    get input(): string {
        return this._input
    }

    get contextId(): number{
        return this._contextId
    }

    setInput(value: string) {
        this._input = value
    }

    setMessages(messages: SendMessageChatBotModel[]) {
        this._messages = messages
    }

    setSuggestions(suggestions: GetSuggestionsChatBotModel) {
        this._suggestions = suggestions
    }

    async sendMessage(param: SendMessageChatBotParams): Promise<void> {
        this._meta = Meta.loading
        const newMessages = [
            ...this.messages,
            { answerText: this.input, type: 'user' },
        ]
        this.setMessages(newMessages)
        const response: ApiResponse<SendMessageChatBotApi, string> =
            await rootStore.apiStore.request({
                method: 'get',
                endpoint: `/food/converse?text=${param.text}&apiKey=${param.apiKey}&contextId=${this.contextId}`,
            })
        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error
            }
            if (response.success) {
                try {
                    this._meta = Meta.success
                    const botMessage = normalizeSendMessageChatBot(
                        response.data
                    )
                    botMessage.type = 'bot'
                    const updateMessages = [...newMessages, botMessage]
                    this.setMessages(updateMessages)
                    return
                } catch {
                    this._meta = Meta.error
                }
                this.setInput('')
            }
        })
        this._meta = Meta.error
    }

    async getSuggestions(param: GetSuggestionsChatBotParams) {
        this._meta = Meta.loading
        const response: ApiResponse<GetSuggestionsChatBotApi, string> =
            await rootStore.apiStore.request({
                method: 'get',
                endpoint: `/food/converse/suggest?query=${this.input}&number=${param.number}&apiKey=${param.apiKey}`,
            })
        runInAction(() => {
            if (!response.success) {
                this._meta = Meta.error
            }
            if (response.success) {
                try {
                    this._meta = Meta.success
                    this.setSuggestions(
                        normalizeGetSuggestionsChatBot(response.data)
                    )
                    return
                } catch {
                    this._meta = Meta.error
                }
            }
        })
        this._meta = Meta.error
    }

    handleInputChange(value: string) {
        this.setInput(value)
        this.getSuggestions({ apiKey: apiKey, number: 5 })
    }

    handleSuggestionClick(suggestion: string) {
        this.setInput(suggestion)
        this.setSuggestions([])
    }

    destroy(): void {
        this._messages = []
        this._meta = Meta.initial
        this._input = ''
        this._suggestions = []
    }
}
