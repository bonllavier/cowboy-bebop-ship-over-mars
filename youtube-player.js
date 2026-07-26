(() => {
  const VIDEO_ID = 'nCGNJgpiRQA';
  const projectionElement =
    document.querySelector(
      '#terrain-video-projection',
    );
  const playerElement =
    document.querySelector(
      '#youtube-player',
    );
  const visibilityToggle =
    document.querySelector(
      '#youtube-visibility-toggle',
    );

  if (
    !projectionElement ||
    !playerElement
  ) {
    return;
  }

  let mainPlayer = null;
  let projectionPlayer = null;
  let projectionReady = false;
  let syncTimer = null;
  const mobileProjectionQuery =
    window.matchMedia(
      '(max-width: 600px)',
    );

  function hideProjection() {
    projectionElement.classList.remove(
      'is-active',
    );

    if (
      projectionReady &&
      projectionPlayer
    ) {
      projectionPlayer.pauseVideo();
    }

    if (syncTimer) {
      window.clearInterval(syncTimer);
      syncTimer = null;
    }
  }

  function syncProjection() {
    if (
      !mainPlayer ||
      !projectionPlayer ||
      !projectionReady
    ) {
      return;
    }

    const mainTime =
      mainPlayer.getCurrentTime();
    const projectionTime =
      projectionPlayer.getCurrentTime();

    if (
      Math.abs(
        mainTime - projectionTime,
      ) > 0.6
    ) {
      projectionPlayer.seekTo(
        mainTime,
        true,
      );
    }
  }

  function showProjection() {
    if (
      mobileProjectionQuery.matches ||
      visibilityToggle?.checked === false
    ) {
      hideProjection();
      return;
    }

    if (
      !mainPlayer ||
      !projectionPlayer ||
      !projectionReady
    ) {
      return;
    }

    projectionPlayer.mute();
    projectionPlayer.seekTo(
      mainPlayer.getCurrentTime(),
      true,
    );
    projectionPlayer.playVideo();
    projectionElement.classList.add(
      'is-active',
    );

    if (!syncTimer) {
      syncTimer =
        window.setInterval(
          syncProjection,
          1500,
        );
    }
  }

  function handleMainState(event) {
    const state =
      window.YT.PlayerState;

    if (event.data === state.PLAYING) {
      showProjection();
    } else if (
      event.data === state.PAUSED ||
      event.data === state.ENDED ||
      event.data === state.CUED
    ) {
      hideProjection();
    }
  }

  window.onYouTubeIframeAPIReady =
    () => {
      mainPlayer =
        new window.YT.Player(
          'main-youtube-player',
          {
            events: {
              onStateChange:
                handleMainState,
            },
          },
        );

      projectionPlayer =
        new window.YT.Player(
          'terrain-youtube-player',
          {
            videoId: VIDEO_ID,
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
            },
            events: {
              onReady: (event) => {
                projectionReady = true;
                event.target.mute();

                if (
                  mainPlayer &&
                  mainPlayer.getPlayerState() ===
                    window.YT.PlayerState
                      .PLAYING
                ) {
                  showProjection();
                }
              },
            },
          },
        );
    };

  const apiScript =
    document.createElement('script');
  apiScript.src =
    'https://www.youtube.com/iframe_api';
  apiScript.async = true;
  document.head.append(apiScript);

  visibilityToggle?.addEventListener(
    'change',
    () => {
      const visible =
        visibilityToggle.checked;

      playerElement.classList.toggle(
        'is-hidden',
        !visible,
      );

      if (!visible) {
        hideProjection();
        mainPlayer?.pauseVideo();
      }
    },
  );

  mobileProjectionQuery.addEventListener(
    'change',
    () => {
      if (mobileProjectionQuery.matches) {
        hideProjection();
      } else if (
        mainPlayer &&
        mainPlayer.getPlayerState() ===
          window.YT?.PlayerState?.PLAYING
      ) {
        showProjection();
      }
    },
  );
})();
