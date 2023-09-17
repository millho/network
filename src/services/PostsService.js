import axios from "axios"
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

    async deletePost(postId) {
        const res = await api.delete(`/api/posts/${postId}`)
        logger.log('post deleted ✅', res.data)
        let indexToRemove = AppState.posts.findIndex(post => post.id == postId)
        if (indexToRemove >= 0) {
            AppState.posts.splice(indexToRemove, 1)
        }
    }

    async changePage(url) {
        const res = await api.get(url)
        AppState.posts = res.data.results
        AppState.nextUrl = res.data.next
        AppState.previousUrl = res.data.previous
    }

    async likePost(id) {
        const res = await api.post(`/api/posts/${id}/like`)
        logger.log('liked post ✅', res.data)
    }
}

export const postsService = new PostsService