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
        console.log(request)
        return axios.post("/chart/country", request)
    }
}