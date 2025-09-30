  function updateCursorPosition(customCursor, overlayRect, event) {
            var x = event.clientX - overlayRect.left; 
            var y = event.clientY - overlayRect.top; 
            customCursor.style.left = x + 'px';
            customCursor.style.top = y + 'px';
        }

        function toggleMuteUnmute(player) {
            globalMuteState = !globalMuteState; 
            players.forEach(function(p) {
                p.setVolume(globalMuteState ? 0 : 1); 
            });
       
            var toggleMuteButtons = document.querySelectorAll('.toggle-mute');
            toggleMuteButtons.forEach(function(button) {
                button.textContent = globalMuteState ? 'Sound on' : 'Sound off';
            });
        }

   
        document.querySelectorAll('.reel_container').forEach(function(videoContainer, index) {
            var player = players[index];
            var playPauseOverlay = videoContainer.querySelector('.r-play-overlay');
            var customCursor = playPauseOverlay.querySelector('.r-cursor');
            var progressBar = videoContainer.querySelector('.r-progress-bar');
            var toggleMuteButton = videoContainer.querySelector('.toggle-mute');

            playPauseOverlay.addEventListener('click', function() {
                togglePlayPause(player, customCursor, index);
            });
            playPauseOverlay.addEventListener('mousemove', function(e) {
                customCursor.style.display = 'block';
                updateCursorPosition(customCursor, playPauseOverlay.getBoundingClientRect(), e);
            });
            playPauseOverlay.addEventListener('mouseleave', function() {
                customCursor.style.display = 'none';
            });
            progressBar.addEventListener('click', function(e) {
                seekVideo(player, progressBar, e);
            });
            toggleMuteButton.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMuteUnmute(player);
            });
        });