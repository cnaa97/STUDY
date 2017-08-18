$(function () {

    /******* tab menu *******/

    $("#two, #three, #four").hide();
    $("#myTab a").click(function () {
        $("#myTab > li").removeClass("active");
        $(this).parent().addClass("active");
        $("#myContents > div").hide();
        var contentSelector = $(this).attr("href");
        $(contentSelector).show();

        return false;
    });

    /******* image slider *******/

    $("#content-slider").lightSlider({
        item: 10
        , loop: true
        , keyPress: true
    });
});