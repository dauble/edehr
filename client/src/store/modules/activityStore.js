import InstoreHelper from '@/store/modules/instoreHelper'
import StoreHelper from '@/helpers/store-helper'
import { Text } from '@/helpers/ehr-text'
const API = 'activities'
const OBJ = 'activity'

const state = {
  activity: {},
  activityId: ''
}

const getters = {
  activity: state => state.activity,
  courseTitle: state => state.activity.context_title,
  activityId: state => state.activityId,
  activityTitle: state => state.activity.resource_link_title,
  activityDescription: state => state.activity.resource_link_description,
}

const actions = {
  initialize: function ({ commit }) {
    commit('initialize')
  },
  close ({dispatch, commit}, id) {
    let url = 'close-activity/' + id
    let payload = { url: url, data: {} }
    return dispatch('put', payload)
  },
  open ({dispatch, commit}, id) {
    let url = 'open-activity/' + id
    let payload = { url: url, data: {} }
    return dispatch('put', payload)
  },

  loadAsCurrentActivity ({dispatch, commit}, id) {
    return dispatch('get',id)
      .then( (results) => {
        commit('set', results)
        return results
      })
  },

  get (context, id) {
    let url = 'get/' + id
    return InstoreHelper.getRequest(context, API, url).then(response => {
      let results = response.data[OBJ]
      if (!results) {
        let msg = Text.GET_ACTIVITY_STORE_ERROR(id)
        StoreHelper.setApiError(msg)
        return
      }
      return results
    })
  },
  put (context, payload) {
    let url = payload.url
    let data = payload.data
    return InstoreHelper.putRequest(context, API, url, data).then(response => {
      let results = response.data
      context.commit('set', results)
      return results
    })
  },
}

const ACTIVITY_LOCAL_STORE ='ACTIVITY_LOCAL_STORE'
const mutations = {
  initialize: function (state) {
    // if stored get the activityId. Once it is in place a page load can request the activity data
    const activityId = localStorage.getItem(ACTIVITY_LOCAL_STORE)
    if (activityId) {
      state.activityId = activityId
    }
  },
  set: (state, data) => {
    // transfer the db id to the field we use
    state.activityId = data._id
    // This id needs to survive a browser refresh
    localStorage.setItem(ACTIVITY_LOCAL_STORE, state.activityId)
    state.activity = data
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
