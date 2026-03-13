"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Vaythan
   Date:   3/12/2026
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/ 










window.addEventListener("load", function() {
   var orderForm = document.forms.cart;

   // Calculate the cost of the order
   calcCart();

   // Event handlers for the web form
   orderForm.elements.modelQty.onchange = calcCart;

   var shippingOptions = document.querySelectorAll('input[name="shipping"]');
   for (var i = 0; i< shippingOptions.length; i++) {
      shippingOptions[i].onclick = calcCart;
   }
});

function calcCart() {
   var orderCost = document.forms.cart;

   // Calculate the initial cost of the order
   var modelCost = Number(orderCost.elements.modelCost.value);
   var qty = Number(orderCost.elements.modelQty.value);

   // Initial cost = model cost x quantity
   var initialCost = modelCost * qty;
   orderCost.elements.orderCost.value = formatUSCurrency(initialCost);

   // Retrieve the cost of the shipping
   var shipCost = Number(document.querySelector('input[name="shipping"]:checked').value);
   orderCost.elements.shippingCost.value = formatNumber(shipCost, 2)

   // Calculate the order subtotal
   var subTotal = initialCost + shipCost
   orderCost.elements.subTotal.value = formatNumber(subTotal, 2);

   // Calculate the salesTax
   var salesTax = subTotal * 0.05;
   orderCost.elements.salesTax.value = formatNumber(salesTax, 2);

   // Calculate the total
   var cartTotal = initialCost + shipCost + salesTax;
   orderCost.elements.cartTotal.value = formatUSCurrency(cartTotal);


}








function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}