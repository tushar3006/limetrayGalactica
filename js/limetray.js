var limeTrayApp = angular.module('limetray', ['ui.router']);

limeTrayApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/orders');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('orders', {
            url: '/orders',
            templateUrl: 'html/orders.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('orderDetails', {
            url: '/details/:orderId',
            templateUrl: 'html/orderDetails.html'
        });

});


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
        controller: function ($http, $scope, $timeout , ordersData,$state) {

            var orders = $scope.orders = {
                list: [],
                getOrders: getOrders,
                getDetails: getDetails,
                activeOrder: {},
                updateStatus: updateOrderStatus
            }
            var map;

            $("#detailsModal").on("shown.bs.modal", function () {
                google.maps.event.trigger(map, "resize");
                initMap(orders.activeOrder);
            });




            function getDetails(order) {
                //$scope.$emit('orderData',order);
                $state.go('orderDetails',{orderId:order.orderId})
            }


            function getOrders(start, end, search) {

                ordersData.fetchOrders(search,start,end,$scope.state).then(function (response) {

                        if (!search && start && end)
                            orders.list = orders.list.concat(response.data);
                        else
                            orders.list = response.data;
                    })

            }

            function updateOrderStatus(order) {

                ordersData.updateStatus(order).then(function (response) {

                    $scope.updateMessage = response.data.message;
                    setTimeout(function () {
                        $scope.updateMessage = '';
                        $scope.$digest();
                    }, 2000)

                });
            }

            orders.getOrders(orders.list.length, orders.list.length + 50, '', '');


        }
    }
});