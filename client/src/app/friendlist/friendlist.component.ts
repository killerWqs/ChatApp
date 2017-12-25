import { Component, Output} from '@angular/core'
import { Routes } from '@angular/router'
import { ChatComponent } from './chat/chat.Component.ts'
import { FriendsComponent } from './friends/friends.component.ts'
import { SettingsComponet } from './settings/settings.component.ts'

@Component({
    selector: 'friendlist',
    templateUrl: './friendlist.component.html',
    styleUrls: ['./friendlist.component.css']
})

export class FriendList {
    @Output() public friends
    public routes: Routes

    constructor() {

    }

}