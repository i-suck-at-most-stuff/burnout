document.addEventListener("DOMContentLoaded", function() {
    const dogImagesContainer = document.querySelector('.dog-images');
    
    function fetchDogImage() {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => {
                const img = document.createElement('img');
                img.src = data.message;
                img.classList.add('dog-image');
                dogImagesContainer.appendChild(img);
            })
            .catch(error => console.error("Error fetching dog image:", error));
    }

    
    for (let i = 0; i < 20; i++) {
        fetchDogImage();
    }

    setInterval(fetchDogImage, 2000); 
});
