import { setProjectDetails, getProjectDetails, removeProjectDetails } from '@/utils/storage'

export default {
  state: {
    projectDetails: getProjectDetails()
  },
  mutations: {
    setProjectDetailsInfo(state, projectDetails) {
      state.projectDetails = projectDetails
      setProjectDetails(projectDetails)
    },
    removeProjectDetailsInfo(state, key) {
      removeProjectDetails(key)
    }
  },
  actions: {
    setProjectDetailsInfo(ctx, projectDetails) {
      ctx.commit('setProjectDetailsInfo', projectDetails)
    },
    removeProjectDetailsInfo(ctx, key) {
      ctx.commit('removeProjectDetailsInfo', key)
    },
  }
}