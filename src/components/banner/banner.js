import Taro, {Component } from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import './banner.scss'

export default class Banner extends Component{
  navigateTo(url) {
    Taro.navigateTo({url:url})
  }
  render() {
    const {bannerData} = this.props
    console.log(bannerData)
    return (
      <Swiper
        className='activity'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay>
        {
          bannerData.length ?
          bannerData.map((item,index) =>( <SwiperItem key={index}>
             <Image mode='widthFix' src={item['images'][0]} width='355' height='375' />
          </SwiperItem>)) : <View>加载中...</View>
        }
      </Swiper>
    )
  }
}
