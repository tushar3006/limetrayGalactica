var mockApi = angular.module('mockApi', ['ngMockE2E']);

 mockApi.run(function ($httpBackend, $http) {
    $httpBackend.expectPOST('/getOrders').respond(function (method, url, data) {
        var query = JSON.parse(data);
        return [200, phones.slice(query.start, query.end), {}];
    });


    $httpBackend.whenPOST('/getOrders').respond(function (method, url, data) {
        var query = JSON.parse(data);
        return [200, phones.slice(query.start, query.end), {}];
    });


     $httpBackend.whenPOST('/updateOrdersStatus').respond(function (method, url, data) {

         var data =  JSON.parse(data);
         return [200, {message: 'Order Id '+ data.orderId + ' Updated Successfully to ' + data.state + ' state' }, {}];
    });



    $http.get('data.json').then(function (res) {
        phones = res.data;
        setTimeout(function () {
            $httpBackend.flush();
        });
    });


    $httpBackend.whenGET('data.json').passThrough();
    $httpBackend.whenGET('partials/orders-table.html').passThrough();


});