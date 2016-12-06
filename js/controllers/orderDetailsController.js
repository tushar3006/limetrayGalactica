limeTrayApp.controller('OrderDetailsController',function($scope,$stateParams,$state,ordersData){

    function initMap(order) {

        var myLatlng = {lat: order.customer.latitude, lng: order.customer.longitude};

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: {lat: order.customer.latitude, lng: order.customer.longitude}
        });

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Click to zoom'
        });

    }


    ordersData.fetchOrders($stateParams.orderId,0,50).then(function (response) {


        $scope.orderData = response.data[0];


        initMap(response.data[0]);
    });




})