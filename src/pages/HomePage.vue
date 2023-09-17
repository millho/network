<template>
  <section class="container-fluid">
    <div class="row p-1 justify-content-center">
      <div v-if="account.id" class="col-8 bg-dark card mb-3 p-3 form">
        <h5>Create A Post</h5>
        <form @submit.prevent="createPost" class="row justify-content-center component">
          <div class="col-12 mb-1">
            <input v-model="postData.imgUrl" type="text" class="form-control" placeholder="Image">
          </div>
          <div class="col-12 mb-2">
            <input v-model="postData.body" type="text" class="form-control" placeholder="Description">
          </div>
          <button class="col-6 btn btn-primary">
            Create Post
          </button>
        </form>
      </div>
    </div>
    <div class="row p-1 justify-content-between">
      <div class="col-6"><img class="img-fluid" :src="ad1.tall" alt=""></div>
      <div class="col-6"><img class="img-fluid" :src="ad2.tall" alt=""></div>
    </div>
    <div class="row p-1 justify-content-center">
      <div class="col-8 p-3 mb-3 bg-dark card" v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </div>
      <button @click="changePage(previousUrl)" class="col-6 btn btn-light" :disabled="!previousUrl">Previous</button>
      <button @click="changePage(nextUrl)" class="col-6 btn btn-light">Next</button>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import { adService } from '../services/AdService';

export default {
  setup() {
    const postData = ref({});
    onMounted(() => {
      getPosts();
      getAds();
    });

    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getAds() {
      try {
        await adService.getAds()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      postData,
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      nextUrl: computed(() => AppState.nextUrl),
      previousUrl: computed(() => AppState.previousUrl),
      ad1: computed(() => AppState.activeAd1),
      ad2: computed(() => AppState.activeAd2),

      async createPost() {
        try {
          await postsService.createPost(postData.value)
          postData.value = {}
          Pop.toast('Post Created', 'success')
        } catch (error) {
          Pop.error(error)
        }
      },

      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
