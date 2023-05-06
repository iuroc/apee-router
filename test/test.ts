import ApeeRouter from '../src/main'

const router = new ApeeRouter({
    // default: 'list'
    default: ['about', [() => {}, () => {}, () => {}]]
})
// router.setDefaultRoute('list')
router.set(['list', 'home'])
// router.setDefaultRoute('list')
router.start()
window['router'] = router