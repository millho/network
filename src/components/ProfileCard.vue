<template>
    <section class="row p-1">
        {{ profile.name }}
    </section>
    //REVIEW - Finish building search results (profiles)
</template>

<script>
import { Profile } from '../models/Profile';

export default {
    props: { profile: { type: Profile, required: true } },

    setup() {
        return {};
    },
};
</script>


<style></style>