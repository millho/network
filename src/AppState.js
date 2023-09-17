import { reactive } from 'vue'
import { Post } from './models/Post.js'
import { Profile } from './models/Profile.js'
import { Ad } from './models/Ad.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Post[]} */
  posts: [],

  /**@type {Profile} */
  activeProfile: {},

  /**@type {Profile[]} */
  searchResults: [],

  /**@type {Ad} */
  activeAd1: {},

  /**@type {Ad} */
  activeAd2: {},

  nextUrl: null,
  previousUrl: null
})
