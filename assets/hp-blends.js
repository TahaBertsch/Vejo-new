$(function(){
  // Add to Cart Logic
    function addToCart(orderVId, orderQty, toCheckout = false, properties){
      CartJS.addItem(orderVId, orderQty, properties, {
        success: function (data, textStatus, jqXHR) {
          toCheckout !== true
            ? addedToCartSuccess()
            : (window.location.href = "https://www.vejo.com/checkout");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Error: " + errorThrown + "!");
        },
      });
    };
  //PODS SECTION
    $('.open-facts').on('click', function(){
      const nFactsModal = $('.nutrition-facts-modal');
      const imgSrc = $(this).attr('data-nf-img-src');
      const nutritionImg = $('.nutrition-facts-img');
      nutritionImg.attr( 'src', `//cdn.shopify.com/s/files/1/1852/7957/${imgSrc}` );
      nFactsModal.show();
    })
    $('.close-facts').on('click', function(){
      const nFactsModal = $('.nutrition-facts-modal');
      const nutritionImg = $('.nutrition-facts-img');
      nFactsModal.hide();
      nutritionImg.attr( 'src', '' );
    })

  // // blends navigation
    $('.blends-pods').slick({
      infinite: true,
      slidesToShow:1,
      mobileFirst:true,
      slidesToScroll: 1,
      centerMode: true,
      accessibility:true,
      focusOnSelect:true,
      centerPadding: '60px',
      dots: false,
      arrows: true,
      speed: 500,
      asNavFor: $('.blends-info'),
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            infinite: true,
            arrows: true,
            slidesToShow: 7,
            centerMode: true,
            centerPadding: '60px'
          }
        },
        {
          breakpoint: 800,
          settings: {
            infinite: true,
            arrows: true,
            slidesToShow: 5,
            centerMode: true,
            centerPadding: '60px'
          }
        },
        {
          breakpoint: 500,
          settings: {
            infinite: true,
            arrows: true,
            slidesToShow: 3,
            centerMode: true,
            centerPadding: '60px'
          }
        },
        {
          breakpoint: 400,
          settings: {
            infinite: true,
            arrows: true,
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '60px'
          }
        },
      ]
    });

    // // blends information
      $('.blends-info').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,
        infinite: true,
        fade: true,
        asNavFor: $('.blends-pods')
      });

    // // Blends click outside
      $('.nutrition-facts-modal').on('click', e => {
        const nFactsModal = $('.nutrition-facts-modal');
        const nutritionImg = $('.nutrition-facts-img');
        const container = $('.nutrition-img-wrp');
        const containerTop = container.offset().top;
        const containerLeft = container.offset.left;
        const containerBottom = containerTop + container.outerHeight();
        const containerRight = containerLeft + container.outerWidth();
        const cursorX = e.clientX;
        const cursorY = e.clientY;

        if ( cursorY > containerBottom || cursorY < containerTop || cursorX > containerRight || cursorX < containerLeft ){
          nFactsModal.hide();
          nutritionImg.attr( 'src', '' );
        }
      })
    //END OF PODS SECTION

    // // Blends click outside
    $('.nutrition-facts-modal').on('click', e => {
      const nFactsModal = $('.nutrition-facts-modal');
      const nutritionImg = $('.nutrition-facts-img');
      const container = $('.nutrition-img-wrp');
      const containerTop = container.offset().top;
      const containerLeft = container.offset.left;
      const containerBottom = containerTop + container.outerHeight();
      const containerRight = containerLeft + container.outerWidth();
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      if ( cursorY > containerBottom || cursorY < containerTop || cursorX > containerRight || cursorX < containerLeft ){
        nFactsModal.hide();
        nutritionImg.attr( 'src', '' );
      }
    })
  //END OF PODS SECTION

  // // Submit blends
    $('.btn-submit-blends').on('click', function(){
      const blendVid = $(this).attr('data-blend-vid');
      addToCart( blendVid , 1 );
    })
  })