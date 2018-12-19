var app = angular.module('app', ['ngRoute'])


app.config(($routeProvider) => {
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/home.html',
                    resolve: {
                        data: function(service) {
                            return service.getdata()
                        }
                    }
                })
                .when('/search', {
                    templateUrl: '/partials/dash.html',
                    controller: 'dash',
                    controllerAs: 'ctrl',
                    resolve: {
                        data: function(service) {
                            return service.getdata()
                        }
                    }
                })
                    .when('/hotel', {
                        templateUrl: '/partials/details.html',
                        controller: 'detail',
                        resolve: {
                            data: function(service) {
                                return service.getcurrenthoteldetails()
                            }
                        }
                    })
                })

            $(function() {
                $('[data-toggle="tooltip"]').tooltip()
            })