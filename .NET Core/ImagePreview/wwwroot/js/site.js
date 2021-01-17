// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


function getImage ( index ) {
    $.ajax ({
        type: "GET",
        url: "/Home/GetImage?index=" + index,
        dataType: "text",
        success: function ( response ) {
           $("#image").html ( response ) 
        },
        error: function ( response ) {
            alert ( response )
        }
    })
}