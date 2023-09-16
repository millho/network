import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {
    async getPosts() {
        const res = await api.get('/api/posts')
        logger.log('fetched posts ✅', res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
    }

    async getPostsByProfile(profileId) {
        const res = await api.get(`/api/profiles/${profileId}/posts`)
        logger.log('fetched posts ✅', res.data.posts)
        AppState.posts = res.data.posts.map(post => new Post(post))
    }

    async createPost(postData) {
        const res = await api.post('/api/posts', postData)
        const newPost = new Post(res.data)
        logger.log('created post ✅', newPost)
        AppState.posts.push(newPost)
        return newPost
    }
}

export const postsService = new PostsService