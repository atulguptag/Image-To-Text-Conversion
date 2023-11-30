$(document).ready(function() {

    $('#uploadForm').submit(function(event) {
        event.preventDefault();
        
        var fileInput = $('#upload_file')[0];
        var file = fileInput.files[0];
  
        if (file) {
            var formData = new FormData();
            formData.append('image', file);
  
            $('.processing_bar').width('0%');
  
            $.ajax({
                url: '/upload/',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                xhr: function() {
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener('progress', function(e) {
                        if (e.lengthComputable) {
                            var percent = (e.loaded / e.total) * 100;
                            $('.processing_bar').width(percent + '%');
                        }
                    }, false);
                    return xhr;
                },
                success: function(data) {
                    // Extract the text from the JSON response
                    var extractedText = JSON.parse(data.text).text;
  
                    // Remove Unicode escape sequences
                    var cleanedText = extractedText.replace(/\\u[0-9A-Fa-f]{4}/g, '');
  
                    // Remove JSON formatting
                    cleanedText = JSON.parse(cleanedText);
  
                    // Remove lines containing "//" and newline characters
                    cleanedText = cleanedText.replace(/\/\/|\\n/g, '');
  
                    // Display the extracted text without Unicode escape sequences, JSON formatting, "//", and newline characters
                    $('#resultBox').html('Text Extracted: <pre>' + cleanedText + '</pre>');
                },
                error: function(error) {
                    $('#resultBox').html('Error: ' + error.responseText);
                }
            });
        } else {
            $('#resultBox').html('Please select a valid image file.');
        }
    });
  });
  