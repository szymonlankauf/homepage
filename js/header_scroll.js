(function() {

    var docElem = document.documentElement,
        header = document.querySelector( '.navbar-default' ),
        didScroll = false,
        changeHeaderOn = 200;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 200 );
            }
        }, false );
    }

    function scrollPage() {
        var sy = scrollY();
        var elements;
        if ( sy >= changeHeaderOn ) {
            header.classList.add('navbar-shrink');
            document.querySelector('#Top-nav').classList.add('navbar-shrink-a');
            elements = document.querySelectorAll('.icon-bar');
            for(var i = 0; i < elements.length; i++) {
                elements[i].classList.add('navbar-icon');
            }
            document.querySelector('#navButton').classList.add('nav-button-border')
        }
        else {
            header.classList.remove('navbar-shrink' );
            document.querySelector('#Top-nav').classList.remove('navbar-shrink-a');
            elements = document.querySelectorAll('.icon-bar');
            for(var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('navbar-icon');
            }
            document.querySelector('#navButton').classList.remove('nav-button-border')

        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();