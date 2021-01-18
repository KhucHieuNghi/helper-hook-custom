/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react'

interface IProps {
    loadImg: string
    LazyImg: any
    className?: string
    alt?: string
}

const usePicture =  ({loadImg = '', LazyImg = <div />, className}: IProps) => {
    const [img, setImg] = useState<any>(<React.Fragment />)

    const Error = () => {
        usePicture.isFail = true
        if(typeof LazyImg === 'string'){
            setImg(<img src={LazyImg} alt={LazyImg} className={className} />)
        }else{
            setImg(<LazyImg />)
        }
    }

    useEffect(()=> {
        if(img) setImg(<img src={img} alt={img} className={className} onError={Error} />)
    }, [loadImg]) 

    return () => img
}

usePicture.isFail = false

export default usePicture
