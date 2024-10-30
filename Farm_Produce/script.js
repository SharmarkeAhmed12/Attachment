// initialize price array 
var bag = [];
// Animation:
$(document).ready(function() {
    $('.cart').click(function() {
        $('.checkout-container').fadeToggle();
    });

    $('.checkout').addClass('disabled');
    $('#bin').addClass('disabled');
});

$(document).on('click', '.add-to-cart', function(e) {
    e.preventDefault();
    $('.empty').hide();

    //disable mutiple clicks
    if ($(this).hasClass('disable')) {
        return false;
    }
    $(document).find('.add-to-cart').addClass('disable');
    //---------------------------------------------------------



    var parent = $(this).parents('.snip');
    var src = parent.find('img').attr('src');
    var cart = $(document).find('.cart');

    //return the coordinates of a element
    var posTop = parent.offset().top;
    var posLeft = parent.offset().left;

    $('<img />', {
        class: 'animation-fly',
        src: src
    }).appendTo('body').css({
        'top': posTop,
        'left': parseInt(posLeft)
    });

    setTimeout(function() {
        $(document).find('.animation-fly').css({
            'top': cart.offset().top,
            'left': cart.offset().left
        });
        setTimeout(function() {
            $(document).find('.animation-fly').remove(); //after fly
            var quantity = parseInt(cart.find('#count-item').data('count')) + 1;
            //       if(quantity<2){
            //         cart.find('#count-item').text(quantity + ' item').data('count', quantity);
            //       }else{
            //         cart.find('#count-item').text(quantity + ' items').data('count', quantity);
            //       }
            cart.find('#count-item').text(quantity + (quantity < 2 ? ' item' : ' items')).data('count', quantity);

            //add item to cart
            var name = parent.find('h4').text();
            var price = parent.find('.real').text();
            var txt3 = document.createElement("hr");
            var txt4 = document.createElement("hr");

            $('.col1-name').append(name, txt3);
            $('.col2-price').append(price, txt4);
            $('.checkout').addClass('add-animation');
            $('.checkout').removeClass('disabled');

            $('#bin').addClass('add-animation2');
            $('#bin').removeClass('disabled');

            //find total amount
            var price2 = parseFloat(parent.find('.real').data('price')); //get "data-price" from <div class="real">
            bag.push(price2);
            var total = 0;
            $(".total-amount").text(function() {
                for (var i in bag) {
                    total += bag[i]; //calculate sum of all numbers in the array 
                }
                var last = "Ksh. " + total.toFixed(2);
                $('.pay-last').text(last);
                return last; // return total only -> bug.

            });

            $(document).find('.add-to-cart').removeClass('disable');
        }, 1000);
    }, 500);

    $('.bin').on('click', function() {
        $('.col1-name').empty();
        $('.col2-price').empty();
        $('.empty').show();
        $('.checkout').removeClass('add-animation');
        $('#bin').removeClass('add-animation2');
        $('.checkout').addClass('disabled');
        $('#bin').addClass('disabled');
        bag = [];
        $('.total-amount').add('.pay-last').text("$ " + bag.length);
        cart.find('#count-item').text(0 + ' item').data('count', 0);
    });

});




//------------------PAYMENTS----------------------

$(document).ready(function() {
    $('#coupon').on('click', function() {
        alert("minhquanghust.blogspot.com Coupon Code:" + '\n' + "25% off: 0511Q-1601CV" + '\n' + "15% off: 0511Q-1701NA" + '\n' + "10% off: 0511Q-1901QA")
    });
})

////Saving Data for Order Details Processing
function saveData() {
    // Get the form data
    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let checkoutData = { name: name, phone: phone, address: address };
    // Store the data in session storage
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    // Redirect to the order details page
    //window.location.href = 'order-detail.html';

}



//Retrieve the cart data when pay now button is clicked
document.getElementById("pay-now").addEventListener("click", function() {
    // Retrieve the cart data from local storage
    var cartData = JSON.parse(localStorage.getItem("cartData"));
    if (cartData) {
        // Save the cart data to local storage
        localStorage.setItem("orderData", JSON.stringify(cartData));
    }
    // Redirect the user to the order details page
    window.location.href = "index.php";
});

$(document).on('click', '.add-to-cart', function(e) {
    e.preventDefault();
    $('.empty').hide();
    var parent = $(this).parents('.snip');
    var src = parent.find('img').attr('src');
    var cart = $(document).find('.cart');
    var posTop = parent.offset().top;
    var posLeft = parent.offset().left;

    // Retrieve the cart data from local storage
    var cartData = JSON.parse(localStorage.getItem("cartData"));
    // Check if cart data exists
    if (!cartData) {
        cartData = [];
    }
    // create a new item object
    var item = {
        name: parent.find('h4').text(),
        img: src,
        price: parent.find('.real').text()
    };
    cartData.push(item);
    // Save the cart data to local storage
    localStorage.setItem("cartData", JSON.stringify(cartData));
});