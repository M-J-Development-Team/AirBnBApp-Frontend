  
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Navbar from './components/Navbar.vue'
import Registration from './components/Registration.vue'
import MyInfo from './components/MyInfo.vue'
import AllUsers from './components/AllUsers.vue'
import AllAmenities from './components/AllAmenities.vue'
import AddApartment from './components/AddApartment.vue';



export default[
    { path:'/', components: {default: Home, header: Navbar}},
    { path: '/login', component: Login},
    { path: '/registration', component: Registration},
    { path: '/myinfo', component: MyInfo},
    { path: '/allusers', component: AllUsers},
    { path: '/allamenities', component: AllAmenities},
    { path: '/addapartment', component: AddApartment},
    
]