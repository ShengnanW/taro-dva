

export async function getBanners(bannerNames) {
  let result
  try {
    result = await get('/status/vip/banners', {
      bannerNames: bannerNames.join(','),
      locale: LOCALE,
    })
  } catch (error) {
    // banner 接口挂掉时返回不显示banner的结果
    result = {}
    bannerNames.forEach(name => {
      result[name] = { hasBanner: false }
    })
  }

  return result
}
