import { useState } from 'react';
import './App.scss';

const App = () => {
  const [timerStatus, setTimerStatus] = useState('Start');

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const handleTimer = (e) => {
    if (timerStatus === 'Start') {
      setTimerStatus('Stop');
      setInterval(() => {
        setSecond(second - 1);
        if (second < 0) {
          clearInterval();
        }
      }, 1000);
    } else {
      setTimerStatus('Start');
    }
  }

  return (
    <div className="App">
      <>
        <input 
          type='text' 
          id='timer-hr-input' 
          className='timer-section'
          value={hour}
          onChange={e => setHour(parseInt(e.target.value))}
        />
        <label htmlFor='timer-hr-input'>hr</label>
        <input 
          type='text' 
          id='timer-min-input' 
          className='timer-section' 
          value={minute}
          onChange={e => setMinute(parseInt(e.target.value))}
        />
        <label htmlFor='timer-min-input'>min</label>
        <input 
          type='text'
          id='timer-sec-input' 
          className='timer-section' 
          value={second}
          onChange={e => setSecond(parseInt(e.target.value))}
        />
        <label htmlFor='timer-sec-input'>sec</label>
        <button type='button' onClick={handleTimer}>{timerStatus}</button>
        <button type='button'>Reset</button>
      </>
      <div className='countdown-timer'>Timer</div>
      <>
        <span>{hour}</span>hr
        <span>{minute}</span>min
        <span>{second}</span>sec
      </>
    </div>
  );
}

export default App;
