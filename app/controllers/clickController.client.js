'use strict';

console.log("A");

(function () {
    var addButton = document.querySelector('.btn-add');
    var deleteButton = document.querySelector('.btn-delete');
    var clickNbr = document.querySelector('#click-nbr');
    var apiURL = 'https://clem-from-scratch-djmot.c9users.io/api/clicks';
    if (clickNbr) {console.log("B");}
    function ready (fn) {
        
        if (typeof(fn) !==  'function') { return; }
        
        if (document.readyState === 'complete') { 
            return fn(); 
        }
        
        document.addEventListener('DOMContentLoaded', fn, false);
    }
    
    function ajaxRequest (method, url, callback) {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.response);
            }
        };
        
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    }
    
    function updateClickCount (data) {
        var clicksObject = JSON.parse(data);
        clickNbr.innerHTML = clicksObject.clicks;
    }
    
    ready(ajaxRequest('GET', apiURL, updateClickCount));
    
    addButton.addEventListener('click', function () {
        ajaxRequest('POST', apiURL, function() {
            ajaxRequest('GET', apiURL, updateClickCount);
        });
    }, false);
    
    deleteButton.addEventListener('click', function () {
        ajaxRequest('DELETE', apiURL, function() {
            ajaxRequest('GET', apiURL, updateClickCount);
        });
    }, false);
})();