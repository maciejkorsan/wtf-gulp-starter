"use strict";

// service worker registration - remove if you're not going to use it // for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// place your code below

import browserUpdate from 'browser-update';
browserUpdate({
  required: {e:-2,f:-6,o:-6,s:10,c:-6},
  insecure:true,
  unsupported:true,
  reminder:0,
  reminderClosed: 1
});

const autor = 'Kasia Izak';
console.log(`Hej, nazywam się ${autor} i jestem autorką tej strony.
Fajnie, że nie boisz się zaglądać do konsoli! ;-)`);
