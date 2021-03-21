import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import './App.scss';

const App = () => {
  const [timerStatus, setTimerStatus] = useState('Start');

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const [initialHour, setInitialHour] = useState(0);
  const [initialMinute, setInitialMinute] = useState(0);
  const [initialSecond, setInitialSecond] = useState(0);

  useEffect(() => {
    let timerInterval = null;
    if (timerStatus === 'Pause') {
      timerInterval = setInterval(() => {
        if (second > 0) {
          setSecond(second => second - 1);
        }
        if (second === 0) {
          if (minute === 0) {
            if (hour === 0) {
              clearInterval(timerInterval);
            }
            if (hour > 0) {
              setHour(hour - 1);
              setMinute(59);
              setSecond(59);
            }
          } 
          if (minute > 0) {
            setMinute(minute - 1);
            setSecond(59);
          } 
        }
      }, 1000);
    } 
    return () => {
      clearInterval(timerInterval);
    }
  }, [timerStatus, second, minute, hour])

  const handleTimer = () => {
    if (timerStatus === 'Start') {
      setTimerStatus('Pause');
    } else {
      setTimerStatus('Start');
    }
  }

  const handleResetTimer = () => {
    setTimerStatus('Start');
    setHour(0);
    setMinute(0);
    setSecond(0);
    setInitialSecond(0);
    setInitialMinute(0);
    setInitialHour(0);
  }

  const handleChange = (e, timeType) => {
    const timeVal = parseInt(e.target.value);
    switch (timeType) {
      case 'second': 
        setSecond(timeVal);
        setInitialSecond(timeVal);
        break;
      case 'minute': 
        setMinute(timeVal);
        setInitialMinute(timeVal);
        break;
      case 'hour':
        setHour(timeVal);
        setInitialHour(timeVal);
        break;
      default:
        return;
    }
  }

  return (
    <div className="App">
      <div className='set-timer-panel'>
        <input 
          type='number' 
          min='0'
          id='timer-hr-input' 
          className='timer-section'
          value={initialHour}
          onChange={e => handleChange(e, 'hour')}
        />
        <label htmlFor='timer-hr-input'>h</label>
        <input 
          type='number' 
          min='0'
          max='59'
          id='timer-min-input' 
          className='timer-section' 
          value={initialMinute}
          onChange={e => handleChange(e, 'minute')}
        />
        <label htmlFor='timer-min-input'>m</label>
        <input 
          type='number'
          min='0'
          max='59'
          id='timer-sec-input' 
          className='timer-section' 
          value={initialSecond}
          onChange={e => handleChange(e, 'second')}
        />
        <label htmlFor='timer-sec-input'>s</label>
        <div className='button-panel'>
          <Button variant="contained" color="primary" className='primary' onClick={handleTimer}>{timerStatus}</Button>
          <Button variant="contained" color="second" className='second' onClick={handleResetTimer}>Reset</Button>
        </div>
      </div>
      <div className='countdown-timer'>
        <span className='countdown-number'>{hour < 10 ? `0${hour}` : hour}</span>
        <span className='number-divider'>:</span>
        <span className='countdown-number'>{minute < 10 ? `0${minute}` : minute}</span>
        <span className='number-divider'>:</span>
        <span className='countdown-number'>{second < 10 ? `0${second}` : second}</span>
      </div>
    </div>
  );
}

export default App;
