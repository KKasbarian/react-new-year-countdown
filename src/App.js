import { useEffect, useState } from 'react';
import './App.css';
import './countdown-styles.css';

const App = () => {

  return (
    <div className='countdown-container'>
      <Countdown />
    </div>
  );
}

const Countdown = () => {

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();

    const difference = +new Date(`01/01/${year + 1}`) - +new Date();
    
    let timeLeft = {};

    if (difference > 0) {
      let dayFormatting = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeLeft = {
        days: (dayFormatting < 100) ? ('0' + dayFormatting).slice(-2) : dayFormatting,
        hours: ('0' + Math.floor((difference / (1000 * 60 * 60)) % 24 ) ).slice(-2),
        minutes: ('0' + Math.floor((difference / 1000 / 60) % 60 ) ).slice(-2),
        seconds: ('0' + Math.floor((difference / 1000) % 60) ).slice(-2)
      };
    }

    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if ( !timeLeft[interval] ) {
      timerComponents.push(
        <div className='interval-container'>
          <span key={interval} className='interval-num'>
            {timeLeft[interval]}
          </span><br></br>
          <span className='interval-name'>{interval}</span>
        </div>
      );
    } else {
      timerComponents.push(
        <div className='interval-container'>
          <span key={interval} className='interval-num'>
            {timeLeft[interval]}
          </span><br></br>
          <span className='interval-name'>{interval}</span>
        </div>
      );
    }

  });


  return (
    <div className='countdown-content'>
      <h2 className='countdown-title'>2023 Countdown</h2>
      {timerComponents.length ? timerComponents : <div className='interval-container interval-finished'><span>Happy New Year</span></div>}
    </div>
  );
}

export default App;
