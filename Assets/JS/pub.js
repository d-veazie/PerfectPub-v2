$(document).ready(function() {

    function displayPub() {
        $("#display-bars").hide();

        $("#submit").on("click", function() {
            let search = $("#search").val().trim();
            let queryUrl = "https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+" + search + "&key=AIzaSyDGbaz8xBuD2ZAX5SI_IlQ8zYeao7KwTPQ";
            $.ajax({
                url: queryUrl,
                method: 'GET'
            }).then(function(data) {
                console.log(queryUrl);
                let result = data.results;
                for (let i = 0; i < result.length; i++) {
                    $("#display-bars").show();
                    barDiv = $("<div>");
                    barDiv.addClass("bars d-flex flex-column align-items-center ml-3");
                    barDiv.attr("value", result[i].place_id);
                    bName = $("<h4>");
                    bName.text(result[i].name);
                    barDiv.append(bName);
                    bAddress = $("<p>");
                    bAddress.text(result[i].formatted_address);
                    barDiv.append(bAddress);
                    img = $("<img>");
                    img.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=200&photoreference=" + result[i].photos[0].photo_reference + "&key=AIzaSyDGbaz8xBuD2ZAX5SI_IlQ8zYeao7KwTPQ");
                    barDiv.append(img);
                    bRating = $("<h5>");
                    bRating.text("Rating: " + result[i].rating);
                    barDiv.append(bRating);
                    bRatingTotal = $("<h5>");
                    bRatingTotal.text("Total User Ratings: " + result[i].user_ratings_total);
                    barDiv.append(bRatingTotal);
                    $("#display-bars").prepend(barDiv);
                }
            });
        });
    }

    function barInfo() {

        let barId = $(this).attr("value");
        let detailUrl = "https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + barId + "&key=AIzaSyDGbaz8xBuD2ZAX5SI_IlQ8zYeao7KwTPQ";

        $.ajax({
            url: detailUrl,
            method: 'GET',
        }).then(function(data) {
            console.log(detailUrl);
            let result = data.results;
            img = $("<img>");
            img.attr("src", )

        });
    }

    function initMap() {

    }
    displayPub();

    $(document).on("click", ".bars", barInfo);
});