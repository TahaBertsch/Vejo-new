async function checkCart() {
  var subProductQty = 0
  
  let cart = await jQuery.get('/cart.js')
  var cartJson = {}

  try {
    cartJson = JSON.parse(cart);
  } catch (e) {
    cartJson = cart
  }

  let items = cartJson['items']

  if(items.length == 0){
    localStorage.setItem('hasNoSub', false)
  }
  
  var hasSubProduct = false
  
  for(var i = 0; i < items.length; i++){
    if(items[i].title.toLowerCase().includes('auto renew')){
      hasSubProduct = true
      subProductQty = subProductQty + items[i]['quantity']
    }
  }

  if(hasSubProduct) {
    for(var i = 0; i < items.length; i++){
      if(!items[i].title.toLowerCase().includes('auto renew')){
        if($("div").find(`[data-id='${items[i].id}']`).find('.quick-cart__item-middle').find('.not-a-sub').length == 0){
          $("div").find(`[data-id='${items[i].id}']`).find('.quick-cart__item-middle').append('<div class="not-a-sub" style="font-style:italic; font-family: scandia; font-size: 15px;">One-time purchase will not be added to your subscription</div>')
        }
      } else {
        let productUrlFull = $("div").find(`[data-id='${items[i].id}']`).find('.quick-cart__item-middle').find('a').attr('href')
        let productUrlFixed = productUrlFull.split('?')[0].replace('-5', '-4')
        $("div").find(`[data-id='${items[i].id}']`).find('.quick-cart__item-middle').find('a').attr('href', productUrlFixed)
        
        let quantityDiv = $("div").find(`[data-id='${items[i].id}']`).find('.quick-cart__item-middle').find('div').find('.c-subdued')[0]
        let quantity = ''
        if(quantityDiv !== undefined){
          quantity = $("div").find(`[data-id='${items[i].id}']`).find('.quick-cart__item-middle').find('div').find('.c-subdued')[0]['innerText']
        }
        $("div").find(`[data-id='${items[i].id}']`).find('.quick-cart__item-middle').find('div').html('<span style="text-decoration:line-through">$12.00</span> $10.80 <span class="c-subdued">' + quantity + '</span>')
      }
    }
    
    $('#recharge_button').css('display', 'flex')
    $('#recharge_button_quick').css('display', 'flex')
    $('#buy_now_button').css('display', 'none')
    $('.additional-checkout-buttons').css('display', 'none')
    $('#one_time_button').css('display', 'none')
  } else {
    $('#buy_now_button').css('display', 'flex')
    $('#one_time_button').css('display', 'flex')
    $('#recharge_button').css('display', 'none')
    $('#recharge_button_quick').css('display', 'none')
  }

  let headerHeight = $("#shopify-section-header").height()
  let subsLetter = subProductQty == 1 ? 'one' : subProductQty == 2 ? 'two' : subProductQty == 3 ? 'three' : subProductQty == 4 ? 'four' : subProductQty == 5 ? 'five' : subProductQty
  let remainingSubs = 5 - subProductQty
  let remainingSubsLetter = remainingSubs == 1 ? 'one' : remainingSubs == 2 ? 'two' : remainingSubs == 3 ? 'three' : remainingSubs == 4 ? 'four' : 'five'
  let pack1 = subProductQty == 1 ? subsLetter + ' 4-Pack qualifying for subscription.' : subsLetter + ' 4-Packs qualifying for subscription.'

  if(subProductQty == 0){
    $('#shopify-section-header').css("top", "0px")
    $('#shopify-section-subscription-counter').css('display', 'none')
    $('#currentSubCount').text("no")
    $('.collection-nav-desktop').css("top", headerHeight + "px")
    $('.collection-nav-mobile').css("top", headerHeight + "px")
  } else if(subProductQty > 4){
    $('#shopify-section-header').css("top", "40px")
    $('.collection-nav-desktop').css("top", (headerHeight + 40) + "px")
    $('.collection-nav-mobile').css("top", (headerHeight + 40) + "px")
    $('#shopify-section-subscription-counter').css('display', 'flex')
    $('.sub_count_text').css('display', 'none')
    $('.sub_count_text_2').css('display', 'block')
  } else {
    $('#shopify-section-header').css("top", "40px")
    $('.collection-nav-desktop').css("top", (headerHeight + 40) + "px")
    $('.collection-nav-mobile').css("top", (headerHeight + 40) + "px")
    $('#shopify-section-subscription-counter').css('display', 'flex')
    $('#currentSubCount').text(pack1)
    $('.sub_count_text').css('display', 'block')
    $('.sub_count_text_2').css('display', 'none')
    $('#remainingSub').text(remainingSubsLetter)
  }

  return subProductQty
}

// Custom events have been added to the theme to make adding
// custom functionality easier. The below events have been
// exposed as well as the associated data for each event.
// To enable this functionality update the 'useCustomEvents' variable in
// the theme.liquid file to 'true'.
// This event fires whenever an item has been added to the cart.
// This event is exposed when the ajax cart is enabled.
// The product object is passed within the detail object.
document.addEventListener('cart:item-added', function (evt) {
  console.log('Item added to the cart');
  console.log(evt.detail.product);
}); // This event fires whenever the cart is updated.
// This event is exposed when the ajax cart is enabled.
// The cart object is passed within the detail object.

document.addEventListener('cart:updated', function (evt) {
  console.log('Cart updated');
  console.log(evt.detail.cart);
  checkCart()
}); // This event fires whenever there is an error when adding an item to the cart.
// This error is typically due to a product not having sufficient stock.
// The error message is passed within the detail object.

document.addEventListener('cart:error', function (evt) {
  console.log('Cart error');
  console.log(evt.detail.errorMessage);
}); // This event fires whenever the quick cart is opened.
// This event is exposed when the ajax cart is enabled.
// The cart object is passed within the detail object.

document.addEventListener('quick-cart:open', function (evt) {
  console.log('Quick cart opened');
  console.log(evt.detail.cart);
}); // This event fires whenever the quick cart is opened.
// This event is exposed when the ajax cart is enabled.

document.addEventListener('quick-cart:close', function () {
  console.log('Quick cart closed');
}); // This event fires whenever a variant product is selected.
// This event is exposed when a 'Variant selectors' block has been added to
// a product template or featured product section
// The selected variant object is passed within the detail object.

document.addEventListener('product:variant-change', function (evt) {
  console.log('Product variant changed');
  console.log(evt.detail.variant);
}); // This event fires whenever a product quanatiy is updated.
// This event is exposed when a 'Quantity selector' block has been added to
// a product template or featured product section
// The quantity and selected variant object is passed within the detail object.

document.addEventListener('product:quantity-update', function (evt) {
  console.log('Product quantity updated');
  console.log(evt.detail.quantity, evt.detail.variant);
});
