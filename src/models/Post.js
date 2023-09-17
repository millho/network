

export class Post {
    constructor(data) {
        this.id = data.id
        this.imgUrl = data.imgUrl
        this.body = data.body
        this.likeIds = data.likeIds
        this.creatorId = data.creatorId
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
        this.creator = data.creator
        this.likeIds = data.likeIds
        this.likes = data.likes
    }
}