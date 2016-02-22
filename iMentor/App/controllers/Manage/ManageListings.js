﻿
app.controller('manageListingsCtrl', ['$scope', '$rootScope', '$location', 'manageService',
    function ManageListingsCtrl($scope, $rootScope, $location, manageService) 
    {
        $scope.currentUserIsAdmin = true;
        getListings();

        // ---------------------------------------------------------------
        // Grid
        // ---------------------------------------------------------------
        $scope.gridOptions = {
            data: "listings",
            columnDefs: [
            { field: 'ID', displayName: 'Id', visible: false },
            { field: 'Title', displayName: 'Title', width: '15%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Mentor', displayName: 'Mentor', width: '15%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Area', displayName: 'Area', width: '10%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Description', displayName: 'Description', width: '15%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'StartDate', displayName: 'Start Date', width: '15%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'EndDate', displayName: 'End Date', width: '15%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Email', displayName: 'Email', width: '15%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            {
                field: ' ',
                displayName: 'Edit',
                width: '5%',
                cellTemplate: 'Templates/EditBtn.html',
                cellClass: 'gridCellCenter',
                headerClass: 'gridHeaderCenter',
                sortable: false
            },
            {
                field: ' ',
                displayName: 'Delete',
                width: '8%',
                cellTemplate: 'Templates/DltBtn.html',
                cellClass: 'gridCellCenter',
                headerClass: 'gridHeaderCenter',
                sortable: false
            },
            ],
            enableColumnResize: true,
            enableSorting: true,
            enableHighlighting: false,
            selectWithCheckboxOnly: true,
            keepLastSelected: false,
            multiSelect: false,
            showSelectionCheckbox: false,
            showColumnMenu: false,
            showFilter: false,
            showGroupPanel: false,
            showFooter: false,
            useExternalSorting: false,
            beforeSelectionChange: function ()
            {
                return false;
            },
            rowHeight: 35
        };

        // ---------------------------------------------------------------
        // Manage Listings
        // ---------------------------------------------------------------
        function getListings() {
            manageService.getListings()
                .success(function (listings) {
                    for (var i = 0; i < listings.length; i++) {
                        listings[i].StartDate = new Date(parseInt(listings[i].StartDate.substr(6)));
                        listings[i].EndDate = new Date(parseInt(listings[i].EndDate.substr(6)));
                    }

                    $scope.listings = listings;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }

        $scope.deleteListing = function (row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            var listing = null;

            for (var i = 0; i < $scope.listings.length; i++)
            {
                if($scope.listings[i].ID == row.entity.ID){
                    listing = $scope.listings[i];
                }
            }

            manageService.deleteListing(listing)
                .success(function (listings) {
                    getListings();
                });
        }

        $scope.refreshListings = function () {
            getListings();
        }


        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.addListing = function ()
        {
            $scope.editListing(0);
            getListings();
        }

        $scope.editListing = function (listingId)
        {
            $location.path("/EditListing/" + listingId);
        }
        
        $scope.showInactiveListings = function()
        {
            console.log("Show Inactive Listings");
        }
    }
]);