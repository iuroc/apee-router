import ApeeRouter from '../src/main'

const router = new ApeeRouter()
router.set(['home', 'list', 'about', 'video', 'share'])
router.start()

window['router'] = router
window['ApeeRouter'] = ApeeRouter