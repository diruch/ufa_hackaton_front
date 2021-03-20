import MenusApi from '../../api/menus'

export default {
    state: {
    },
    mutations: {
    },
    actions: {
        createMenu({ commit }, { menu }) {
            return new Promise((resolve, reject) => {
                MenusApi.createMenu(menu)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        loadMenuById({ commit }, id) {
            return new Promise((resolve, reject) => {
                MenusApi.loadMenuById(id)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },

        editMenu({ commit }, { menuId, menu }) {
            return new Promise((resolve, reject) => {
                MenusApi.editMenu(menuId, menu)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },
    },
    getters: {
    }
}