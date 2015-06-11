$(document).ready(function() {
    //SnapJS declarations and functions
    var snapper = new Snap({
        element: document.getElementById('main'),
        touchToDrag: false,
        tapToClose: true,
        disable: 'right'
    });

    snapper.on("open", function() {
        $(".cmn-toggle-switch").addClass("active");
        $('#topBar').css('transform', 'translate3d(225px,0,0)');
        $('#topBar').css('-webkit-transform', 'translate3d(225px,0,0)');
    });

    snapper.on("close", function() {
        $(".cmn-toggle-switch").removeClass("active");
        $('#topBar').css('transform', 'translate3d(0,0,0)');
        $('#topBar').css('-webkit-transform', 'translate3d(0,0,0)');
    });

    $("#open-left").click(function(e) {
        if (snapper.state().state == "left") {
            snapper.close();
        } else {
            snapper.open('left');
        }
    });

    $(".snap-close").click(function(e) {
        if (snapper.state().state == "left") {
            snapper.close();
        }
    });
});