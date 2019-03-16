import Taro, {Component } from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import './banner.scss'

export default class Banner extends Comment{
  navigateTo(url) {
    Taro.navigateTo({url:url})
  }
  render() {
    const {title, image} = this.props
    return (
    )
  }
}
