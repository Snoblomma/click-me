import { useCallback, useState, useMemo, useRef, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './App.css';
import Logo from './Logo';
import Sad from './Sad';
import Happy from './Happy';
import ConfettiExplosion from 'react-confetti-explosion';
import { useCountdown } from './hooks/useCountdown';

const prompts = [
  "Please wait just a little longer for the process to complete.",
  "Hold on for a moment longer, it's almost ready.",
  "Just a few more seconds of waiting and it will be worth it.",
  "Don't give up yet, wait a little longer and you'll see the results.",
  "The wait may be long, but the outcome will be worth it.",
  "Have patience and wait a bit longer, it will pay off in the end.",
  "Waiting a little longer will ensure a smoother experience.",
  "Don't rush it, wait a bit longer for optimal performance.",
  "Waiting a little longer will help prevent any errors or issues.",
  "A little extra waiting time will ensure a more secure process.",
  "Hold on just a bit longer for a better user experience.",
  "Waiting a little longer will give you a more accurate result.",
  "Don't cut the process short, wait a bit longer for better efficiency.",
  "Trust the system and wait a little longer for optimal results.",
  "Waiting a bit longer will help you avoid any potential complications.",
  "Be patient and wait a little longer for a smoother operation.",
  "Waiting a bit longer will help you avoid any data loss or corruption.",
  "Don't interrupt the process, wait a bit longer for a successful outcome.",
  "Give it a little more time and you'll see the benefits.",
  "Waiting a little longer will ensure a more seamless integration."
]

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export enum Status {
  notStarted = "notStarted",
  pending = "pending",
  success = "success",
  error = "error"
}

function App() {
  const [status, setStatus] = useState<keyof typeof Status>(Status.notStarted);
  const progressRef = useRef<HTMLDivElement>(null);
  const { timeLeft, startTimer, stopTimer } = useCountdown();

  const onMouseDown = useCallback(
    () => {
      setStatus(Status.pending)
      const randomTiming = randomIntFromInterval(30, 90)
      startTimer(randomTiming)
      progressRef.current?.setAttribute("style", `transition-duration: ${randomTiming}s; width: 100%;`)
    },
    [],
  )

  const onMouseUp = useCallback(
    async () => {
      if (status === Status.pending) {
        if (timeLeft === 0) {
          setStatus(Status.success)
          await timeout(1500);
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', "_blank")
        }
        else {
          setStatus(Status.error)
        }
        stopTimer();
        progressRef.current?.setAttribute("style", "transition-duration: 1s; width: 0%;")
      }
    },
    [status, timeLeft],
  )

  const sequence = useMemo(() => {
    const suffled = shuffleArray(prompts).map((e) => [e, 1500]).flat()
    return [
      "Let's start!",
      2500,
      ...suffled,
      () => {
        console.log('Sequence completed');
      }
    ]
  }, [])

  return (
    <div className="App" onMouseUp={onMouseUp} onTouchEnd={onMouseUp}>
      {status === Status.success &&
        <ConfettiExplosion
          force={0.8}
          duration={3000}
          particleCount={250}
          width={1600}
        />
      }
      <div className="App-content">
        <div className="App-logo" >
          {(status === Status.notStarted || status === Status.pending) &&
            <Logo />
          }
          {status === Status.success &&
            <Happy />
          }
          {status === Status.error &&
            <Sad />
          }
        </div>
        <button className="big-button"
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
        >
          {status === Status.notStarted && 'Click Me'}
          {status === Status.pending && 'Holding...'}
          {(status === Status.success || status === Status.error) && 'Try Again'}
        </button>
        <div className="progress">
          <div className="bar shadow dots" ref={progressRef}>
          </div>
        </div>
        <div style={{ height: '1.5rem', display: 'block', maxWidth: '90%' }}>
          {
            (status === Status.pending && <>
              {timeLeft === 0 ? <span>You can release now ฅ^•ﻌ•^ฅ</span> : <TypeAnimation
                sequence={sequence}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                speed={60}
                deletionSpeed={100}
              />}
            </>)
          }
          {
            status === Status.success && <span>Wow! You are the best! =✪ ᆺ ✪=</span>
          }
          {
            status === Status.error && <span>Try holding on for longer next time ( ب_ب)</span>
          }
        </div>
      </div>
    </div>
  );
}

export default App;