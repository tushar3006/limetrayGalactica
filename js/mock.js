var mockApi = angular.module('myAppE2E', ['ngMockE2E']);

 mockApi.run(function ($httpBackend, $http) {
    $httpBackend.expectPOST('/getOrders').respond(function (method, url, data) {
        var query = JSON.parse(data);
        return [200, phones.slice(query.start, query.end), {}];
    });


    $httpBackend.whenPOST('/getOrders').respond(function (method, url, data) {
        var query = JSON.parse(data);
        return [200, phones.slice(query.start, query.end), {}];
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