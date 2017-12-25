import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { CurrentUser, FriendsList } from './app.models';
import { MessageService } from './friendlist/message.service';

@Injectable()

export class UserService {
    public http: Http
    public curUser: CurrentUser
    public mesService: MessageService

    constructor(http: Http, mesService: MessageService) {
        this.http = http
        this.mesService = mesService
    }

    cookieLogin = (): CurrentUser => {
        if(document.cookie) {
            this.http.get('/verifyId', {}).subscribe((res: Response) => {
                if(res.status === 200) {
                    this.curUser = new CurrentUser(res.json())
                    this.mesService.getMessageList(this.curUser.name)
                }
            })
        }

        return this.curUser
    }

    // 表单登录
    formLogin = (data) => {
        let headers = new Headers()
        headers.set('content-type', 'application/json')
        let ops = new RequestOptions({
            headers: headers
        })
        this.http.post('', data, ).subscribe((res: Response) => {
            if(res.status === 500) {
                return false
            }else {
                this.curUser = new CurrentUser(res.json())
                this.mesService.getMessageList(this.curUser.name)
                return true
            }
        })
    }

    getFriendsList = (user): FriendsList => {
        // return this.curUser.friendList
        return this.curUser.friendsList
    }
}