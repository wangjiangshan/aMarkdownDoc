/**
 * @author   aliencode
 * @date     13-10-10
 */
$(function () {
    $('#sidebar ul:first').addClass('bs-sidenav');
    $('#sidebar ul').addClass('nav');
    if(!$('#sidebar>.bs-sidenav')[0])$('.markdown-body').css('margin-left',0)

    $('#sidebar li a').click(function (e) {
        var partialUrl = $(this).attr('href').replace('#', '');
        $('.markdown-body').load(partialUrl);
        $('#sidebar li').removeClass('active');
        $(this).parent().addClass('active');
    });
    $(document).ajaxStart(function () {
        $('.markdown-body').css('opacity',.3);
    });
    $(document).ajaxStop(function () {
        $('pre').addClass('prettyprint');
        prettyPrint();
        $('.dropdown-menu').html( $('.toc ul').html() );
        $("body").on("click", "a", function() {
            fromTop = 90;
            href = $(this).attr("href");
            if(href && href.indexOf("#") != -1 && href.indexOf("#") != href.length - 1) {
                href = href.substring(href.indexOf("#"));
                if($(href).length > 0) { // If element exists
                    $('html, body').animate({scrollTop: $(href).offset().top - fromTop}, 400);
                    return false;
                }
            }
        });
        setTimeout(function () {
            $('.markdown-body').css('opacity', 1);
        }, 300);
    });
    var partialUrl = window.location.href.split('#')[1];
    if(partialUrl)
        $('.markdown-body').load(partialUrl);
    $('.main-nav').html($('#sidebar nav').html());
    $('#sidebar nav').css('display', 'none');
});