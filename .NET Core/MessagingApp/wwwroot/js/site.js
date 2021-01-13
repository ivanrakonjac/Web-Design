// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


function updateTimer ( ){
    var string = $("#timer").text ( );

    var array = string.split (":");

    var hours = parseInt(array[0]);
    var minutes = parseInt(array[1]);
    var seconds = parseInt(array[2]);

    var timeInSeconds = hours * 3600 + minutes * 60 + seconds + 1;

    seconds = timeInSeconds % 60 ;
    minutes = Math.floor ( timeInSeconds / 60 ) % 60; 
    hours = Math.floor ( timeInSeconds / 3600 );
    
    if( seconds < 10){
        seconds = "0" + seconds;
    }

    if( minutes < 10){
        minutes = "0" + minutes;
    }

    if( hours < 10){
        hours = "0" + hours;
    }

    $("#timer").text ( hours + ":" + minutes + ":" + seconds);
}

// JS funkcija koja zove update timer svakih 1000ms
setInterval ( updateTimer, 1000 );