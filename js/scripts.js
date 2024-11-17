const username = 'JoshIsYes';
const apiKey = '152dd7341991a250c5e0b7092879abd9';
const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

async function fetchNowPlaying() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const track = data.recenttracks.track[0];
        const nowPlayingDiv = document.getElementById('nowPlaying');

        if (track && track['@attr'] && track['@attr'].nowplaying) {
            const artist = track.artist['#text'];
            const songTitle = track.name;
            const albumCover = track.image[2]['#text'] || '';

            nowPlayingDiv.innerHTML = `
                
                <img src="${albumCover}" alt="Album cover">
                <div class="track-info">
                    <p class="song-title">${songTitle}</p>
                    <p class="artist-name">${artist}</p>
                </div>
                
            `;
        } else {
            nowPlayingDiv.innerHTML = `<a href="https://open.spotify.com/playlist/5Xg7VGKGjjXBwwzoZDtR4d?si=09186592a13c44ba"><img src="https://64.media.tumblr.com/dbde4f333b255faed8d948d632b78f59/97443ad5ed7e5e0b-75/s1280x1920/5bb93dc0fc2fd2e065d15c211a1531d7976ca4c0.jpg" alt="Album cover">
                <div class="track-info">
                    <p class="song-title">Not Currently Playing Anything</p>
                    <p class="artist-name">check out my playlist tho</p>
                </div></a>`;
        }
    } catch (error) {
        console.error('Error fetching now playing data:', error);
    }
}

fetchNowPlaying();
setInterval(fetchNowPlaying, 30000);
