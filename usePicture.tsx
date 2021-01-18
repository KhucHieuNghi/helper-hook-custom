/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect, FunctionComponent} from 'react'

interface IProps {
    loadImg: string
    LazyImg:  FunctionComponent
    alt: string 
    className?: string
}

const usePicture =  ({loadImg = '', LazyImg = () => <div />, className}: IProps): FunctionComponent => {
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
