/**
 * COLUMN SIZER FUNCTIONS
 */

$( function() {
  $productsList = $( 'ul.products' );
  $productsListClasses = $productsList.attr( 'class' );

  if( $productsListClasses ) {
    var currentColumnSize = $productsListClasses.split( /\s+/ )[1];
    $( '.woocommerce-columns-sizer.active' ).removeClass( 'active' );
    $( '.woocommerce-columns-sizer.' + newColumnSize ).addClass( 'active' );
  } else {
    currentColumnSize = '';
  }

  $( '.woocommerce-columns-sizer a' ).click( function( e ) {
    e.preventDefault();

    var newColumnSize = $( this ).data( 'size' );

    if( currentColumnSize != newColumnSize ) {
      $productsList.removeClass( currentColumnSize );
      $productsList.addClass( newColumnSize );
      currentColumnSize = newColumnSize;

      $( '.woocommerce-columns-sizer.active' ).removeClass( 'active' );
      $( '.woocommerce-columns-sizer.' + newColumnSize ).addClass( 'active' );
      document.cookie = "column_size=" + newColumnSize.slice( -1 ) + ';path=/';
    }
  } );
} );

/**
 * MINI-CART FUNCTIONS
 */

function hideMiniCart() {
  if( $( '#mini-cart' ).is( ':visible' ) ) {
    $( '#mini-cart' ).addClass( 'd-none' );
  }
}

$( function() {
  $( document ).on( 'click focus', '.mini-cart-toggle > a', function( e ) {
    e.preventDefault();

    var $toggle = $( this );
    var $miniCart = $( '#mini-cart' );

    var docHeight = $( document ).outerHeight( true );
    var docWidth = $( document ).outerWidth( true );

    // keep minicart invisible but allow it to display as block so dimensions can be properly computed
    $miniCart.css( 'visibility', 'hidden' );
    $miniCart.removeClass( 'd-none' );

    var miniCartWidth = $miniCart.outerWidth( true );
    var miniCartHeight = $miniCart.outerHeight( true );

    // set back to display:none after computing dimensions to make sure page flow isn't messed with
    $miniCart.addClass( 'd-none' );
    $miniCart.css( 'visibility', 'visible' );

    var toggleHeight = $toggle.outerHeight( true );
    var toggleWidth = $toggle.outerWidth();
    var toggleTop = $toggle.offset().top;
    var toggleBottom = toggleTop + toggleHeight;
    var toggleLeft = $toggle.offset().left;
    var toggleRight = toggleLeft + toggleWidth;
    var toggleCenter = toggleLeft + ( toggleWidth / 2 );

    if( toggleLeft + miniCartWidth < docWidth ) {
      $miniCart.css( 'left', 0 );
    } else if ( toggleRight - miniCartWidth > 0 ) {
      $miniCart.css( 'left', -miniCartWidth + toggleWidth );
    } else if ( toggleCenter - ( miniCartWidth / 2 ) > 0 && toggleCenter + ( miniCartWidth / 2 ) < docWidth ) {
      $miniCart.css( 'left', miniCartWidth / 2 * -1 + ( toggleWidth / 2 ) );
    } else {
      window.location.href = "/cart";
      return false;
    }

    if( toggleBottom + miniCartHeight < docHeight ) {
      $miniCart.css( 'top', toggleHeight + 4 );
    } else if( toggleTop - miniCartHeight > 0 ) {
      $miniCart.css( 'top', -miniCartHeight - 4 );
    } else {
      window.location.href = "/cart";
      return false;
    }

    $miniCart.insertAfter( $toggle );
    $miniCart.removeClass( 'd-none' );

    e.stopPropagation();
  } );

  $( '#mini-cart-close' ).click( function( e ) {
    e.preventDefault();
    hideMiniCart();
  } );

  $( 'html' ).click( function( e ) {
    var $target = $( e.target );

    if( ! $target.closest( '#mini-cart' ).length ) {
      hideMiniCart();
    }
  } );

  $( '*' ).focus( function() {
    if( ! $( this ).hasClass( '.mini-cart-toggle' ) && ! $( this ).closest( '#mini-cart' ).length ) {
      hideMiniCart();
    }
  } );
} );
