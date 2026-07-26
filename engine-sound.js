(() => {
  const engineSound =
    document.querySelector(
      '#engine-sound',
    );

  if (!(engineSound instanceof HTMLAudioElement)) {
    return;
  }

  engineSound.volume = 0.28;

  const unlockEvents = [
    'pointerdown',
    'touchstart',
    'keydown',
  ];

  function removeUnlockListeners() {
    for (const eventName of unlockEvents) {
      window.removeEventListener(
        eventName,
        startEngineSound,
      );
    }
  }

  async function startEngineSound() {
    try {
      await engineSound.play();
      removeUnlockListeners();
    } catch {
      // Autoplay remains blocked until the browser
      // receives a valid user interaction.
    }
  }

  for (const eventName of unlockEvents) {
    window.addEventListener(
      eventName,
      startEngineSound,
      {
        passive: true,
      },
    );
  }

  startEngineSound();
})();
