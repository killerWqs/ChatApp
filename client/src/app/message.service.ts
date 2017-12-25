import { Injectable } from '@angular/core'
import { Observable, Subject, Observer } from 'rxjs'
import * as io from 'socket.io-client'
import { Socket } from 'dgram'
import { Http, Response } from '@angular/http'
import { UserService } from '../User.service'
import { Message } from './app.models'

@Injectable()

export class MessageService {
    accepter: Subject<any>
    // poster: Observable<any>
    socket: Socket
    http: Http
    messageList: Array<Message>
    // processed data
    mesList: Object = {}
    // keys of messagelist
    keys: Array<string>

    constructor (observer, http: Http) {
        this.accepter = new Subject()
        this.http = http
    }

    
    connect = (url: String, observer: Subject<any>): void => {
        this.socket = io(url)
        
        this.socket.on('message', (err, message) => {
            if(err) {
                console.log(err)
            }

            // 处理新发送过来的信息
            this._handleNewMessage(new Message(message))
        })
    }

    getMessageList = (name: String): void => {
        // fetch data from mongodb
        this.http.get('/store/messgae/' + name)
                    .subscribe((res: Response) => {
                        this.messageList = res.json()
                        this._handleMessageList()
                    })
    }

    // 处理离线是发送过来的信息
    _handleMessageList = (): void => {
        this.keys = Object.keys(this.mesList)
        for(let i = 0; i < this.messageList.length; i++) {
            let message = this.messageList[i]
            if(this.keys.indexOf(message.from)) { 
                this.mesList[message.from].push(message) 
            }else {
                this.mesList[message.from] = [].push(message)
            }
        }
    }

    // 处理在线时发送过来的信息
    _handleNewMessage = (message: Message): void => {
        let from = message.from
        if(this.keys.indexOf(message.from)) {
            this.mesList[message.from].push(message)
        }else {
            this.keys.push(message.from)
            this.mesList[message.from] = [].push(message)
        }
    }

    postMessage = (message): void => {
        this.socket.emit('post', message)
    }

    // 添加chat 应由friendlist组件调用
    addChat = (): void => {
        
    }

    // 删除chat 应由chat组件调用
    deleteChat = (): void => {

    }
}