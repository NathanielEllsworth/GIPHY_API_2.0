
/**
 *
 * @type {[*]} Array of Giphy search objects
 * The search is by default gifs on sports
 */

var defaultGiphySearches = [

    {
        query: 'basketball',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'tennis',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'baseball',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'golf',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'soccer',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'volleyball',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'gymnastics',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'boxing',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'triathlon',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
    {
        query: 'archery',
        rating: 'r',
        limit: 15,
        button: {},
        data: {},
        url: "",
    },
];








/**
 * @returns {string} the Giphy API URL
 */

function getApiUrl() {
    return "http://api.giphy.com/v1/gifs/search";
}




/**
 * @returns {string} the web API key
 */

function getKey() {
    return 'dc6zaTOxFJmzC';
}




/**
 * @param giphySearch gets an image from the Giphy API
 */

function getImage(giphySearch) {

    var url = getApiUrl();

    url += '?' + $.param({
            'api_key': getKey(),
            'q': giphySearch.query,
            'limit': giphySearch.limit,
            'rating': giphySearch.rating,
            'sort': "relevant",
        });
    giphySearch.url = url;

    console.log(url);

    $.ajax({
        url: url,
        method: "GET"
    }).done(function (response) {
        console.log(response);

        $("#searchResults").empty();


        for (var i = 0; i < response.data.length; i++) {

            giphySearch.data = response.data[i];
            console.log(giphySearch.data.url);

            var image = $("<img " +
                "class=\"giphy\" " +
                "id=\"" + giphySearch.data.id + "\" " +
                "data-src=\"static\" " +
                "url-static=" + giphySearch.data.images.fixed_height_still.url + " " +
                "url-animated=" + giphySearch.data.images.fixed_height.url + " " +
                "src=" + giphySearch.data.images.fixed_height_still.url + ">");

                image.css("border-radius", "25px");

            var imgDiv = $("<div class='resultImage'>").append(
                $("<div>").text("Rated: " + giphySearch.data.rating).css("text-align", "center")
            ).append(image);

                imgDiv.css("display", "inline-block");

            $("#searchResults").prepend(imgDiv);


        }
    });
}





/**
 * A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness
 * for you. Code included inside $( document ).ready() will only run once the DOM
 * is ready for JavaScript code to execute.
 */


function main() {

    // Attach a delegated click event to all giphy images

    $("#searchResults").on("click", ".giphy", function () {


        /**
         * Look up both the animated and static images in the DOM using JQuery selectors
         * Each image contains a unique ID provided by the giphy API
         * @type {jQuery} The data source indicates whether the image is static or animated
         */

        var dataId = $(this).attr("id");
        var dataSrc = $(this).attr("data-src");
        var urlStatic = $(this).attr("url-static");
        var urlAnimated = $(this).attr("url-animated");



        if (dataSrc === "static") {               // If the clicked imaged is static, hide the static image and show the animated image
            $(this).attr("src", urlAnimated);
            $(this).attr("data-src", "animated");



        }else if (dataSrc === "animated") {       // Else if the clicked image is animated, hide the animated image and show the static image
            $(this).attr("src", urlStatic);
            $(this).attr("data-src", "static");



        }else {                                   // Hide the animated image and show and place holder image to indicate an error
            $(this).attr("src", "http://via.placeholder.com/350x150");



        }

    });





    /**
     * This connects a searched text from the search box to a new button that acts as a tab.
     * This also connects each gifs rating to itself
     */

    // Attach a delegated click event to all giphy images
    $("#searchButton").on("click", function () {

        $("#searchText").val();
        var searchText = $("#searchText").val();
        console.log(searchText);

        var giphySearch = {
            query: searchText,
            rating: 'r',
            limit: 15,
            button: {},
            data: {},
            url: "",
        };

        getImage(giphySearch);

        var savedSearchButton = $('<a href="#" class="btn btn-warning sports">').text(giphySearch.query);

        //image.css("border-radius", "25px");
        $(".savedSearches").append(savedSearchButton);


    });

    // Attach a delegated click event to all giphy images
    $(".savedSearches").on("click", ".sports", function () {

        var giphySearch = {
            query: $(this).text(),
            rating: 'r',
            limit: 15,
            button: {},
            data: {},
            url: "",
        };

        getImage(giphySearch);

        console.log($(this).text());
    });

}

$(document).ready(main);