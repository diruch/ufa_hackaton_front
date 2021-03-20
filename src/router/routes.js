import Home from '../components/Home'
import Login from '../components/auth/Login'
import RestaurantRegistration from '../components/auth/RestaurantRegistration'
import RestaurantEdit from '../components/restaurants/RestaurantEdit'
import Menu from '../components/restaurants/menu/Menu'
import MenuEdit from '../components/restaurants/menu/MenuEdit'

import AggregatedReports from '../components/hackaton/AggregatedReports'

export default [
    { name: 'home', path: '/', component: Home },
    { name: 'login', path: '/login', component: Login },
    { name: 'restaurant-registration', path: '/restaurant-registration', component: RestaurantRegistration },
    { name: 'restaurant-edit', path: '/restaurants/:id/edit', component: RestaurantEdit, props: true },
    { name: 'menu', path: '/restaurants/:restaurantId/menus/:menuId', component: Menu, props: true },
    { name: 'menu-edit', path: '/restaurants/:restaurantId/menus/:menuId/edit', component: MenuEdit, props: true },
    { name: 'menu-create', path: '/restaurants/:restaurantId/menus/create', component: MenuEdit, props: true },
    { name: 'aggregated-reports', path: '/aggregated-reports', component: AggregatedReports, props: true }
]