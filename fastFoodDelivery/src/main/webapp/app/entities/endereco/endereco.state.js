(function() {
    'use strict';

    angular
        .module('fastFoodDeliveryApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('endereco', {
            parent: 'entity',
            url: '/endereco?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'fastFoodDeliveryApp.endereco.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/endereco/enderecos.html',
                    controller: 'EnderecoController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('endereco');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('endereco-detail', {
            parent: 'endereco',
            url: '/endereco/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'fastFoodDeliveryApp.endereco.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/endereco/endereco-detail.html',
                    controller: 'EnderecoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('endereco');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Endereco', function($stateParams, Endereco) {
                    return Endereco.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'endereco',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('endereco-detail.edit', {
            parent: 'endereco-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/endereco/endereco-dialog.html',
                    controller: 'EnderecoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Endereco', function(Endereco) {
                            return Endereco.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('endereco.new', {
            parent: 'endereco',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/endereco/endereco-dialog.html',
                    controller: 'EnderecoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                cep: null,
                                endereco: null,
                                numero: null,
                                complemento: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('endereco', null, { reload: 'endereco' });
                }, function() {
                    $state.go('endereco');
                });
            }]
        })
        .state('endereco.edit', {
            parent: 'endereco',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/endereco/endereco-dialog.html',
                    controller: 'EnderecoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Endereco', function(Endereco) {
                            return Endereco.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('endereco', null, { reload: 'endereco' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('endereco.delete', {
            parent: 'endereco',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/endereco/endereco-delete-dialog.html',
                    controller: 'EnderecoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Endereco', function(Endereco) {
                            return Endereco.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('endereco', null, { reload: 'endereco' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
