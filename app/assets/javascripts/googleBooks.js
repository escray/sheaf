/* global $ */
$(document).ready(function () {
  $('#lookup-status').hide()
  $('#lookup-failure-message').hide()
  resetLookupStatus()
  resetButton()
  searchButton()
  lookupByISBN()
})

// Search by either ISBN13 or ISBN10
var searchButton = function () {
  $('#lookupISBN').on('click', function (event) {
    event.preventDefault()
    resetLookupStatus()
    var isbn13 = $('#editionISBN13').val()
    var isbn10 = $('#editionISBN10').val()

  // prevent search if both ISBN fields are empty
    if (isbn13 === '') {
      lookupByISBN(isbn10)
    } else {
      lookupByISBN(isbn13)
    }
  })
}

// Google Books search by ISBN
var lookupByISBN = function (isbn) {
  var googleBooksAPI = 'https://www.googleapis.com/books/v1/volumes?q='
  $.getJSON(googleBooksAPI + 'isbn:' + isbn,
    function (data) {
      if (data.totalItems >= 1) {
        var volumeInfo = data.items[0]['volumeInfo']
        console.log(volumeInfo)
        $('#authorName').val(volumeInfo['authors'][0])
        $('#workTitle').val(volumeInfo['title'])
        $('#publisherName').val(volumeInfo['publisher'])
        $('#editionPublicationyear').val(volumeInfo['publishedDate'])
        $('#lookup-status').show()
        $('#lookup-status').addClass('btn-success')
        $('#lookup-status').html('<i class="fa fa-check fa-lg" alt="search successful"></i>')
      } else {
        $('#lookup-status').show()
        $('#lookup-status').addClass('btn-danger')
        $('#lookup-status').html('<i class="fa fa-times fa-lg" alt="failed search"></i>')
        $('#lookup-failure-message').show()
      }
    })
} // end lookupByISBN

// reset ISBN lookup form
var resetLookupStatus = function () {
  $('#lookup-status').hide()
  $('#lookup-failure-message').hide()
  $('#lookup-status').removeClass('btn-success')
  $('#lookup-status').removeClass('btn-danger')
}

var resetButton = function () {
  $('button[type="reset"]').on('click', function () {
    resetLookupStatus()
  })
}
