<script>
import { APP_ICONS } from '@/helpers/app-icons'
import EventBus, { PAGE_DATA_REFRESH_EVENT } from '@/helpers/event-bus'
import StoreHelper from '@/helpers/store-helper'

export default {
  name: 'OutsideCommon',
  data () {
    return {
      appIcons: APP_ICONS,
      isAdmin: false

    }
  },
  provide () {
    return {
      isAdmin: this.isAdmin,
    }
  },
  computed: {
    showLabels () { return StoreHelper.isOutsideShowButtonLabels() },
  },
  methods: {
    async loadBase () {
      this.isAdmin = await StoreHelper.adminValidate()
      this.loadComponent()
    },
    redirectAdminLogin () {
      this.$router.push('/admin')
    }
  },
  created: function () {
    // Wait for App to load auth before loading this component
    if (!this.loadComponent) {
      StoreHelper.setApiError('MUST DEFINE LOAD COMPONENT METHOD FOR THIS PAGE')
      return
    }
    this.refreshEventHandler = () => { this.loadBase() }
    EventBus.$on(PAGE_DATA_REFRESH_EVENT, this.refreshEventHandler)
  },
  beforeDestroy: function () {
    if (this.refreshEventHandler) {
      EventBus.$off(PAGE_DATA_REFRESH_EVENT, this.refreshEventHandler)
    }
  },
}
</script>

<style scoped>

</style>