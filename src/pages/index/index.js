import Taro, {Component, hideLoading} from '@tarojs/taro'
import {View, ScrollView, Input, Image, Swiper, SwiperItem} from '@tarojs/components'
import './index.scss'
import Feed from '../../components/feed/feed'
import Banner from '../../components/banner/banner'
import {connect} from '@tarojs/redux'
import action from '../../utils/action'

@connect(({feeds, banner, loading}) => ({

  ...feeds,
  ...banner,
  isLoad: loading.effects["feeds/load"],
  isLoadMore:loading.effects["feeds/loadMore"]
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
  };

  constructor() {
    super(...arguments);
    this.state={
      dataCount:0,
    }
  }

  componentDidMount = () => {
    this.props.dispatch(action("banner/load"));
    this.props.dispatch(action("feeds/load"));
  };

  onPullDownRefresh = () => {
    this.props.dispatch(action("feeds/load"));
  };

  onReachBottom = () => {
    const {dataCount} = this.state
    this.props.dispatch(action("feeds/loadMore", dataCount));
    this.setState({dataCount: dataCount+1})
  };

  updateList = () => {
    this.props.dispatch(action("feeds/search",true));
  };

  render() {
    const {newStories, isLoadMore,isLoad,banner, oldStoriesList} = this.props;
    let list = []
    let feedList =[]
    if(JSON.stringify(newStories)!=='{}' && !isLoad){
      list = newStories['STORIES']['stories']
    }
    return (
      <View>
        <View><Banner bannerData={banner}></Banner></View>
        <View className='hot-today'>今日热闻</View>
        <View className='container'>
          {
            list.length ?
              list.map(item => {
                return <Feed
                  key={item.id}
                  image={item.images[0]}
                  title={item.title}
                />
              }) : <View>加载中...</View>
          }
          {
            isLoadMore && <View>加载中...</View>
          }
           {
             oldStoriesList.length >0 ?
             oldStoriesList.map(item => {
               const storyItem = item['STORIES']
              feedList = storyItem['stories']
              console.log(feedList)
                return(
                  <View key={storyItem.date}>
                  <View className='storiesDate'>{storyItem.date}</View>
                  {
                    feedList.map(feedItem => {
                      return <Feed
                      key={feedItem.id}
                      image={feedItem.images[0]}
                      title={feedItem.title}
                />
                    })
                  }
                  </View>
                )
             }) : ''
           }
        </View>
      </View>
    )
  }
}

