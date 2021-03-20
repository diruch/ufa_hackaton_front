import RestaurantsApi from '../../api/restaurants'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        loadRestaurantById({ commit }, { id }) {
            return new Promise((resolve, reject) => {
                RestaurantsApi.loadRestaurantById(id)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        editRestaurantData({ commit }, { id, restaurant }) {
            console.log(id)
            return new Promise((resolve, reject) => {
                RestaurantsApi.editRestaurantData(id, restaurant)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        loadOkveds({ commit }) {
            return new Promise((resolve, reject) => {
                RestaurantsApi.loadOkveds()
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        loadChart({ commit }, request) {
            return new Promise((resolve, reject) => {
                RestaurantsApi.loadChart(request)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        loadDistricts({ commit }) {
            return new Promise((resolve, reject) => {
                RestaurantsApi.loadDistricts()
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        loadDistrictChart({ commit }, request) {
            return new Promise((resolve, reject) => {
                RestaurantsApi.loadDistrictChart(request)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        loadRegions({ commit }) {
            return new Promise((resolve, reject) => {
                RestaurantsApi.loadRegions()
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        loadRegionsChart({ commit }, request) {
            return new Promise((resolve, reject) => {
                RestaurantsApi.loadRegionstChart(request)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },
    },
    getters: {
    }
}