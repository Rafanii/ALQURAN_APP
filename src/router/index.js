import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Surah from '../views/Surah.vue'
import SurahDetail from '../views/SurahDetail.vue'
import TerakhirBaca from '../views/TerakhirBaca.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/surah', name: 'Surah', component: Surah },
  { path: '/surah/:id', name: 'SurahDetail', component: SurahDetail },
  {
    path: '/terakhir-baca',
    name: 'TerakhirBaca',
    component: TerakhirBaca
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router



