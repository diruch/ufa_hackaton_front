import axios from 'axios'
import { SERVER_URL_PREFIX } from '../services/constants'

const MENUS_URL = SERVER_URL_PREFIX + "menus/"

export default {

    createMenu(menu) {
        console.log(menu)
        return axios.post(MENUS_URL, menu)
    },

    loadMenuById(id) {
        return axios.get(MENUS_URL + id)
    },

    editMenu(id, menu) {
        return axios.put(MENUS_URL + id, menu)
    },
}