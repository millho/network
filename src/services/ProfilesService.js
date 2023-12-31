import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class ProfilesService {
    async getProfileById(profileId) {
        const res = await api.get(`/api/profiles/${profileId}`)
        logger.log('fetched profile ✅', res.data)
        AppState.activeProfile = new Profile(res.data)
    }

    async searchProfiles(searchTerm) {
        const res = await api.get(`/api/profiles?query=${searchTerm}`)
        logger.log('fetched profiles ✅', res.data)
        AppState.searchResults = res.data.map(profile => new Profile(profile))
    }
}

export const profilesService = new ProfilesService