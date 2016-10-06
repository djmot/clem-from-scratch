'use strict';

(function () {
    var addButton = document.querySelector('.btn-add');
    var deleteButton = document.querySelector('.btn-delete');
    var clickNbr = document.querySelector('#click-nbr');
    var apiURL = appURL + '/api/:id/clicks';
    
    function updateClickCount (data) {
        var clicksObject = JSON.parse(data);
        clickNbr.innerHTML = clicksObject.clicks;
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiURL, updateClickCount));
    
    addButton.addEventListener('click', function () {
        ajaxFunctions.ajaxRequest('POST', apiURL, function() {
            ajaxFunctions.ajaxRequest('GET', apiURL, updateClickCount);
        });
    }, false);
    
    deleteButton.addEventListener('click', function () {
        ajaxFunctions.ajaxRequest('DELETE', apiURL, function() {
            ajaxFunctions.ajaxRequest('GET', apiURL, updateClickCount);
        });
    }, false);
})();