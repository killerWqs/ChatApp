import { BrowserModule } from '@angular/platform-browser'
import { NgModule, Component } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HttpModule } from '@angular/http'

import { FriendList } from './friendlist.component'
import { ChatComponent } from './chat/chat.Component.ts'
import { FriendsComponent } from './friends/friends.component.ts'
import { SettingsComponet } from './settings/settings.component.ts'

const routes = [
    {path: 'session', component: ChatComponent },
    {path: 'friends', component: FriendsComponent },
    {path: 'settings', component: SettingsComponet }
]

@NgModule({
    declarations: [],
    imports: [
        HttpModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    bootstrap: [FriendList],
    providers: []
})

export class FriendListModule {}
