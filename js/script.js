document.addEventListener('DOMContentLoaded', () => {
    // Get the image and button elements from the HTML
    const imgElement = document.getElementById('carousel-img');
    const btnElement = document.getElementById('next-img-btn');
    
    // Array of image paths (make sure these match your actual files)
    const images = [
        'images/study1.jpg',
        'images/study2.jpg',
        'images/study3.jpg'
    ];
    
    let currentIndex = 0;
    
    // Add click event to the button
    btnElement.addEventListener('click', () => {
        currentIndex++;
        // Loop back to the first image if at the end
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        // Change the image source
        imgElement.src = images[currentIndex];
    });
});