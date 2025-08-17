(() => {
    document.querySelector("input[type='submit']").addEventListener("click", function (e) {
        e.preventDefault();
        const password = document.querySelector("input[type='password']").value;

        if (password === "azerty") {
            // Ouvrir un jeu Google aléatoire
            openRandomGoogleGame();
            document.querySelector(".etat0").textContent = "🎮 Jeu Google lancé !";
            document.querySelector("input[type='password']").value = "";
        } else if (password === "inversion") {
            // Basculer l'inversion des couleurs
            document.body.classList.toggle("inverted-colors");
            document.querySelector(".etat0").textContent = document.body.classList.contains("inverted-colors")
                ? "🎨 Mode inversion activé"
                : "🎨 Mode inversion désactivé";
            document.querySelector("input[type='password']").value = "";
        } else if (password === "hardcore") {
            // Afficher la vidéo "I am back aced" en plein écran
            showHardcoreVideo();
            document.querySelector(".etat0").textContent = "🎬 Mode hardcore activé";
            document.querySelector("input[type='password']").value = "";
        } else {
            document.querySelector(".etat0").classList.remove("etat1");
        }
    });

    function openRandomGoogleGame() {
        // Liste des jeux Google disponibles
        const googleGames = [
            'https://www.google.com/doodles/celebrating-50-years-of-kids-coding', // Coding for Carrots
            'https://www.google.com/doodles/halloween-2016', // Magic Cat Academy
            'https://www.google.com/doodles/celebrating-garden-gnomes', // Garden Gnomes
            'https://www.google.com/doodles/celebrating-pizza', // Pizza Puzzle
            'https://www.google.com/doodles/popular-google-doodle-games', // Collection de jeux
            'https://www.google.com/doodles/pac-man', // Pac-Man Google
            'https://www.google.com/doodles/rubiks-cube', // Rubik's Cube
            'https://www.google.com/doodles/basketball-2012', // Basketball
            'https://www.google.com/doodles/soccer-2012', // Soccer
            'https://www.google.com/doodles/hurdles-2012', // Hurdles
            'https://www.google.com/doodles/quick-draw', // Quick Draw
            'https://www.google.com/doodles/celebrating-hip-hop', // Hip Hop Mixer
            'https://www.google.com/doodles/celebrating-beethoven', // Beethoven Puzzle
            'https://www.google.com/doodles/celebrating-popcorn', // Popcorn Game
            'https://www.google.com/doodles/celebrating-pani-puri' // Pani Puri Game
        ];

        // Sélectionner un jeu aléatoire
        const randomGame = googleGames[Math.floor(Math.random() * googleGames.length)];
        
        // Ouvrir le jeu dans un nouvel onglet
        window.open(randomGame, '_blank');
        
        // Afficher une notification
        showGameNotification(randomGame);
    }

    function showGameNotification(gameUrl) {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4285f4, #34a853);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: 'Anton', sans-serif;
            max-width: 300px;
            animation: slideInRight 0.5s ease;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">🎮</span>
                <div>
                    <div style="font-weight: bold;">Jeu Google Lancé!</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">Vérifiez votre nouvel onglet</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer la notification après 4 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    function showHardcoreVideo() {
        // Supprimer la vidéo existante si elle existe
        const existingVideo = document.getElementById('hardcore-video');
        if (existingVideo) {
            existingVideo.remove();
        }

        // Créer l'élément vidéo de manière sécurisée
        const videoContainer = document.createElement('div');
        videoContainer.id = 'hardcore-video';
        videoContainer.className = 'hardcore-video-container';

        // Créer l'iframe YouTube de manière sécurisée
        const iframe = document.createElement("iframe");
        iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&loop=1&playlist=dQw4w9WgXcQ&controls=0&rel=0&modestbranding=1&start=0';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; encrypted-media; fullscreen';
        iframe.allowFullscreen = true;
        iframe.style.border = 'none';
        
        // Debug: vérifier si l'iframe se charge
        iframe.onload = function() {
            console.log('Iframe YouTube chargée avec succès');
        };
        
        iframe.onerror = function() {
            console.log('Erreur de chargement de l\'iframe YouTube');
        };

        // Créer le bouton de fermeture
        const closeButton = document.createElement('button');
        closeButton.className = 'close-video';
        closeButton.textContent = '✕';
        closeButton.onclick = closeHardcoreVideo;

        // Créer le titre
        const videoTitle = document.createElement('div');
        videoTitle.className = 'video-title';
        videoTitle.textContent = 'I AM BACK ACED';

        // Assembler les éléments
        videoContainer.appendChild(iframe);
        videoContainer.appendChild(closeButton);
        videoContainer.appendChild(videoTitle);

        document.body.appendChild(videoContainer);

        // Debug: vérifier si le container est ajouté
        console.log('Container vidéo ajouté:', document.getElementById('hardcore-video'));

        // Forcer le plein écran après un délai
        setTimeout(() => {
            try {
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen().catch(e => console.log('Fullscreen failed:', e));
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                } else if (videoContainer.mozRequestFullScreen) {
                    videoContainer.mozRequestFullScreen();
                } else {
                    console.log('Fullscreen non supporté');
                }
            } catch (e) {
                console.log('Erreur fullscreen:', e);
            }
        }, 1000);
    }

    // Fonction globale pour fermer la vidéo
    window.closeHardcoreVideo = function () {
        const video = document.getElementById('hardcore-video');
        if (video) {
            video.remove();
        }
        // Sortir du plein écran
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    };
})();