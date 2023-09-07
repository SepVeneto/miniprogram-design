import microApp from '@micro-zoe/micro-app'
import VpApp from './components/VpApp.vue'

microApp.start()
console.log('trigger')

export default {
  Layout: VpApp,
}
