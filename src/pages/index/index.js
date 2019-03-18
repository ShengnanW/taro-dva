import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Input, Image, Swiper, SwiperItem} from '@tarojs/components'
import './index.scss'
import Feed from '../../components/feed/feed'
import Banner from '../../components/banner/banner'
import searchPng from '../../asset/images/search.png'
import lightingPng from '../../asset/images/lighting.png'
import {create} from 'dva-core';
import {connect} from '@tarojs/redux'
import action from '../../utils/action'

@connect(({feeds, loading, banner}) => ({

  ...feeds,
  ...banner,
  isLoad: loading.effects["feeds/load"],
  isLoadMore: loading.effects["feeds/loadMore"],
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount = () => {
    this.props.dispatch(action("banner/load"));
    this.props.dispatch(action("feeds/load"));
  };

  onPullDownRefresh = () => {
    this.props.dispatch(action("feeds/load"));
  };

  onReachBottom = () => {
    this.props.dispatch(action("feeds/loadMore"));
  };

  updateList = () => {
    this.props.dispatch(action("feeds/search",true));
  };

  render() {
    const {newStories, isLoad, isLoadMore, banner} = this.props;
    const list = newStories['STORIES']['stories']
    // console.log(this.props)
    return (
      <View>
        <View><Banner bannerData={banner}></Banner></View>
        {/* <View className='search flex-wrp'>
          <View className='search-left flex-item'>
            <View className='flex-wrp'>
              <View className='flex1'><Image src={searchPng}></Image></View>
              <View className='flex6'><Input type='text' placeholder={'搜索话题, 问题或人'}
                                             placeholderClass='search-placeholder'/></View>
            </View>
          </View>
          <View className='search-right flex-item'>
            <Image onClick={this.updateList} src={lightingPng}></Image>
          </View>
    </View>*/}
        <View className='container'>
          {
            list.length ?
              list.map(item => {
                return <Feed
                  key={item.id}
                  image={item.images[0]}
                  title={item.title}
                />
              }) :
              isLoad ? <View>加载中...</View> : <View>没有数据</View>
          }
          {
            isLoadMore && <View>加载中...</View>
          }
        </View>
      </View>
    )
  }
}

