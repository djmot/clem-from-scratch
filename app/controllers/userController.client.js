'use strict';

(function () {
    var profileId = document.querySelector('#profile-id') || null;
    var profileUsername = document.querySelector('#profile-username') || null;
    var profileRepos = document.querySelector('#profile-repos') || null;
    var displayName = document.querySelector('#display-name');
    var apiURL = appURL + '/api/:id';
    
    function updateHTMLElement (data, element, userProperty) {
        element.innerHTML = data[userProperty];
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiURL, function (data) {
        var userObject = JSON.parse(data);
        
        // Note: displayName is not required for GitHub accounts. If it's not
        // defined, use username.
        if (userObject['displayName']) {
            updateHTMLElement(userObject, displayName, 'displayName');
        } else {
            updateHTMLElement(userObject, displayName, 'username');
        }
        
        if (profileId) {
            updateHTMLElement(userObject, profileId, 'id');
        }
        
        if (profileUsername) {
            updateHTMLElement(userObject, profileUsername, 'username');
        }
        
        if (profileRepos) {
            updateHTMLElement(userObject, profileRepos, 'publicRepos');
        }
    }));
})();