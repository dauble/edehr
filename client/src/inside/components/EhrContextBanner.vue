<template lang="pug">
  div(class="ehr-context-banner")
    div(v-if='isEhrOnlyDemo')
      div {{ehrOnlyDemoText.ehrContextBannerTitle}}
      ehr-sim-time(:ehr-data="md")
      ui-button(v-on:buttonClicked="downloadEhrOnlyData")
        fas-icon(class="fa", :icon="appIcons.download")
        span Download Data

    div(v-else)
      ehr-context-banner-header(@showChanged="(showVal) => show = showVal")
</template>

<script>
import EhrContextBannerHeader from '@/inside/components/EhrContextBannerHeader'
import UiButton from '@/app/ui/UiButton'
import UiLink from '@/app/ui/UiLink'
import StoreHelper from '@/helpers/store-helper'
import EhrOnlyDemo from '@/helpers/ehr-only-demo'
import { APP_ICONS } from '@/helpers/app-icons'
import { ehrOnlyDemoText } from '@/appText'
import EhrSimTime from '@/inside/components/EhrSimTime'
import { downloadEhrOnlyToFile } from '@/helpers/ehr-utils'

export default {
  name: 'EhrContextBanner',
  components: { UiButton, EhrSimTime, EhrContextBannerHeader, UiLink },
  data: function () {
    return {
      show: false,
      appIcons: APP_ICONS,
      ehrOnlyDemoText: ehrOnlyDemoText
    }
  },
  computed: {
    md () { return StoreHelper.getMergedData() },
    isEhrOnlyDemo () {
      return EhrOnlyDemo.isActiveEhrOnlyDemo()
    },
    showStudent () {
      return StoreHelper.isStudent()
    },
    showInstructor () {
      return StoreHelper.isInstructor() && !StoreHelper.isSeedEditing()
    },
    showSeeding () {
      return StoreHelper.isSeedEditing()
    },
  },
  methods: {
    downloadEhrOnlyData () {
      let data = StoreHelper.getMergedData()//.ehrData
      downloadEhrOnlyToFile(data)
    }
  },
  mounted: function () {
    if (StoreHelper.isInstructor(this)){
      this.show = true
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/definitions';
.ehr-context-banner {
  background-color: $brand-primary-light;
  padding: 0 1rem;
  border-top: 1px solid $grey40;
}
</style>
