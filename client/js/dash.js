app.controller('dash', function($scope, service) {
    console.log(service.data)
    $scope.hotels = service.data
    $scope.query = ''
    $scope.itemsperpage = 5
    $scope.currentpage = 0
    $scope.buttonlist = [1, 2, 3, 4, 5]
    $scope.currentpagedata = []

    $scope.pagination = function(number, data) {
        $scope.itemsinpage = []
        let items = [],
            index = data.length,
            startindex = 0,
            endindex = $scope.itemsperpage,
            residue = data.slice(index - (index % number), index),
            flag = parseInt(data.length / $scope.itemsperpage)
        while (flag) {
            flag = flag - 1
            $scope.itemsinpage.push(data.slice(startindex, endindex))
            startindex = startindex + $scope.itemsperpage
            endindex = endindex + $scope.itemsperpage
        }
        $scope.itemsinpage.push(residue)
        $scope.currentpagedata = $scope.itemsinpage[$scope.currentpage]
    }

    $scope.getpageslist = function() {
        if ($scope.itemsinpage.length > 20) {
            return true
        } else {
            return false
        }
    }

    $scope.next = function() {
        let pages = []
        for (var i = 0; i < 5; i++) {

            $scope.buttonlist[i] = $scope.buttonlist[i] + 1
        }
        $scope.currentpagedata = $scope.itemsinpage[$scope.currentpage + 1]
        $scope.currentpage = $scope.currentpage + 1


    }

    $scope.prev = function() {
        let pages = []
        if ($scope.buttonlist[0] > 1) {
            for (var i = 0; i < 5; i++) {
                $scope.buttonlist[i] = $scope.buttonlist[i] - 1
            }
            $scope.currentpagedata = $scope.itemsinpage[$scope.currentpage - 1]
            $scope.currentpage = $scope.currentpage - 1

        }


    }

    $scope.goto = function(index) {
        $scope.currentpage = index
        $scope.currentpagedata = $scope.itemsinpage[index]
    }

    $scope.search = function() {
        let items = []
        if ($scope.query) {
            let query = $scope.query.toString().toLowerCase()
            $scope.hotels.forEach((item) => {
                Object.values(item).forEach((d) => {
                    d = d.toString().toLowerCase()
                    if (d.includes(query)) {
                        items.push(item)
                    }
                })
            })
            $scope.pagination($scope.itemsperpage, items)
        } else {
            $scope.pagination($scope.itemsperpage, $scope.hotels)
        }
    }

    $scope.details = function(data) {
        service.setcurrentHotel(data.hotel._id)
        window.location.assign("#!/hotel")
    }


    $scope.pagination($scope.itemsperpage, $scope.hotels)
})