<template>
    <div class="row justify-content-center">
        <img class="post-picture" :src="post.img" :alt="post.creatorId">
        <p class="fs-4 p-3 pt-0">{{ post.body }}</p>
        <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
            <div class="text-center">
                <img class="profile-picture me-2" :src="post.creator.picture" alt="">
                <b>{{ post.creator.name }}</b>
            </div>
        </router-link>
        <p class="text-end">{{ post.createdAt }}</p>
    </div>
</template>

<script>
import { Post } from '../models/Post';

export default {
    props: { post: { type: Post, required: true } },
    setup() {
        return {};
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