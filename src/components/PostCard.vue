<template>
    <div class="row justify-content-center">
        <!-- <img class="post-picture" :src="post.img" :alt="post.creatorId"> -->
        <img :src="post.imgUrl" alt="">
        <p class="fs-4 p-3 pt-0">{{ post.body }}</p>
        <button v-if="account.id" @click="likePost" class="btn bg-dark text-end"><i
                class="mdi fs-1 mdi-heart-outline"></i></button>
        <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
            <div class="text-center">
                <img class="profile-picture me-2" :src="post.creator.picture" alt="">
                <b><i v-if="post.creator.graduated" class="mdi mdi-check-decagram-outline"></i> {{ post.creator.name }}</b>
            </div>
        </router-link>
        <p v-if="account.id" class="text-end">Likes <span class="fs-5">{{ post.likes.length
        }}</span></p>
        <p class="text-end">{{ post.createdAt }}</p>
        <button v-if="account.id == post.creatorId" @click="deletePost" class="btn btn-danger">Delete Post<i
                class="mdi mdi-delete-forever"></i></button>
    </div>
</template>

<script>
import { computed } from 'vue';
import { Post } from '../models/Post';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';

export default {
    props: { post: { type: Post, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),

            async deletePost() {
                try {
                    if (await Pop.confirm('Are you sure you want to delete this post?')) {
                        const postId = props.post.id
                        await postsService.deletePost(postId)
                        Pop.success('Post Deleted')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            },

            async likePost() {
                try {
                    const id = props.post.id
                    await postsService.likePost(id)
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style scoped>
.profile-picture {
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 50em;
}

.post-picture {
    height: 750px;
    max-width: 750px;
    width: 100%;
    object-fit: contain;
    object-position: center;
}
</style>