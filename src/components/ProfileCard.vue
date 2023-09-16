<template>
    <section class="row p-1">
        <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
            <div>
                <h5><i v-if="profile.graduated" class="mdi mdi-check-decagram-outline"></i> {{ profile.name }}</h5>
            </div>
        </router-link>
    </section>
</template>

<script>
import { onMounted } from 'vue';
import { Profile } from '../models/Profile';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';

export default {
    props: { profile: { type: Profile, required: true } },

    setup(props) {
        onMounted(() => {
            getPostsByProfile();
        });

        async function getPostsByProfile() {
            try {
                await postsService.getPostsByProfile(props.profile.id)
            } catch (error) {
                Pop.error(error)
            }
        }

        return {};
    },
};
</script>


<style></style>