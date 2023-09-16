<template>
  <section class="container-fluid">
    <div class="row p-1 justify-content-center">
      <div class="col-8 p-3 mb-3 bg-dark card" v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';

export default {
  setup() {
    onMounted(() => { getPosts(); });

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss"></style>
