import {useRef} from "react";

export const Audio = ({ url, className, text }: { url: string, className: string, text: string }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    return (
        <div>
            <audio ref={audioRef} src={url} />
            <button
                onClick={handlePlay}
                className={className}
            >
                {text}
            </button>
        </div>
    );
};
