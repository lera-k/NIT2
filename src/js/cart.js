import $ from "jquery";

export default function () {
    // console.error("HELLO!!!");
    $(document).ready(function () {
        let productArray = [];
        $('.js-add-to-cart').on('click', function (e) {
            console.log('Click worked');
            e.preventDefault();
            console.log('Item added ');
            let productJSON = {
                "id": $(this).attr('id'),
                "name": $(this).attr('name'),
                "image": $(this).attr('image_url'),
                "price": $(this).attr('price'),
                "special price": $(this).attr('special_price'),
                "quantity": ""
            };
            console.dir(productJSON);
            if (localStorage.getObj('product') != null) {
                productArray = localStorage.getObj('product');
                productArray.push(productJSON);
                localStorage.setObj('product', productArray);
            } else {
                productArray.push(productJSON);
                localStorage.setObj('product', productArray);
            }

            Storage.prototype.setObj = function (key, value) {
                this.setItem(key, JSON.stringify(value));
            }

            Storage.prototype.getObj = function (key) {
                let value = this.getItem(key);
                return value && JSON.parse(value);
            }
        });

        function gettingProduct(doneFn, array) {
            $.ajax({
                type: 'GET',
                url: `http://nit.tron.net.ua/api/product/${array[id]}`,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(doneFn)
                .fail(function (err) {
                    console.log("AJAX failed: " + JSON.stringify(err, null, 2));
                });
        }

        function buildingProduct(data) {

            console.log("Okey done" + JSON.stringify(data));

            let productContainer = $('.content');

            productContainer.empty();

            let productContent = "";

            $.each(data, function (array) {

                productContent += '<div class="content">' +
                    '<div class="product">' +
                    '<div class="product-image">' +
                    '<a href="detail.html#store/public/parent/detail/' + array.id + '">' +
                    '<img src="' + array.image + '" alt="" class="img-responsive">' +
                    '</a>' +
                    '</div>' +
                    '<div class="product-details">' +
                    '<h3><a class="product-title" href="">' + array.name + '</a></h3>' +
                    '<div class="product-price">' +
                    '<p class="price">$' + array.price + '</p>' +
                    '</div>' +
                    '<div class="product-quantity">' +
                    '<p class="quantity">$' + array.quantity + '</p>' +
                    '</div>' +
                    '<div class="product-removal">' +
                    '<button class="remove-product">' +
                    "Remove" +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            });
            productContainer.html('.content');
        }
    });
};

