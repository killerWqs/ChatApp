import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Http, Response } from '@angular/http'
import { SessionService } from '../../../session.service'

@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css', '/asstes/css/iconfont.css']
})

export class Item {
    // set count++
    @Input() set fetchChat( chat: Array<any>) {
        if(!this.isFirst) {
            this.count++
        }else {
            this.count = this.chat.length
        }

        this.chat = chat        
    }
    @Input() name: string

    public http: Http
    public chat: Array<any>
    public count: number
    private isFirst: boolean = true

    constructor(http: Http, sesService: SessionService) {
        this.http = http
    }

    clickchat = (): void => {
        this.count = 0
        // 在数据库中删除数据        
        this.http.delete('')        
    }

    // init length
}