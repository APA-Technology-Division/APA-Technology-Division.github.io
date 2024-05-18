function showNext(num) {
    // Get the selected value from the dropdown
    const selectedValue = document.getElementById('select-' + num).value;
    if (selectedValue) {
        // Start the typing animation for the user's selection
        typeEffect(document.getElementById('span-' + num), selectedValue, () => {
            // Hide the current dropdown
            document.getElementById('select-' + num).classList.add('d-none');
            // Reveal the next static text portion (if exists)
            if (document.getElementById('text-' + (num + 1))) {
                document.getElementById('text-' + (num + 1)).classList.remove('d-none');
            }
            // Show the next dropdown (if exists)
            if (document.getElementById('select-' + (num + 1))) {
                document.getElementById('select-' + (num + 1)).classList.remove('d-none');
            }
            // If it's the last dropdown, reveal the final static text
            if (num === 5) {
                document.getElementById('text-6').classList.remove('d-none');
            }
        });
    }
}

function copyText() {
    const textArea = document.createElement("textarea");
    textArea.value = constructSentence();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    alert("Text copied to clipboard!");
}

function constructSentence() {
    return `A(n) ${document.getElementById('span-1').textContent} depicting a(n) ${document.getElementById('span-2').textContent} building with ${document.getElementById('span-3').textContent} on the ground floor and ${document.getElementById('span-4').textContent} on the upper floors in a ${document.getElementById('span-5').textContent} city.`;
}





function typeEffect(element, text, callback) {
    element.textContent = text;
    element.classList.add('typing-effect');
    setTimeout(() => {
        element.classList.remove('typing-effect');
        callback();
    }, text.length * 50); // 50ms per character
}

$(document).ready(function() {
    $("#descriptorField").on("input", function() {
        let word = $(this).val();
        if (word.length > 2) {  // Only fetch suggestions if word has 3 or more characters
            $.get("https://api.datamuse.com/words?rel_syn=" + word, function(data) {
                // Display the returned synonyms to the user
                let suggestions = $("#suggestions");
                suggestions.empty();
                data.forEach(function(item) {
                    let li = $("<li>").text(item.word).click(function() {
                        // Autofill the input when a suggestion is clicked
                        $("#descriptorField").val(item.word);
                        suggestions.empty();  // Clear the suggestions
                    });
                    suggestions.append(li);
                });
            });
        } else {
            $("#suggestions").empty();  // Clear the suggestions if word length is 2 or less
        }
    });
});