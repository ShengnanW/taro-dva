import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'
// import more from '../../asset/images/more.png'
import './feed.scss'

export default class Feed extends Component {
  navigateTo(url) {
    Taro.navigateTo({url:url})
  }
  render() {
    const {title, image} = this.props
    return (
    <View className='feed-wrapper'>
      <View className='feed-title'>
        <Text>{title}></Text>
      </View>
      <View className='feed-img'>
        <Image src={image}></Image>
      </View>
   </View>
    )
  }
}
