import { useCallback, useEffect, useState } from 'react';

const useCountdown = () => {
    const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);

    const startTimer = useCallback(
        (seconds: number) => {
            setTimeLeft(seconds)
            // if (!timeLeft) return;

            // // save intervalId to clear the interval when the
            // // component re-renders
            // const intervalId = setInterval(() => {
            //     setTimeLeft(timeLeft - 1);
            // }, 1000);

            // clear interval on re-render to avoid memory leaks
            // return () => clearInterval(intervalId);
        },
        [],
    )

    const stopTimer = useCallback(
        () => {
            setTimeLeft(undefined)
            // if (!timeLeft) return;

            // // save intervalId to clear the interval when the
            // // component re-renders
            // const intervalId = setInterval(() => {
            //     setTimeLeft(timeLeft - 1);
            // }, 1000);

            // clear interval on re-render to avoid memory leaks
            // return () => clearInterval(intervalId);
        },
        [],
    )



    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return;

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft]);


    return { timeLeft, startTimer, stopTimer };
};

export { useCountdown };
