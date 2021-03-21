import { useEffect, useState } from 'react';
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
    if (timerStatus === 'Stop') {
      timerInterval = setInterval(() => {
        if (second > 0) {
          setSecond(second => second - 1);
        }
        if (second === 0) {
          if (minute === 0) {
            clearInterval(timerInterval);
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
      setTimerStatus('Stop');
    } else {
      setTimerStatus('Start');
    }
  }

  const handleResetTimer = () => {
    setTimerStatus('Stop');
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
      <>
        <input 
          type='number' 
          id='timer-hr-input' 
          className='timer-section'
          value={initialHour}
          onChange={e => handleChange(e, 'hour')}
        />
        <label htmlFor='timer-hr-input'>hr</label>
        <input 
          type='number' 
          id='timer-min-input' 
          className='timer-section' 
          value={initialMinute}
          onChange={e => handleChange(e, 'minute')}
        />
        <label htmlFor='timer-min-input'>min</label>
        <input 
          type='number'
          id='timer-sec-input' 
          className='timer-section' 
          value={initialSecond}
          onChange={e => handleChange(e, 'second')}
        />
        <label htmlFor='timer-sec-input'>sec</label>
        <button type='button' onClick={handleTimer}>{timerStatus}</button>
        <button type='button' onClick={handleResetTimer}>Reset</button>
      </>
      <div className='countdown-timer'>
        <span>{hour}</span>hr
        <span>{minute}</span>min
        <span>{second}</span>sec
      </div>
    </div>
  );
}

export default App;
