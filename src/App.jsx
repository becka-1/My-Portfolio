import { useState, useEffect } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Portfolio from './page/Portfolio';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [introComplete]);

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={() => setIntroComplete(true)} />}
      <Portfolio />
    </>
  );
}

export default App;
