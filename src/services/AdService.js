import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class AdService {
    async getAds() {
        const res = await api.get('/api/ads')
        logger.log('fetched ads ✅', res.data)
        AppState.activeAd1 = res.data[0]
        AppState.activeAd2 = res.data[1]
    }
}

export const adService = new AdService