<template>
  <div class="container-fluid">
    <section class="row p-1 justify-content-center bg-dark">
      <h1 class="text-center"><i v-if="account.graduated" class="mdi mdi-check-decagram-outline"></i> {{ account.name
      }}</h1>
      <img class="profile-picture mb-2" :src="account.picture" :alt="account.name">
      <p class="px-5">{{ account.bio }}</p>
    </section>
    <section class="row p-1 justify-content-between">
      <div class="col-6"><img class="img-fluid" :src="ad1.tall" alt=""></div>
      <div class="col-6"><img class="img-fluid" :src="ad2.tall" alt=""></div>
    </section>
    <section class="cover-img row justify-content-around p-1 bg-dark">
      <div v-if="account.github" class="col-3 text-center">
        <a target="_blank" :href="account.github">
          <i class="mdi mdi-github fs-1"></i>
          <h5>GitHub</h5>
        </a>
      </div>
      <div v-if="account.linkedin" class="col-3 text-center">
        <a target="_blank" :href="account.linkedin">
          <i class="mdi mdi-linkedin fs-1"></i>
          <h5>LinkedIn</h5>
        </a>
      </div>
      <div v-if="account.resume" class="col-3 text-center">
        <a target="_blank" :href="account.resume">
          <i class="mdi mdi-file-account fs-1"></i>
          <h5>Resume</h5>
        </a>
      </div>
      <div v-if="account.class" class="col-3 text-center">
        <a target="_blank" href="https://boisecodeworks.com/">
          <i class="mdi mdi-google-classroom fs-1"></i>
          <h5>{{ account.class }} <i v-if="account.graduated" class="mdi mdi-school fs-3"></i></h5>
        </a>
      </div>
    </section>
    <section class="row p-1 justify-content-center bg-dark">
      <div class="col-8">
        <h3>Edit Your Profile</h3>
        <form @submit.prevent="editProfile" class="row">
          <div class="mb-2 col-6">
            <input v-model="editable.name" required placeholder="Name" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
            <input v-model="editable.email" required placeholder="Your Email" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
            <input v-model="editable.picture" required class="form-control" placeholder="Profile Picture" type="text">
          </div>
          <div class="mb-2 col-6">
            <input v-model="editable.coverImg" required placeholder="Profile Cover Image" class="form-control"
              type="text">
          </div>
          <div class="mb-2 col-6">
            <input v-model="editable.github" required placeholder="Github" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
            <input v-model="editable.linkedin" required placeholder="LinkedIn" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
            <input v-model="editable.resume" required placeholder="Resume" class="form-control" type="text">
          </div>
          <div class="mb-2 col-6">
            <input v-model="editable.class" required placeholder="Class (Cohort-Year)" class="form-control" type="text">
          </div>
          <div class="mb-2 col-12">
            <textarea v-model="editable.bio" required rows="10" placeholder="Bio" class="form-control h-100"></textarea>
          </div>
          <button class="btn btn-success">Save Changes <i class="mdi mdi-check"></i></button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { accountService } from '../services/AccountService';
import Pop from '../utils/Pop';
import { adService } from '../services/AdService';
export default {
  setup() {
    const editable = ref({});
    onMounted(() => {
      getAds();
    })

    async function getAds() {
      try {
        await adService.getAds()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      editable,
      account: computed(() => AppState.account),
      ad1: computed(() => AppState.activeAd1),
      ad2: computed(() => AppState.activeAd2),

      async editProfile() {
        try {
          await accountService.editProfile(editable.value);
          editable.value = ''
          Pop.success('Changes Saved');
        }
        catch (error) {
          Pop.error(error);
        }
      }
    };
  },
}
</script>

<style scoped>
img {
  max-width: 100px;
}

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
