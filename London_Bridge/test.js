<script>
(function() {

    window.ga('require', 'ecommerce', 'ecommerce.js');

    window.ga('ecommerce:addTransaction', {
        'id': '${orderId}',
        'affiliation': '${storefront}',
        'revenue': '${total}',
        'shipping': '${shipping}',
        'tax': '${tax}',
        'currencyCode': '${currency}'
    });

    var items = window.universal_variable.transaction.line_items;

    var getTime = function(date) {
        return date.substring(11, 16);
    };

    for (var i = 0; i < items.length; i++) {
        var _this = items[i];
        var tickets = _this.tickets[0];
        var journeys = tickets.journeys[0];

        window.ga('ecommerce:addItem', {
            'id': '${orderId}',
            'name': [journeys.origin, getTime(journeys.start), journeys.destination, getTime(journeys.arrivalTime)].join('|'),
            'sku': [tickets.fare_type, tickets.ticket_type, journeys.adults || "0", journeys.children || "0", tickets.railcard || "No railcard"].join('|'),
            'category': '${vendor}',
            'price': tickets.unit_sale_price,
            'quantity': _this.quantity
        });
    }

    window.ga('ecommerce:send');

}());
</script>