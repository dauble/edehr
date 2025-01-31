<template lang="pug">
  div(class="EhrNavListItem")
    ui-link(:name="routeName(path)", :class="levelClass")
      div(:class="linkClass", class="linkElement columns")
        div(class="column") {{ linkLabel }}
        div(class="column is-1 indicator")
          div(:class="dataIndicatorClass")
          div(v-if="level === 1")
            fas-icon(v-show="opened", class="fa top-level", icon="angle-right")
            fas-icon(v-show="!opened", class="fa top-level", icon="angle-down")
            span &nbsp;
</template>

<script>
import ENList from './EhrNavList'
import UiLink from '../../app/ui/UiLink.vue'
import StoreHelper from '../../helpers/store-helper'

export default {
  name: 'EhrNavListItem',
  components: {
    UiLink,
    ENList
  },
  inject: [ 'pageDataList' ],
  computed: {
    pageInfo () {
      // page data has properties
      // - hasSeed (data),
      // - hasStudent (student data) and
      // - hasMerged (any data)
      let k = this.path.pageDataKey
      let d = this.pageDataList()[k]
      if (!d) {
        if (k) console.log('Missing page in pageInfo listing', k)
        d = {}
      }
      return d
    },
    dataIndicatorClass () {
      let colour = ''
      const NEW_INFO = 'circle green-circle'
      const SEED_INFO = 'circle empty-circle'
      const NONE = ''
      let isSeedEditing = StoreHelper.isSeedEditing()
      let hd = this.pageInfo
      if (isSeedEditing) {
        colour = hd.hasSeed ? NEW_INFO : NONE
      } else {
        colour = hd.hasStudent ? NEW_INFO : hd.hasSeed ? SEED_INFO : NONE
      }
      return colour
    },
    levelClass () {
      let lv = this.level || 1
      let lvClass = 'EhrNavListItem__level' + lv
      let isTopAndActive = this.$store.state.visit.topLevelMenu === this.path.name
      let aClass = isTopAndActive ? ' router-link-active' : ''
      return lvClass + aClass
    },
    linkLabel () {
      return this.path.label
    },
    linkClass () {
      let lv = this.level || 1
      return 'EhrNavListItem__link' + lv
    }
  },
  methods: {
    routeName (path) {
      // console.log('path', path.name)
      return path.redirect ? path.redirect : path.name
    }
  },
  props: {
    path: { type: Object },
    level: { type: Number },
    opened: { type: Boolean }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../scss/definitions';

.indicator {
  justify-content: flex-end;
}
/* Small screens */
@media screen and (max-width: $main-width-threshold1) {
  .indicator {
    float: right;
  }
}

.column {
  padding: 0;
}
.linkElement.columns:last-child {
  margin-bottom: 0;
}
.linkElement:hover {
  background-color: $nav-active;
}
a:hover {
  color: #ffffff;
}
.EhrNavListItem {
  margin-top: 1px;
  &__level1,
  &__level2,
  &__level3 {
    display: flex;
    align-items: center;
  }

  &__level1,
  &__level2 {
    & a {
      color: $grey20;
    }
  }
  .router-link-active {
    background-color: $nav-active;
    color: $white;
  }

  &__level1 {
    color: $nav-color-level1;
    background-color: $nav-level1;
    font-size: 18px;
    height: 40px;
    & a {
      color: $nav-color-level1;
    }
  }

  &__level2 {
    color: $nav-color-level2;
    background-color: $nav-level2;
    min-height: 30px;
    & a {
    }
  }

  &__level3 {
    color: $nav-color-level3;
    background-color: $nav-level3;
    min-height: 30px;
    & a {
      color: $nav-color-level3;
    }
  }

  &__link1 {
    margin-left: 15px;
    & a {
      color: $nav-color-level3;
    }
  }

  &__link2 {
    margin-left: 15px;
  }

  &__link3 {
    margin-left: 30px;
  }

  .linkElement {
    width: 100%;
  }

  .linkLabel {
    width: 90%;
  }

  .circle {
    border-radius: 50%;
    position: relative;
    height: 12px;
    margin-top: 3px;
    width: 12px;
  }

  .empty-circle {
    border: 2px solid $green;
  }

  .green-circle {
    background: $green;
  }

  .top-level {
    color: $green;
  }

  @media screen and (max-width: $main-width-threshold1){
    .circle {
      margin-top: -18px;
    }
    .linkElement {
      width: 90%;
    }

    .EhrNavListItem {
      margin-top: -10px;
    }
  }
}
</style>
