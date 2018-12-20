app.service('service', function($http) {

    this.data = []

    this.setcurrentHotel = function(data) {
        this.currenthotelid = data
    }

    this.getcurrenthoteldetails = async function() {
        await $http({
            method: 'GET',
            url: '/api/hoteldata?' + this.currenthotelid,
            body: {
                "id": this.currenthotelid
            }
        }).then((response) => {
            this.currenthoteldetails = response.data
        })
    }



    this.getdata = async function() {
        await $http({
            method: 'GET',
            url: '/api/hotels'
        }).then((response) => {
            this.data = response.data
        })
    }
})