document.addEventListener('DOMContentLoaded', function() {
    // Initialize WebGazer
    webgazer.setRegression('ridge')
             .setTracker('clmtrackr')
             .begin()
             .showVideoPreview(false)
             .showPredictionPoints(false);

    // Move custom cursor to follow original cursor position
    function moveCursor() {
        var cursor = document.getElementById('cursor');
        var x = webgazer.getCurrentPrediction().x;
        var y = webgazer.getCurrentPrediction().y;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    }

    // Highlight element on gaze
    function highlightElement(element) {
        var elements = document.querySelectorAll('.highlight');
        elements.forEach(function(el) {
            el.classList.remove('highlight');
        });
        if (element && element.id !== 'cursor') {
            element.classList.add('highlight');
        }
    }

    // Redirect to Amazon when button is clicked
    function redirect() {
        window.location.href = 'https://www.amazon.com';
    }

    // Add wink listener to control the cursor and interact with elements
    webgazer.setGazeListener(function(data, elapsedTime) {
        if (!data) return;

        // Move custom cursor to follow original cursor position
        moveCursor();

        // Highlight the element being gazed at
        var x = data.x;
        var y = data.y;
        var element = document.elementFromPoint(x, y);
        highlightElement(element);

        // Check if the cursor is within the element's bounds
        if (element) {
            var rect = element.getBoundingClientRect();
            if (rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom) {
                // Simulate a click on the element if wink is detected
                if (data.winking) {
                    element.click();
                }
            }
        }
    });

    // Add hover effect to button on gaze
    var hoverButton = document.getElementById('hoverButton');
    hoverButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#17a2b8';
        this.style.color = '#fff';
    });
    hoverButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#007bff';
        this.style.color = '#fff';
    });
});
