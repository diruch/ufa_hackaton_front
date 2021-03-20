import FilesApi from '../../api/files'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        uploadFile({ commit }, file) {
            return new Promise((resolve, reject) => {
                FilesApi.uploadFile(file)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        getFileById({ commit }, id) {
            return new Promise((resolve, reject) => {
                FilesApi.getFileById(id)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        uploadImage({ commit }, image) {
            return new Promise((resolve, reject) => {
                FilesApi.uploadImage(image)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        }
    },
    getters: {
    }
}