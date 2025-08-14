export function setupAutoLogout(callback, timeout = 5 * 60 * 1000) {
    let timer;
    const events = ["mousemove", "keydown", "click", "scroll"];
    
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(callback, timeout);
    };
  
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    resetTimer(); // Start the timer
  }