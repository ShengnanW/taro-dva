import request from "../utils/request";

export default {
  namespace: 'banner',
  state: {
    banners: []
  },
  reducers: {
    loadBanner(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    * load(action, { call, put }) {
      const stories = yield call(request, {
        url: 'https://zhihu-daily.leanapp.cn/api/v1/before-stories/20190312'
      })
      const result = stories['stories']
      yield put(action("loadBanner", {banners: result}))
    },
  },
}
