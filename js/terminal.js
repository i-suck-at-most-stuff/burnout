const output = document.getElementById('output');
const input = document.getElementById('input');
const prompt = document.getElementById('prompt');
const minimizeButton = document.getElementById('minimize');
const maximizeButton = document.getElementById('maximize');
const closeButton = document.getElementById('close');

const githubUsername = 'i-suck-at-most-stuff';  
const githubApiUrl = `https://api.github.com/users/${githubUsername}/events/public`;
let termusername = "Please_Enter_Your_Name";
let isMaximized = false;

const commands = {
    help: "Available commands:\n- help: Show this help message\n- about: Show links to my portfolio\n- clear: Clear the terminal\n- spotify: Show the current song playing on Spotify\n- github: Show the most recent commits on my github\n- ascii: Show a random piece of ascii art i found on discord like 2 years ago\n- flipcoin: flips a coin\n- pet: finds a random dog off dog.ceo\n- weezer: weezer\n",
    about: "Check out my portfolio here:\nhttps://i-suck-at-most-stuff.github.io\n\nCheck out my github here:\nhttps://github.com/i-suck-at-most-stuff\n\n",
    barracoders: "Learn more about the hackclub i run here:\nhttps://barracoders.com\n\n",
    github: async () => {
        const githubUsername = 'yourGitHubUsername';  
        const githubApiUrl = `https://api.github.com/users/${githubUsername}/events/public`;

        try {
            const response = await fetch(githubApiUrl);
            const data = await response.json();

            
            const pushes = data.filter(event => event.type === 'PushEvent');

            if (pushes.length === 0) {
                output.textContent += "No recent pushes found.\n\n";
            } else {
                pushes.slice(0, 5).forEach(push => { 
                    const repoName = push.repo.name;
                    const commitDate = new Date(push.created_at).toLocaleString();

                    output.textContent += `
Commit made on: ${commitDate}
Repo: ${repoName}
`;

                    
                    push.payload.commits.forEach(commit => {
                        const commitMessage = commit.message;
                        const commitUrl = commit.url;
                        output.textContent += `  Message: ${commitMessage}\n  Commit URL: ${commitUrl}\n`;
                    });
                    output.textContent += '\n'; 
                });
            }
        } catch (error) {
            console.error('Error fetching GitHub pushes:', error);
            output.textContent += "Unable to fetch GitHub pushes.\n\n";
        }
    },
    clear: () => {
        output.textContent = '';
    },
    spotify: async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            const track = data.recenttracks.track[0];
            
            if (track && track['@attr'] && track['@attr'].nowplaying) {
                const artist = track.artist['#text'];
                const songTitle = track.name;
                const albumCover = track.image[2]['#text'] || ''; 

                output.textContent += `Now Playing:\nArtist: ${artist}\nSong: ${songTitle}\n\n`;
            } else {
                output.textContent += `I'm not currently playing anything, feel free to check out my playlist though. https://open.spotify.com/playlist/5Xg7VGKGjjXBwwzoZDtR4d?si=f33af739d8ec4df1\n\n`;
            }
        } catch (error) {
            console.error('Error fetching now playing data:', error);
            output.textContent += `Unable to load now playing data\n\n`;
        }
    },
    ascii: () => {
        if (isMobile()) {
            output.textContent += `This command only works on desktop. Please visit this site on a desktop for the full experience.\n\n`;
            return; 
        }
        const asciiArtCollection = [
            
            `
             _______
            < Real >
             -------
             \\
              \\   ^__^
               \\  (oo)\\_______
                  (__)\\       )\\/\\
                      ||----w |
                      ||     ||
            `,
            
        ];

        
        const randomArt = asciiArtCollection[Math.floor(Math.random() * asciiArtCollection.length)];

        output.textContent += `Heres some ascii i found in a discord server that one time:\n\n${randomArt}\n\n`;
    },
    flipcoin: () => {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        output.textContent += `The coin landed on: ${result}\n\n`;
    },
    pet: async () => {
        if (isMobile()) {
            output.textContent += `This command only works on desktop. Please visit this site on a desktop for the full experience.\n\n`;
            return; 
        }
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            const imageUrl = data.message;
    
            output.innerHTML += `Here's a cute dog for you:\n<img src="${imageUrl}" alt="Cute Dog" style="max-width: 100%; height: auto;" />\n\n`;
        } catch (error) {
            console.error('Error fetching pet image:', error);
            output.textContent += `Sorry, we couldn’t fetch a cute pet picture right now.\n\n`;
        }
    },
    weezer: () => {
        const audio = new Audio('buddy-holly-weezer-guitar-lick.mp3');  
    
        audio.play().then(() => {
            output.textContent += "Playing Weezer's Buddy Holly riff!\n\n";
        }).catch(error => {
            console.error('Error playing the sound:', error);
            output.textContent += "There was an error trying to play the Buddy Holly riff.\n\n";
        });
    },
    
};


function executeCommand(command) {
    const args = command.split(' ');
    const cmd = args[0].toLowerCase();

    if (commands[cmd]) {
        if (typeof commands[cmd] === 'function') {
            commands[cmd]();
        } else {
            output.textContent += commands[cmd] + '\n';
        }
    } else {
        output.textContent += `Command not found: ${cmd}\n\n`;
    }
}


function bootSequence() {
        document.getElementById('terminal-section').style.display = 'block'; // Show terminal when needed
   
        output.textContent += "Joshua Worthington [Version 4.2.310.6]\n";
        output.textContent += "(c) i-suck-at-most-stuff. All rights reserved\n\n";
        output.textContent += "this is my best attempt at making a terminal site with no guide\n\n";
        output.textContent += "type 'help' for a list of commands\n\n";
        setTimeout(() => {
            input.addEventListener('keydown', handleUsernameInput);
        }, 1000);
}


function handleUsernameInput(e) {
    if (e.key === 'Enter') {
        termusername = input.value.trim() || "Please_Enter_Your_Name";
        prompt.textContent = `C:\\Users\\${termusername}>`;
        input.value = '';
        input.removeEventListener('keydown', handleUsernameInput);
        input.addEventListener('keydown', handleCommandInput);
    }
}


function handleCommandInput(e) {
    if (e.key === 'Enter') {
        const command = input.value.trim();
        output.textContent += `${prompt.textContent}> ${command}\n`;
        executeCommand(command);
        input.value = '';
    }
}


minimizeButton.addEventListener('click', () => {
    document.body.style.display = 'none';
});

maximizeButton.addEventListener('click', () => {
    if (!isMaximized) {
        document.documentElement.requestFullscreen();
        isMaximized = true;
    } else {
        document.exitFullscreen();
        isMaximized = false;
    }
});

closeButton.addEventListener('click', () => {
    window.close();
});

function isMobile() {
    
    return window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
}

bootSequence();

      