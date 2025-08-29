import Image, {ImageProps, StaticImageData} from 'next/image';
import { useEffect, useState } from 'react';

interface DynamicImageProps extends Omit<ImageProps, 'onError'> {
    fallbackSrc: string;
    blurDataURL?: string;
    loadingPlaceholder?: React.ReactNode; // Optional custom loading UI
}

export const DynamicImage = ({
                                 src,
                                 fallbackSrc,
                                 alt,
                                 blurDataURL,
                                 loadingPlaceholder = null,
                                 ...props
                             }: DynamicImageProps) => {
    const [imgSrc, setImgSrc] = useState<string | StaticImageData | null>(
        typeof src === 'string' && typeof window === 'undefined' ? fallbackSrc : null
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof src !== 'string') {
            // @ts-ignore
            setImgSrc(src);
            setIsLoading(false);
            return;
        }

        let isMounted = true;

        const checkImage = async () => {
            try {
                const res = await fetch(src, { method: 'HEAD' });
                if (isMounted) {
                    setImgSrc(res.ok ? src : fallbackSrc);
                }
            } catch {
                if (isMounted) {
                    setImgSrc(fallbackSrc);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        checkImage();

        return () => {
            isMounted = false;
        };
    }, [src, fallbackSrc]);

    if (isLoading) {
        return <>{loadingPlaceholder}</>; // Optional placeholder, or null
    }

    if (!imgSrc) {
        return null; // Optional: render fallback image here if you prefer
    }

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt}
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
            onError={() => setImgSrc(fallbackSrc)}
        />
    );
};
