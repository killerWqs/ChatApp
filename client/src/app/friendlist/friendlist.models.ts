export class Friend {
    public name: string
    public sign: string
    public avatarSrc: string
}

export class FriendsList {
    public friends: Array<Friend>

    constructor(friendList: any) {
        this.friends = friendList.friends
    }
}