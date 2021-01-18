/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, FunctionComponent} from 'react'

interface IProps {
    loadImg: string
    LazyImg:  FunctionComponent
    alt: string 
    className?: string
    isBase64?: boolean
}
const templateBase64 ='data:image/jpeg;base64,';

const usePicture =  ({loadImg = '', LazyImg = () => <div />, className = '', alt, isBase64 = false}: IProps): FunctionComponent => {
    const [img, setImg] = useState<any>(<LazyImg />)
    
    const Error = () => {
        usePicture.isFail = true
        if(typeof LazyImg === 'string'){
            const src = isBase64 ? `${templateBase64} ${loadImg}` : loadImg
            setImg(<img src={src} alt={LazyImg} className={className} />)
        }
    }
    
    useEffect(()=> {
        if(loadImg) {
            const src = isBase64 ? `${templateBase64}${loadImg}` : loadImg
            setImg(<img src={src} alt={alt} className={className} onError={Error} />)
        }
    }, [loadImg]) 

    return () => img
}

usePicture.isFail = false

export default usePicture
