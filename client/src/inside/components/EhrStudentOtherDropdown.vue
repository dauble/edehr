<template lang='pug'>
  div
    app-dropdown(:items="items")
      template(#dropdownTitle)
        slot
    ehr-context-activity-dialog(ref='activityDialog')
    ehr-scratch-pad-dialog(ref='scratchPad')
</template>

<script>
import AppDropdown from '@/app/components/app-dropdown/AppDropdown'
import EhrScratchPadDialog from '@/inside/components/EhrScratchPadDialog'
import EhrContextActivityDialog from '@/inside/components/EhrContextActivityDialog'
import UiConfirm from '@/app/ui/UiConfirm'
import StoreHelper from '@/helpers/store-helper'
export default {
  components: {
    AppDropdown, EhrContextActivityDialog, EhrScratchPadDialog, UiConfirm
  },
  computed: {
    items () {
      return [
        {
          label: 'Activity information',
          toolTip: 'See details about the assigned activity.',
          callback: () => this.$refs.activityDialog.showDialog(),
          icon: 'book-open'
        },
        {
          label: 'Scratch pad',
          toolTip: 'A place for you to place notes. This is visible only to you.',
          callback: () => this.$refs.scratchPad.showDialog(),
          icon: 'pen'
        },
        {
          label: 'Exit to LMS',
          toolTip: 'Return to your school\'s learning management system. ' + StoreHelper.lmsName() + ' ' + StoreHelper.lmsUrl(),
          callback: () => {
            StoreHelper.exitToLms()
          },
          icon: 'sign-out-alt'
        }
      ]
    },
  },
}
</script>

<style lang='scss' scoped>
@import '../../scss/definitions';
</style>
