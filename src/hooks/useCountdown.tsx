import { useCallback, useEffect, useState } from 'react';

const useCountdown = () => {
    const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);

    const startTimer = useCallback(
        (seconds: number) => {
            setTimeLeft(seconds)
        },
        [],
    )

    const stopTimer = useCallback(
        () => {
            setTimeLeft(undefined)
        },
        [],
    )

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);


    return { timeLeft, startTimer, stopTimer };
};

export { useCountdown };
