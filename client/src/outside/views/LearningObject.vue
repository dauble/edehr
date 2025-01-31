<template lang="pug">
  div
    div(class="details-action-bar")
      learning-object-list-link(:learningObjectId="learningObject._id")
      learning-object-actions(:learningObject="learningObject", :showDetails='false')
    div(class="details-container card selected")
      div(class="details-row")
        div(class="details-name") {{ text.LOBJ }}
        div(class="details-value") {{learningObject.name}}
      div(class="details-row")
        div(class="details-name") {{ text.DESCRIPTION }}
        div(class="details-value")
          div(v-text-to-html="learningObject.description")
      div(class="details-row")
        div(class="details-name") {{ text.USED }}
        div(class="details-value") {{ text.USED_VAL(learningObject.activityCount) }}
      div(class="details-row")
        div(class="details-name") {{ text.SEED }}
        div(class="details-value")
          ui-link(:name="'seed-view'", :params="{seedId: learningObject.seedDataId}") {{ seed.name }}
      div(class="details-row")
        div(class="details-name") {{ text.DATES }}
        div(class="details-value").
          Created on {{ learningObject.createDate | formatDateTime }}.
          Last modified on {{ learningObject.lastUpdateDate | formatDateTime }}.
</template>

<script>
import UiButton from '@/app/ui/UiButton.vue'
import UiLink from '@/app/ui/UiLink.vue'
import UiConfirm from '@/app/ui/UiConfirm'
import StoreHelper from '@/helpers/store-helper'
import { downObjectToFile } from '@/helpers/ehr-utils'
import { TextLearningObjects } from '@/helpers/ehr-text'
import LearningObjectListLink from '@/outside/components/learning-object/LearningObjectListLink'
import LearningObjectActions from '@/outside/components/learning-object/LearningObjectActions'
import OutsideCommon from '@/outside/views/OutsideCommon'
import { Text } from '@/helpers/ehr-text'

export default {
  extends: OutsideCommon,
  components: { LearningObjectActions, LearningObjectListLink, UiButton, UiConfirm, UiLink },
  data () {
    return {
      text: Text.LOBJ_PAGE,
      isRespondingToError: null,
      isAdmin: false,
      selectedAssignment: {},
      activitiesUsingAssignmentCount: 0
    }
  },
  computed: {
    activity () {
      return this.$store.getters['activityStore/activity']
    },
    assignment () {
      return this.$store.getters['assignmentStore/assignment']
    },
    seed () {
      return this.$store.getters['seedListStore/seedContent']
    },
    cText () { return TextLearningObjects },
    isDevelopingContent () {
      return StoreHelper.isDevelopingContent()
    },
    learningObject () {
      return this.$store.getters['assignmentStore/assignment'] || {}
    },
    learningObjectId () {
      return this.learningObject  ? this.learningObject._id : ''
    },
    assignmentsListing () { return StoreHelper.getAssignmentsList()}
  },

  methods: {
    rowClass () {
      let selected = this.learningObject._id === this.$route.params.assignmentId
      let classString = selected ? 'selected ' : ''
      return `${classString}`
    },
    downloadAll () {
      StoreHelper.loadAssignmentList(this)
        .then((aList) => {
          downObjectToFile('EdEHR-learning-object-list.json', aList)
        })
    },
    findAssignment: function (id) {
      return this.assignmentsListing.find(e => {
        return e._id === id
      })
    },
    showEditDialog: function (event, assignmentId) {
      let assignmentData = Object.assign({}, this.findAssignment(assignmentId))
      this.$refs.theDialog.showDialog(assignmentData)
    },
    showCreateDialog: function () {
      this.$refs.theDialog.showDialog()
    },
    async loadComponent () {
      // TODO look at the following and see if all of those api calls are really needed. Or can we reduce the number by adjusting the API?
      const fromRoute = this.$route.query.learningObjectId
      const fromStore = this.$store.getters['assignmentStore/learningObjectId']
      const learningObjectId = fromRoute ? fromRoute : fromStore
      // console.log('loading learning object view', learningObjectId, fromRoute, fromStore)
      if (!learningObjectId) {
        const msg = 'Loading of learning object requires an id for an object'
        StoreHelper.setApiError(msg)
        return
      }
      // to work with one learning object we need the list so that we can collect all in use external ids
      // TODO once we no long use external ids we can remove the next api call to gain some performance
      await this.$store.dispatch('assignmentListStore/loadAssignmentsWithCounts')
      // load seeds for the edit LObj dialog. The user will need to select from the available seeds
      await this.$store.dispatch('seedListStore/loadSeeds')
      await this.$store.dispatch('assignmentStore/load', learningObjectId)
      const seedId = this.assignment.seedDataId
      await this.$store.dispatch('seedListStore/loadSeedContent', seedId)
    }
  },
}
</script>

