
var limeTrayApp = angular.module('limetray', ['mockApi']);


limeTrayApp.directive('scroll', function () {
    return {
        restrict: 'C',
        scope: {
            src: "@",
        },
        templateUrl: 'partials/orders-table.html',
        link: function (scope, element, attrs) {
            element.bind('scroll', function () {
                var raw = element[0];

                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight)
                    scope.orders.getOrders(scope.orders.list.length, scope.orders.list.length + 30)
            })
        },
        controller: function($http, $scope, $timeout) {

            var orders = $scope.orders = {list: [], getOrders: getOrders, getDetails: getDetails, activeOrder: {} ,updateStatus : updateOrderStatus}
            var map;

            $("#detailsModal").on("shown.bs.modal", function () {
                google.maps.event.trigger(map, "resize");
                initMap(orders.activeOrder);
            });

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


            function getDetails(order) {

                this.activeOrder = order;
                initMap(order);
            }


            function getOrders(start, end) {


                $http.post('/getOrders', {start: start, end: end}).then(function (response) {
                    orders.list = orders.list.concat(response.data);
                });
            }

            function updateOrderStatus(order){
                $http.post('/updateOrdersStatus',order).then(function (response) {

                    $scope.updateMessage = response.data.message;
                    setTimeout(function(){
                        $scope.updateMessage = '';
                        $scope.$digest();
                    },2000)

                });
            }

            orders.getOrders(orders.list.length, orders.list.length + 50);


        }
    }
});