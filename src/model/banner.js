import request from "../utils/request";
import action from "../utils/action";

export default {
  namespace: 'banner',
  state: {
    banners:{}
  },
  reducers: {
    loadBanner(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    * load({payload}, { call, put }) {
      const stories = yield call(request, {
        url: 'https://zhihu-daily.leanapp.cn/api/v1/before-stories/20190312'
      })
      yield put(action("loadBanner", {banner: stories['STORIES']['stories']}))
    },
  },
}
