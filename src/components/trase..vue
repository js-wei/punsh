<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
 <keep-alive>
 <router-view class="router-view" ></router-view>
 </keep-alive>
</transition>
<script>
 import { mapState } from 'vuex'
 import sideFooter from "./components/Footer.vue"
 
 export default {
 name: 'app',
 data () {
 return {
 showFooter : false
 }
 },
 components : {
 sideFooter
 },
 computed:{
 ...mapState({
 direction: state => state.mutations.direction
 })
 },
 }
</script>
 
<style scoped>
 .vux-pop-out-enter-active,
 .vux-pop-out-leave-active,
 .vux-pop-in-enter-active,
 .vux-pop-in-leave-active {
 will-change: transform;
 transition: all 250ms;
 height: 100%;
 top: 0;
 position: absolute;
 backface-visibility: hidden;
 perspective: 1000;
 }
 
 .vux-pop-out-enter {
 opacity: 0;
 transform: translate3d(-100%, 0, 0);
 }
 
 .vux-pop-out-leave-active {
 opacity: 0;
 transform: translate3d(100%, 0, 0);
 }
 
 .vux-pop-in-enter {
 opacity: 0;
 transform: translate3d(100%, 0, 0);
 }
 
 .vux-pop-in-leave-active {
 opacity: 0;
 transform: translate3d(-100%, 0, 0);
 }
</style>
// main.js
const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);
 
router.beforeEach(function (to, from, next) {
 
 const toIndex = history.getItem(to.path);
 const fromIndex = history.getItem(from.path);
 
 if (toIndex) {
 if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
 store.commit('UPDATE_DIRECTION', {direction: 'forward'})
 } else {
 store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
 }
 } else {
 ++historyCount;
 history.setItem('count', historyCount);
 to.path !== '/' && history.setItem(to.path, historyCount);
 store.commit('UPDATE_DIRECTION', {direction: 'forward'})
 }
 next()
});