<template>
  <section class="row mb-3">
    <form @submit.prevent="searchProfiles">
      <div class="col-12 input-group">
        <input v-model="searchTerm" type="text" class="form-control" placeholder="search profiles...">
        <button class="btn btn-primary"><i class="mdi mdi-magnify"></i></button>
      </div>
    </form>
  </section>
  <section v-if="activeSearch" class="row">

  </section>
</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../App.vue'
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService';

export default {
  setup() {
    const searchTerm = ref('')

    return {
      searchTerm,
      activeSearch: computed(() => AppState.searchResults),

      async searchProfiles() {
        try {
          await profilesService.searchProfiles(searchTerm.value)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
};
</script>


<style></style>