import Taro from '@tarojs/taro'
import action from "../utils/action";
import request from "../utils/request";
import delay from "../utils/delay";

export default {
  namespace: 'feeds',
  state: {
    newStories:{},
    oldStoriesList:[]
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
    saveMore(state, {payload}) {
      state.oldStoriesList.push(payload)
      return {...state};
    },
  },
  effects: {
    * search(_, {all, call, put}) {
      Taro.showLoading({
        title: '搜索中...',
      });
      try {
        let loadPro = yield put(action("load"));
        yield call(() => loadPro);
      } finally {
        Taro.hideLoading();
      }
    },
    * load({payload}, {all, call, put}) {
      let data = yield call(request, {
        url: 'https://zhihu-daily.leanapp.cn/api/v1/last-stories'
      });
      // yield call(delay, 2000);//增加延迟测试效果
      yield put(action("save", {newStories: data}))
    },
    * loadMore({payload}, {all, call, put}) {
      const date = new Date().toLocaleString()
      let dateStr = date.slice(0,date.indexOf(' ')).replace(/\//g,'')
      dateStr = (dateStr.length === 7)? dateStr.slice(0,4)+'0'+dateStr.slice(4) : dateStr
      dateStr = (dateStr.length === 6)? dateStr.slice(0,6)+'0'+dateStr.slice(6) : dateStr
      // 这里还有细节需要完善，日期转换没有考虑十月以后月初
      const oldDate = (parseInt(dateStr)-payload).toString()
      let data = yield call(request, {
        url: `https://zhihu-daily.leanapp.cn/api/v1/before-stories/${oldDate}`

      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("saveMore", {STORIES: data['STORIES']}))
    },
  },
};
