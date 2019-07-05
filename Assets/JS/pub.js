$(document).ready(function () {
    $("#map").hide();
     

    function displayPub() {

        $("#submit").on("click", function () {
            $(".form-container").hide();
            let search = $("#search").val().trim();
            let queryUrl = "https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/place/textsearch/json?query=bar+" + search + "&key=AIzaSyDGbaz8xBuD2ZAX5SI_IlQ8zYeao7KwTPQ";
            $.ajax({
                url: queryUrl,
                method: 'GET'
            }).then(function (data) {
                console.log(queryUrl);
                showResult(data.results);

            });
        });
    }

    function showResult(result) {
        for (let i = 0; i < result.length; i++) {
            barDiv = $("<div>");
            barDiv.addClass("bars d-flex flex-column border border-white align-items-center mt-3");
            barDiv.attr("value", result[i].place_id);
            bName = $("<h4>");
            bName.text(result[i].name);
            barDiv.append(bName);
            img = $("<img>");
            img.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photoreference=" + result[i].photos[0].photo_reference + "&key=AIzaSyDGbaz8xBuD2ZAX5SI_IlQ8zYeao7KwTPQ");
            barDiv.append(img);
            bRating = $("<h5>");
            bRating.text("Rating: " + result[i].rating);
            barDiv.append(bRating);
            bRatingTotal = $("<h5>");
            bRatingTotal.text("Total User Ratings: " + result[i].user_ratings_total);
            barDiv.append(bRatingTotal);
            $("#display-bars").prepend(barDiv);
        }
    }

    function barInfo() {
        $("#display-bars").empty();
        $("#header-container").hide();
        let barId = $(this).attr("value");
        let detailUrl = "https://cors-anywhere.herokuapp.com/" + "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + barId + "&key=AIzaSyDGbaz8xBuD2ZAX5SI_IlQ8zYeao7KwTPQ";

        $.ajax({
            url: detailUrl,
            method: 'GET',
        }).then(function (data) {
            console.log(detailUrl);
            let results = data.result;
            displayDetails(data.result);
            displayImages(data.result);
            displayReviews(data.result);
            initMap(data.result);

        });
    }

    function displayDetails(results) {
        let detailDiv = $("<div>")
        detailDiv.addClass("details text-white");
        let barName = $("<h1>").text(results.name);
        let barRating = $("<h2>").text("Rating: " + results.rating);
        let barPrice = $("<h4>").text("Price-Level: " + results.price_level);
        let barAddress = $("<h5>").text(results.formatted_address);
        let barPhone = $("<h5>").text(results.international_phone_number);
        let barWebsite = $("<a>");
        barWebsite.attr("href", results.website);
        barWebsite.attr("target", "_blank");
        barWebsite.text("Website");
        let hoursDiv = $("<div>");
        hoursDiv.addClass("hours text-white");
        for (let i = 0; i < results.opening_hours.weekday_text.length; i++) {
            let barHours = $("<p>");
            barHours.text(results.opening_hours.weekday_text[i]);
            hoursDiv.append(barHours);
        }
        detailDiv.append(barName, barRating, barAddress, barPhone, barWebsite, hoursDiv);
        $("#display-details").prepend(detailDiv);
    }

    function displayImages(results) {
        let actDiv = $("<div>");
        actDiv.attr('id', 'picture-div')
        actDiv.addClass("carousel-item active");
        let activeImage = $("<img>");
        //
        activeImage.attr('id', 'active-image')
        activeImage.addClass("d-block w-300");
        activeImage.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=700&maxheight=400&photoreference=" + results.photos[5].photo_reference + "&key=AIzaSyDGbaz8xBuD2ZAX5SI_IlQ8zYeao7KwTPQ");
        actDiv.append(activeImage);
        $(".image").prepend(actDiv);
        for (let i = 0; i < results.photos.length; i++) {
            imgDiv = $("<div>");
            imgDiv.addClass("carousel-item");
            let barImage = $("<img>");
            barImage.addClass("d-block w-300")
            barImage.attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=700&maxheight=400&photoreference=" + results.photos[i].photo_reference + "&key=AIzaSyDGbaz8xBuD2ZAX5SI_IlQ8zYeao7KwTPQ");
            imgDiv.append(barImage);
            $(".image").append(imgDiv);

        }

    }

    function initMap(results) {
        $("#map").show();
        let lat = results.geometry.location.lat;
        let lng = results.geometry.location.lng;
        var uluru = { lat: lat, lng: lng };
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 15, center: uluru });
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({ position: uluru, map: map });

    }

    function displayReviews(results) {
        for (let i = 0; i < results.reviews.length; i++) {
            let revDiv = $("<div>");
            revDiv.addClass("reviews text-white border border-white d-flex flex-wrap");
            let list = $("<ul>")
            list.addClass("review-list list-group")
            let rName = $("<li>");
            //below
            rName.attr("id", 'list-item-main')
            rName.addClass("list-item");
            rName.text(results.reviews[i].author_name);
            list.append(rName);
            let rating = $("<li>");
            rating.addClass("list-item");
            rating.text("Rating: " + results.reviews[i].rating);
            rating.attr('id', 'list-item-rating');
            list.append(rating);
            let time = $("<li>");
            time.addClass("list-item");
            time.text(results.reviews[i].relative_time_description);
            list.append(time);

            //below
            time.attr('id', 'list-item-time');
            let review = $("<li>");
            review.addClass("list-item");
            review.text(results.reviews[i].text);
            //
            review.attr('id', 'list-item-review');
            list.append(review);
            //
            review.append(time);
            revDiv.append(list);
            $("#display-reviews").prepend(revDiv);
        }
        
    }

    displayPub();

    $(document).on("click", ".bars", barInfo);
});


