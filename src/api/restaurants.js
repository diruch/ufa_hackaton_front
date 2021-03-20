import axios from 'axios'

export default {

    loadRestaurantById(id) {
        return axios.get("/api/v1/restaurants/" + id)
    },

    editRestaurantData(id, restaurant) {
        return axios.put("/api/v1/restaurants/" + id, restaurant
        )
    },

    loadOkveds() {
        return axios.get("/okveds")
    },

    loadChart(request) {
        return axios.post("/chart/country", request)
    },

    loadDistricts() {
        return axios.get("/locations/districts")
    },

    loadDistrictChart(request) {
        return axios.post("/chart/districts", request)
    },

    loadRegions() {
        return axios.get("/locations/regions")
    },

    loadRegionstChart(request) {
        return axios.post("/chart/regions", request)
    },

    loadOKVEDChart(request) {
        console.log(request)
        return axios.post("/chart/okveds", request)
    },
}