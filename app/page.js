'use client'

import styles from './page.module.css'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import React, { useState, useRef, useEffect } from "react";

export default function Home() {

  // State variable for the elapsed time in milliseconds
  const [time, setTime] = useState(0);

  // State variable for the timer status (running or stopped)
  const [isRunning, setIsRunning] = useState(false);

  // State variable for the hours to change
  const [changeHours, setChangeHours] = useState(0);

  // State variable for the minutes to change
  const [changeMinutes, setChangeMinutes] = useState(0);

  // State variable for the seconds to change
  const [changeSeconds, setChangeSeconds] = useState(0);

  // Reference variable for the setInterval function
  const intervalRef = useRef();

  // Use effect hook to handle state changes
  useEffect(() => {
    if (isRunning) {
      // Start the timer
      intervalRef.current = setInterval(() => {
        // Increment time by 10 milliseconds
        setTime((prevTime) => prevTime + 10);
      }, 10); // Run every 10 milliseconds
    } else {
      // Stop the timer
      clearInterval(intervalRef.current); // Clear the interval function
    }

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(intervalRef.current);
    };
  }, [isRunning]); // Run only when isRunning changes

  // Function to start or stop the timer based on its status
  const toggleTimer = () => {
    setIsRunning(!isRunning); // Toggle isRunning state variable
  };

  // Function to reset the timer
  const resetTimer = () => {
    setIsRunning(false); // Stop the timer first
    setTime(0); // Reset time to zero
  };

  /* Function to change a custom amount of hours/minutes/seconds to the timer if it is stopped */
  const changeTime = (sign) => {
    if (!isRunning) {
      if (sign === "+") {
        /* If sign is + then add changeHours *3600000 + changeMinutes *60000 + changeSeconds *1000 milliseconds to time */
        setTime((prevTime) => prevTime + (changeHours * 3600000 + changeMinutes * 60000 + changeSeconds * 1000));
      } else if (sign === "-") {
        /* If sign is - then subtract changeHours *3600000 + changeMinutes *60000 + changeSeconds *1000 milliseconds from time */
        setTime((prevTime) => prevTime - (changeHours * 3600000 + changeMinutes * 60000 + changeSeconds * 1000));
      }
    }
  };

  return (
    <div className={styles.page}>
      {
      !isRunning && (
        <div className={styles.clock__addsub_time}>
          <FaPlus onClick={() => changeTime("+")} className={styles.clock__addsubtime__marked} />
          <FaMinus onClick={() => changeTime("-")} />
        </div>
      )
      }
      <div className={styles.clock__container}>
        <div className={styles.clock__time}>
          {
            !isRunning && (
              <input type="number" value={changeHours} onChange={(e) => setChangeHours(e.target.value)} />
            )
          }
          <div className={styles.clock__time_counter}>
            <h1>{new Date(time).getUTCHours()}</h1>
            {/* <h2 className={styles.clock__separator}>:</h2> */}
          </div>
          <h6>Hours</h6>
        </div>
        <div className={styles.clock__time}>
          {
            !isRunning && (
              <input type="number" value={changeMinutes} onChange={(e) => setChangeMinutes(e.target.value)} />
            )
          }
          <div className={styles.clock__time_counter}>
            <h1>{new Date(time).getUTCMinutes()}</h1>
            {/* <h2 className={styles.clock__separator}>:</h2> */}
          </div>
          <h6>Minutes</h6>
        </div>
        <div className={styles.clock__time}>
          {
            !isRunning && (
              <input type="number" value={changeSeconds} onChange={(e) => setChangeSeconds(e.target.value)} />
            )
          }
          
          <h1>{new Date(time).getUTCSeconds()}</h1>
          <h6>Seconds</h6>
        </div>
      </div>
      <div className={styles.clock__buttons}>
        <div onClick={toggleTimer}>{isRunning ? 'STOP' : 'START'}</div>
        <div onClick={resetTimer}>RESET</div>
      </div>
    </div>
  );
}
