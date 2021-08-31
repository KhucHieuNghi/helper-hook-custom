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