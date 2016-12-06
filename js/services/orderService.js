limeTrayApp.service('ordersData',function($http){


    this.fetchOrders = function (search,start,end,state){

        if (search)
            var query = 'http://52.66.18.20:3000/orders/search?start=' + start + '&end=' + end + '&searchString=' + search + '&status=' + state;
        else
            var query = 'http://52.66.18.20:3000/orders/search?start=' + start + '&end=' + end + '&status=' + state;


        return $http.get(query)
    }

    this.updateStatus = function(order) {
      return $http.post('http://52.66.18.20:3000/orders/updateStatus', order);
    }



})