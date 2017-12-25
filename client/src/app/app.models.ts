
export class Message {
    public from: string
    public target: string
    public time: Date
    public content: string

    constructor(mes: any) {
        let props = ['from', 'target', 'time', 'content']
        let keys = Object.keys(mes)
        props.forEach((prop) => {
            if(!keys.indexOf(prop)) {
                return new Error('this message is invalid')
            } 
        })
        this.from = mes.from
        this.target = mes.target
        this.time = mes.time
        this.content = mes.content
    }
}

export class CurrentUser {
    public name: string
    public sex: string
    public sign: string
    public avatarSrc: string
    public friendsList: FriendsList

    constructor(user: any) {
        this.name = user.name
        this.sex = user.sex
        this.sign = user.sign || ''
        // 默认头像                     
        this.avatarSrc = user.avatarSrc || ''
    }
}

export class Friend {
    public name: string
    public sign: string
    public avatarSrc: string
}

export class FriendsList {
    public friends: Array<Friend>
}