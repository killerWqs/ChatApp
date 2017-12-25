import { Component, OnInit } from '@angular/core'
import { SignInOut } from './register/register.component'
import { MessageService } from './message.service'
import { Http, Response } from '@angular/http'
import { CurrentUser, Message } from './app.models'
import { Observer } from 'rxjs';
import { Subject } from '../../node_modules/_rxjs@5.5.5@rxjs/Subject';
import { UserService } from './User.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public curUser: CurrentUser
  public message: Message
  public observer: Subject<any>
  public userService: UserService
  public mesService: MessageService
  private url: String = 'ws://localhost'

  constructor(mesService: MessageService, userService: UserService) {
    this.mesService = mesService
    this.userService = userService
    this.observer.subscribe((message: Message) => {
      this.message = message
    })
  }

  // 作为服务来管理
  ngOnInit(): void {
    // if(document.cookie) {
    //   this.http.get('/verifyId', {}).subscribe((res: Response) => {
    //     if(res.status === 404) {
    //       this.curUser = new CurrentUser(res.json())
    //     }
    //   })
    // }
    let defaultUser = {name: 'Undefined', sex: '男', sign: '说点什么吧', avatarSrc: '/assets/img/defavatar.jpg'}
    let result = this.userService.cookieLogin()
    if(result){
      let curUser = Object.assign({}, defaultUser, result)
      // this.curUser = new CurrentUser(this.userService.cookieLogin()) || new CurrentUser(defaultUser)
      this.curUser = new CurrentUser(curUser)
    }else {
      this.curUser = new CurrentUser(defaultUser)
    }
  }

  ngAfterViewInit(): void {
    this.mesService.connect(this.url, this.observer)
  }

}


