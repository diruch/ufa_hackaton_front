import axios from 'axios'

export default {
    login(username, password) {
        return axios.post("/api/v1/auth/login", {
            username: username,
            password: password
        })
    },
    restaurantRegistration(username, password, restName, restLocation) {
        return axios.post("/api/v1/restaurants", {
            email: username,
            password: password,
            restaurantName: restName,
            restaurantLocation: restLocation
        })
    }
}