import './App.css';
import Line from './components/Line/Line';
import { useEffect } from 'react';

window.currentTime = 0;

window.nextIndex = function(){
  window.dispatchEvent(new window.CustomEvent('onTimeChange', { detail: {currentTime: window.currentTime + 1000} }));
  window.currentTime += 1000;
}


const lyrics = [
  {
    targetTime: 1000,
    text: "All I could do, I've done",
  },
  {
    targetTime: 2000,
    text: "Down every road I've run",
  },
  {
    targetTime: 3000,
    text: "Just tryna find someone, but",
  },
  {
    targetTime: 4000,
    text: "I did it all for nothing",
  },
  {
    targetTime: 5000,
    text: "Looked for the fire that burnt",
  },
  {
    targetTime: 6000,
    text: "Held out so much hope it hurt",
  },
  {
    targetTime: 7000,
    text: "They're not mistakes, I've learnt",
  },
  {
    targetTime: 8000,
    text: "When it comes to love, I'm searching for",
  }
];

function App() {

  useEffect(() => {
    setInterval(() => {
      window.nextIndex();
    }, 1000);
  }, []);


  return (
    <div className="App">
      <div className="lyric-holder">
        {
          lyrics.map((item, index) => {
              return (
                <Line text={item.text}
                      index={index}
                      targetTime={item.targetTime}
                      key={index}/>
              );
          })
        }
      </div>
    </div>
  );
}

export default App;
