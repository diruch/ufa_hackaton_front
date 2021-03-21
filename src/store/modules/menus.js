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
        loadAllCompanies({ commit }) {
            return new Promise((resolve, reject) => {
                MenusApi.getAllCompanies()
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },
        loadByCompanyById({ commit }, { id }) {
            return new Promise((resolve, reject) => {
                MenusApi.getCompanyById(id)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },
        loadCompanyResultsById({ commit }, { id }) {
            return new Promise((resolve, reject) => {
                MenusApi.getCompanyResultsById(id)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },
        loadActivites({commit}) {
            
            return new Promise((resolve, reject) => {
                MenusApi.getActivites()
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        }, 
        createCompany({commit}, {company}) {
            
            return new Promise((resolve, reject) => {
                MenusApi.createCompany(company)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },
        importCompanies({commit}, {formData}) {
            
            return new Promise((resolve, reject) => {
                MenusApi.importCompanies(formData)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        },
        importCompanyData({commit}, {id, formData}) {
            
            return new Promise((resolve, reject) => {
                MenusApi.importCompanyData(id, formData)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error))
            })
        }

    },
    getters: {
    }
}