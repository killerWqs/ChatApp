import { Component } from '@angular/core'
import { MessageService } from '../../message.service';

@Component({
    // selector: 'chat'
    template: `
    <div class="chat">
        <div class="item-contianer" *ngFor="let key of keys">
            <item class="item" [name]="key" [chat]="mesList[key]"></item>
        </div>
        <div class="scroll-container">
            <div class="scroll-bar"></div>
        </div>
    </div>
    `,
    styleUrls: ['./chat.component.css']
})

export class ChatComponent {
    messageList: object
    keys: Array<string>
    bar_width: number
    mesService: MessageService

    constructor(mesService: MessageService) {
        this.mesService = mesService
        this.messageList = mesService.mesList    
        this.keys = mesService.keys
    }

    deleteChat = (): void => {
        // 调用服务的删除chat
        this.mesService.deleteChat()
        this._recountWidth()
    }

    _recountWidth = (): void => {
        //this.bar_width = 
    }
    /* 添加发送信息的chat
    * addChat = (): void => {}
    * 应该有mesService添加
    */
}   