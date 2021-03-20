import axios from 'axios'

export default {

    uploadFile(file) {
        return axios.post("/api/v1/files", file)
    },

    getFileById(id) {
        return axios.get("/api/v1/files/" + id)
    },

    uploadImage(image) {
        return axios.post("/api/v1/files/images", image)
    }
}