<template>
    <div class="container-fluid">
        <section class="row p-1 justify-content-center bg-dark">
            <h1 class="text-center">{{ profile.name }}</h1>
            <img class="profile-picture mb-2" :src="profile.picture" :alt="profile.name">
            <p class="px-5">{{ profile.bio }}</p>
        </section>
        <section class="cover-img row justify-content-around p-1 bg-dark">
            <div v-if="profile.github" class="col-3 text-center">
                <a target="_blank" :href="profile.github">
                    <i class="mdi mdi-github fs-1"></i>
                    <h5>GitHub</h5>
                </a>
            </div>
            <div v-if="profile.linkedin" class="col-3 text-center">
                <a target="_blank" :href="profile.linkedin">
                    <i class="mdi mdi-linkedin fs-1"></i>
                    <h5>LinkedIn</h5>
                </a>
            </div>
            <div v-if="profile.resume" class="col-3 text-center">
                <a target="_blank" :href="profile.resume">
                    <i class="mdi mdi-file-account fs-1"></i>
                    <h5>Resume</h5>
                </a>
            </div>
            <div v-if="profile.class" class="col-3 text-center">
                <a target="_blank" href="https://boisecodeworks.com/">
                    <i class="mdi mdi-google-classroom fs-1"></i>
                    <h5>{{ profile.class }} <i v-if="profile.graduated" class="mdi mdi-school fs-3"></i></h5>
                </a>
            </div>
        </section>
        <section class="row p-1">
            <div class="col-12 p-3 mb-3 bg-dark card" v-for="post in posts" :key="post.id">
                <PostCard :post="post" />
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'

export default {
    setup() {
        const route = useRoute();

        onMounted(() => {
            getProfileById();
            getPostsByProfile();
        })

        async function getProfileById() {
            try {
                await profilesService.getProfileById(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getPostsByProfile() {
            try {
                await postsService.getPostsByProfile(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            profile: computed(() => AppState.activeProfile),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
            posts: computed(() => AppState.posts)
        };
    },
};
</script>


<style scoped>
.profile-picture {
    height: 200px;
    max-width: 200px;
    width: 100%;
    object-fit: contain;
    object-position: center;
}

.cover-img {
    background-image: v-bind(coverImg);
    background-position: center;
    background-size: cover;
}
</style>