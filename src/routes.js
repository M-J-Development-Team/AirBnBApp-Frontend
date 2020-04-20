  
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Navbar from './components/Navbar.vue'


export default[
    { path:'/', components: {default: Home, header: Navbar}},
    { path: '/login', component: Login},
    
]