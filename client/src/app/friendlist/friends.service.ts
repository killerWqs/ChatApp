import { Injectable } from '@angular/core'
import { UserService } from '../User.service'
import { FriendsList } from './friendlist.models'

@Injectable()

export class FriendsService {
    userService: UserService
    friendList: FriendsList

    constructor(userService: UserService) {
        this.userService = userService
    }

    getFriendsList = (user): void => {
        // return this.curUser.friendList
        this.friendList = user.friendList
    }
}
