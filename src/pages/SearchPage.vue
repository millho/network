<template>
  <div class="container-fluid">
    <section class="row p-3 bg-dark mb-3">
      <form @submit.prevent="searchProfiles">
        <div class="col-12 input-group">
          <input v-model="searchTerm" type="text" class="form-control" placeholder="search profiles...">
          <button class="btn btn-primary"><i class="mdi mdi-magnify"></i></button>
        </div>
      </form>
    </section>
    <section v-if="searchResults" class="row p-1 justify-content-center">
      <div class=" col-8 rounded bg-primary text-center mb-3">
        <h3>Profiles matching your search</h3>
      </div>
      <div v-for="profile in searchResults" :key="profile.id" class="col-12 p-3 mb-3 bg-dark card">
        <ProfileCard :profile="profile" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState'
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService';

export default {
  setup() {
    const searchTerm = ref('')

    return {
      searchTerm,
      searchResults: computed(() => AppState.searchResults),

      async searchProfiles() {
        try {
          await profilesService.searchProfiles(searchTerm.value)
        } catch (error) {
          Pop.error(error)
        }
      },

      clearSearch() {
        searchTerm.value = ''
      }
    };
  },
};
</script>


<style></style>