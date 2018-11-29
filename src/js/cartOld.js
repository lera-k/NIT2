import $ from "jquery";

$(document).ready(function () {
    generateItems();

function generateItems() {
    let array = JSON.parse(sessionStorage.getItem("myProducts"));
    if (array === null) return;
    for (let i = 0; i < array.length; i++) {
        $.ajax({
            type: "GET",
            url: `http://nit.tron.net.ua/api/product/${array[i]}`,
            success:function (data) {
                buildProductsInCart(data);
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
        });
    }
}
function buildProductsInCart(arr) {
    let temp = [];
    let workArray = arr;
    temp.push(`<div class="content">
    <div class="product">
    <div class="product-image">
      <img src=${workArray['image_url']}>
    </div>
    <div class="product-details">
      <div class="product-title">${workArray['name']}</div>
    </div>
    <div class="product-price">${workArray['price']}</div>
    <div class="product-quantity">
      <input type="number" value="2" min="1">
    </div>
    <div class="product-removal">
      <button class="remove-product">
        Remove
      </button>
    </div>
    <div class="product-line-price">${data['price']}</div>
  </div></div>`);
}
});