'use client'

import {
    memo,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import Image, { ImageProps } from 'next/image'

type ReactImageProps = {
    src: string
    alt: string
    width?: number
    height?: number
    defaultSrc?: string
    fetchPriority?: 'high' | 'low' | 'auto'
    isCenter?: boolean
    className?: string
    imgClassName?: string
    showImgGrid?: boolean
} & ImageProps

const ImageContainer = memo(
    ({
        children,
        isCenter,
        showImgGrid,
        className,
    }: {
        children: ReactNode
        isCenter: boolean
        showImgGrid?: boolean
        className?: string
    }) => {
        const memoizedChildren = useMemo(() => {
            return (
                <>
                    {showImgGrid && (
                        <span className={`img-size w-full ${className}`}>
                            {children}
                        </span>
                    )}
                    {!showImgGrid && <>{children}</>}
                </>
            )
        }, [showImgGrid, children, className])

        if (!isCenter) {
            return <>{memoizedChildren}</>
        }

        return (
            <span className="w-full flex justify-center">
                {memoizedChildren}
            </span>
        )
    }
)

ImageContainer.displayName = 'ImageContainer'

const ReactImage = ({
    src = '',
    alt,
    width,
    height,
    fetchPriority = 'auto',
    defaultSrc = '/images/placeholder.png',
    isCenter = false,
    className = '',
    imgClassName = '',
    showImgGrid = false,
    ...props
}: ReactImageProps) => {
    const [imgSrc, setImgSrc] = useState(src)

    const handleImageError = useCallback(() => {
        setImgSrc(defaultSrc)
    }, [defaultSrc])

    useEffect(() => {
        setImgSrc(src)
    }, [src])

    return (
        <ImageContainer
            key={imgSrc}
            isCenter={isCenter}
            showImgGrid={showImgGrid}
            className={className}
        >
            <Image
                {...props}
                key={imgSrc} // Forces re-render on src change
                src={imgSrc}
                alt={alt}
                fetchPriority={fetchPriority}
                priority
                quality={100}
                width={width}
                height={height}
                {...(showImgGrid
                    ? {
                          sizes: '100% 100%',
                      }
                    : {})}
                className={imgClassName}
                onError={handleImageError} // Fallback to default image on error
            />
        </ImageContainer>
    )
}
ReactImage.displayName = 'ReactImage'

export default ReactImage
