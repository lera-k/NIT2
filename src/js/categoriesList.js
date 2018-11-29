import $ from 'jquery';
import connectCart from './cart';

connectCart();
$(document).ready(function () {
    // build nav menu
    $.ajax({
        type: "GET",
        url: "http://nit.tron.net.ua/api/category/list",
        success: function (data) {
            buildCategoryList(data);
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;

            }
        }
    }).done(function () {
        buildCategory('.js-category-open');
        // showAllProducts('.js-open-all-products');
    });
    // show all products
    getCategory();


    // build category list (nav menu)
    function buildCategoryList(arr) {
        let temp = [];
        let workArray = arr;
        for (let i = 0; i < workArray.length; i++) {
            temp.push(`<div class="list-group-item" data-category-number=${workArray[i]['id']}> 
        <a class="js-category-open" href="#">${workArray[i].name}</a>
        </div>`)
        }
        $('#categories').html(temp.join(""));
    }

    // build category products
    function buildCategory(openEl) {
        $(openEl).on('click', function (e) {
            e.preventDefault();
            let id = $(this).parents('.list-group-item').attr('data-category-number');
            if (id == 1) {
                getCategory()
            } else {
                getCategory(id);
            }
        });
    }


    // get data from category and build products
    function getCategory(id) {
        var url;
        if (id) {
            url = `http://nit.tron.net.ua/api/product/list/category/${id}`;
        } else {
            url = `http://nit.tron.net.ua/api/product/list`;
        }
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                buildProducts(data);
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                $('#post').html(`<div style='font-size: 32px; font-weight: 600; text-align: center;'>${msg}</div><div style='font-size: 28px; font-weight: 600; text-align: center'>Try again later</div>`);
            }
        }).done(function () {
            console.log('getCa');
            showPopUp('.js-product-open', '.js-close');
            showCartWindow('.js-cart-open', '.js-close');
            initAddButton();
        })
    }


    // show modal window
    function showPopUp(openEl, closeEl) {
        $(openEl).on('click', function (e) {
            e.preventDefault();
            $('#productModal').addClass('isActive');
            let id = $(this).parents('.js-card').attr('data-product-id');
            getProduct(id);
        });
        closeWindows('#productModal', '.js-close');
    }

    // close modal window
    function closeWindows(windowToClose, closeEl) {
        $(closeEl).on('click', function (e) {
            e.preventDefault();
            $(windowToClose).removeClass('isActive');
        })
    }

    // get product in modal
    function getProduct(id) {
        $.ajax({
            type: "GET",
            url: `http://nit.tron.net.ua/api/product/${id}`,
            success: function (data) {
                // buildCategory(data);
                $('.js-modal-body').html(
                    `<div class="modal-content">
                <div class="modal-header">
                    <a href="#" data-dismiss="modal" class="class pull-right"><span class="glyphicon glyphicon-remove"></span></a>
                    <h3 class="modal-title">${data.name}</h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 product_img">
                            <img src="${data.image_url}" class="img-responsive" style='width:100%'>
                        </div>
                        <div class="col-md-6 product_content">
                            <p>${data.description}</p>
                            
                            <h3 class="cost">
                                <span class="glyphicon glyphicon-usd ${data.special_price ? 'showCost' : 'hideCost'}"></span> 
                                ${data.special_price}
                                <small class="pre-cost">
                                    <span class="glyphicon glyphicon-usd"></span> 
                                    ${data.price}
                                </small>
                            </h3>
                            <div class="btn-ground js-cart-open js-add-to-cart">
                                <button type="button" class="btn btn-primary js-cart-open js-add-to-cart"><span class="glyphicon glyphicon-shopping-cart js-cart-open js-add-to-cart"></span> Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `
                )
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                $('#post').html(`<div style='font-size: 32px; font-weight: 600; text-align: center;'>${msg}</div><div style='font-size: 28px; font-weight: 600; text-align: center'>Try again later</div>`);
            }
        }).done(function () {
            showCartWindow('.js-cart-open', '.js-close');
        })
    }

    // build product in products list
    function buildProducts(arr) {
        let temp = [];
        let workArray = arr;
        for (let i = 0; i < workArray.length; i++) {
            // temp.push(`<div class='list-group-item' data-category-number=${i}> ${workArray[i].name}</div>`);

            temp.push(`<div class="col-lg-4 col-md-6 mb-4">
            <div data-product-id="${workArray[i]['id']}" class="card js-card h-100">
            <a class="js-product-open" href="#">
                <img class="card-img-top js-card-img" data-card-img="${workArray[i]['image_url']}" src="${workArray[i]['image_url']}" alt="">
            </a>
            <div class="card-body">
                <h4 class="card-title js-card-title" data-card-name="${workArray[i]['name']}">
                    <a class="js-product-open" href="#">${workArray[i]['name']}</a>
                </h4>
                <div class="card-price js-card-price" data-card-price="${workArray[i]['price']}">${workArray[i]['price']}</div>
                <p class="card-text js-card-text" data-card-text="${workArray[i]['description']}">${workArray[i]['description']}</p>
                 <div class="btn-ground js-cart-open">
                            <button type="button" class="btn btn-primary js-cart-open js-add-to-cart">
                                <span class="glyphicon glyphicon-shopping-cart js-cart-open"></span> Add To Cart</button>
                            </div>
            </div>
            </div>
        </div>`);
        }
        $('#all-products').html(temp.join(""));
    }

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })

    function showCartWindow(openEl, closeEl) {
        $(openEl).on('click', function (e) {
            e.preventDefault();
            $('#cartModal').addClass('isActive');
        });
        closeWindows('#cartModal', '.js-close');
    }

    function initAddButton() {
        $('.js-add-to-cart').on('click', function (el) {
            var item = $(this).parents('.js-card');
            addProductToCart(item);
            buildCart();
            changeQvalue();
            updateCart();
        });
    }


    function addProductToCart(el) {
        // double call
        var currentArr;
        var addedProducts = localStorage.getItem('addedProducts');
        if (!addedProducts) {
            currentArr = [];
            var prodId = $(el).attr('data-product-id');
            var productName = $(el).find(".js-card-title").attr('data-card-name');
            var productPrice = $(el).find(".js-card-price").attr('data-card-price');
            var productImg = $(el).find(".js-card-img").attr('data-card-img');
            var product = {
                id: prodId,
                name: productName,
                price: productPrice,
                img: productImg,
                quantity: 1
            }
            currentArr.push(product);
            console.log(currentArr);
            localStorage.setItem('addedProducts', JSON.stringify(currentArr));
        } else {
            console.log('Added products');
            currentArr = JSON.parse(addedProducts);
            var prodId = $(el).attr('data-product-id');
            var check;
            var ind;
            // check if this product is in the basket
            currentArr.forEach(function (el, i) {
                if (el.id == prodId) {
                    check = true;
                    ind = i;
                }
            });

            if (check) {
                currentArr[ind].quantity += 1;
                localStorage.setItem('addedProducts', JSON.stringify(currentArr));
            } else {
                var prodId = $(el).attr('data-product-id');
                var productName = $(el).find(".js-card-title").attr('data-card-name');
                var productPrice = $(el).find(".js-card-price").attr('data-card-price');
                var productImg = $(el).find(".js-card-img").attr('data-card-img');
                var product = {
                    id: prodId,
                    name: productName,
                    price: productPrice,
                    img: productImg,
                    quantity: 1
                }
                currentArr.push(product);
                localStorage.setItem('addedProducts', JSON.stringify(currentArr));
            }
        }
    }

    function buildCart() {
        let temp = [];
        let workArray = JSON.parse(localStorage.getItem('addedProducts'));
        workArray.forEach(function (el) {
            temp.push(`
                     <li class="cart__item" data-product-id="${el.id}">
                        <img class="cart__item__img" data-card-img="${el.img}" src="${el.img}" alt="${el.name}">
                        <input type="text" name="ID-${el.id}" hidden>
                        <div class="cart__item__info">
                            <div class="cart__item__name" data-card-name="${el.name}">${el.name}</div>
                            <div class="cart__item__price js-cart__item__price" data-card-price="${el.price}">${el.price}</div>
                        </div>
                        <div class="cart__quantity">
                            <input type="number" name="products[${el.id}]" id="${el.id}" class="cart__item__quantity" value="${el.quantity}" hidden>
                            <div class="cart__quantity__minus">-</div>
                            <div class="cart__quantity__blanc" data-card-quantity="${el.quantity}">${el.quantity}</div>
                            <div class="cart__quantity__plus">+</div>
                        </div>
                        <div class="cart__item__total js-cart__item__total">${el.price * el.quantity}</div>
                    </li>
                `);
        });
        $('.js-cart__list').html(temp.join(""));
    }

    function changeQvalue() {
        $('.cart__quantity__minus').on('click', function() {
            var blanc = $(this).parents('.cart__quantity').find('.cart__quantity__blanc');
            var input = $(this).parents('.cart__quantity').find('.cart__item__quantity');
            var value = Number(input.val());
            var price = Number( $(this).parents('.cart__item').find('.js-cart__item__price').text() );
            var total = $(this).parents('.cart__item').find('.js-cart__item__total');
            value -= 1;

            if(value > 0) {
                blanc.text(value);
                blanc.attr('data-card-quantity', value);
                input.val(value);
                total.text(price * value).fadeIn(300);
            } else {
                $(this).parents('.cart__item').remove();
            }
        });

        $('.cart__quantity__plus').on('click', function() {
            var blanc = $(this).parents('.cart__quantity').find('.cart__quantity__blanc');
            var input = $(this).parents('.cart__quantity').find('.cart__item__quantity');
            var value = Number(input.val());
            var price = Number( $(this).parents('.cart__item').find('.js-cart__item__price').text() );
            var total = $(this).parents('.cart__item').find('.js-cart__item__total');

            value += 1;

            if(value > 0) {
                blanc.text(value);
                blanc.attr('data-card-quantity', value);
                input.val(value);
                total.text(price * value).fadeIn(300);
            }
        });
    }

    function  updateCart() {
        $('.js-close--form').on('click', function() {
            console.log("CLICK");
            var addedProducts = localStorage.getItem('addedProducts');
            var workArr = $(this).parents(".js-cart").find(".cart__item");
            var tempArr = [];

            if (!addedProducts || !workArr.length) {
                return;
            }


            for (var i = 0; i < workArr.length; i++ ) {
                var el = workArr[i];
                var prodId = $(el).attr('data-product-id');
                var productName = $(el).find(".cart__item__name").attr('data-card-name');
                var productPrice = $(el).find(".cart__item__price").attr('data-card-price');
                var productImg = $(el).find(".cart__item__img").attr('data-card-img');
                var productQuantity =  Number($(el).find(".cart__quantity__blanc").attr('data-card-quantity'));
                var product = {
                    id: prodId,
                    name: productName,
                    price: productPrice,
                    img: productImg,
                    quantity: productQuantity
                };
                tempArr.push(product);
            }

            localStorage.setItem('addedProducts', JSON.stringify(tempArr));
        });
    }

});