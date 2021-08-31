// max-width: 320px (điện thoại di động, hiển thị chiều dọc)
// max-width: 480px (điện thoại di động, hiển thị chiều ngang)
// max-width: 600px (máy tính bảng, hiển thị chiều dọc)
// max-width: 800px (máy tính bảng, hiển thị chiều ngang)
// max-width: 768px (máy tính bảng loại to, hiển thị chiều dọc)
// max-width: 1024px (máy tính bảng loại to, hiển thị chiều ngang)
// min-width: 1025px (từ size này trở lên là danh cho desktop thông thường).

// Bootstrap 4
// // Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) { ... }

// // Medium devices (tablets, 768px and up)
// @media (min-width: 768px) { ... }

// // Large devices (desktops, 992px and up)
// @media (min-width: 992px) { ... }

// // Extra large devices (large desktops, 1200px and up)
// @media (min-width: 1200px) { ... }

// @media not|only mediatype and (media feature) {
//     CSS-Code;
// }
// all: Dùng cho mọi thiết bị
// print: Dùng cho máy in
// screen: Dùng cho máy tính và các thiết bị smart phone
// Và media featured thì gồm các thuộc tính sau:

// aspect-ratio: Tỉ lệ giữa chiều rộng và chiều cao của viewport
// min-aspect-ratio: Tỉ lệ tối thiểu giữa chiều rộng và chiều cao của viewport
// max-aspect-ratio: Tỉ lệ tôi đa giữa chiều rộng và chiều cao của viewport
// color: Số bits cho mỗi màu sắc của device
// color-index: Số lượng màu sắc mà device có thể hiển thị
// device-aspect-ratio: Tỉ lệ giữa chiều rộng và chiều cao của device
// max-device-aspect-ratio: Tỉ lệ tối đa giữa chiều rộng và chiều cao của device
// min-device-aspect-ratio: Tỉ lệ tối thiểu giữa chiều rộng và chiều cao của device
// device-height: Chiều cao của device
// device-width: Chiều rộng của device
// height: Chiều cao của viewport
// width: Chiều rộng của viewport
// max-width: Chiều rộng tối đa của viewport
// min-width: Chiều rộng tối thiểu của viewport
// max-height: Chiều cao tối đa của viewport
// min-height: Chiều cao tối thiểu của viewport
// min-device-width: Chiều rộng tối thiểu của device
// max-device-width: Chiều rộng tối đa của device
// min-device-height: Chiều cao tối thiểu của device
// max-device-height: Chiều cao tối đa của device
// orientation: Định hướng của khung nhìn (xoay hoặc không xoay thiết bị)
// resolution: Độ phân giải của thiết bị đầu ra (sử dụng dpi hoặc dpcm)


import { useState, useEffect } from 'react'

const getScreenWidth = () => {
  if (typeof window === 'undefined') return undefined
  return window.innerWidth
}

const getIsMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

const getIsLargeMobile = () => {
  return (
    typeof window !== 'undefined' &&
    window.innerWidth >= 768 &&
    window.innerWidth < 1112
  )
}

const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState<undefined | number>(
    getScreenWidth,
  )
  const [isMobile, setIsMobile] = useState(getIsMobile())
  const [isLargeMobile, setIsLargeMobile] = useState(getIsLargeMobile())

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(getScreenWidth())
      setIsMobile(getIsMobile())
      setIsLargeMobile(getIsLargeMobile())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    isMobile,
    isLargeMobile,
    screenWidth,
  }
}

const useGetIsMobile = (isMobileSsr: boolean, isMobileCsr: boolean) => {
    const [isMobile, setIsMobile] = useState(isMobileSsr)
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setIsMobile(isMobileCsr)
      } else {
        setIsMobile(isMobileSsr)
      }
    }, [isMobileCsr])
  
    return isMobile
  }

export { useScreenSize, useGetIsMobile }
