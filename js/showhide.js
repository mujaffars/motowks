var tokenPresent = false;
var serverUrl = '';

$(window).on('load', function () {

    $('#header #icon_menu, #sidebar-left #icon_menu_close').click(function () {
        showHideSidebar();
    })
})

function hideScreen() {

}

function showLogin() {

}

function showHideSidebar() {
    if ($('#sidebar-left').css('display') !== 'block') {
        $('#sidebar-left').show("slide", {direction: "left"}, 100);
    } else {
        $('#sidebar-left').hide("slide", {direction: "left"}, 100);
    }
}

function showThePage(thePage, theFolder) {

    console.log('Inside show page ' + thePage + ' ' + theFolder);
    $('#main').html('');

    $.ajax({
        url: theFolder + "/" + thePage + '.html',
        type: 'GET',
        dataType: 'html',
        async: true,
        error: function () {
        },
        success: function (resp) {
            $("#main").html(resp);
            definePageEvents(thePage, theFolder);
            //getCustomerListing();
        }
    });

}

function definePageEvents(thePage, theFolder) {

    if (thePage === 'add' && theFolder === 'pages/customer') {
        $("#main").find('#vehicleNo').focus();
        $("#main").find('#btnCreateCustomer').click(function () {
            if ($("#main").find('#vehicleNo').val() === '') {
                toastr.error('Vehicle No required');
                $("#main").find('#vehicleNo').focus();
            } else if ($("#main").find('#customerFName').val() === '') {
                toastr.error('First name required');
                $("#main").find('#customerFName').focus();
            } else if ($("#main").find('#customerLName').val() === '') {
                toastr.error('Last name required');
                $("#main").find('#customerLName').focus();
            } else if ($("#main").find('#mobileNo').val() === '') {
                toastr.error('Mobile no required');
                $("#main").find('#mobileNo').focus();
            } else {
                var fdata = {
                    "firstname": $("#main").find('#customerFName').val(),
                    "lastname": $("#main").find('#customerLName').val(),
                    'vehicle_no': $("#main").find('#vehicleNo').val(),
                    'customername': $("#main").find('#customerName').val(),
                    'mobile_no': $("#main").find('#mobileNo').val()
                };

                dbCreateCustomer(fdata);
            }

        })
    } else if (thePage === 'list' && theFolder === 'pages/customer') {
        theNextFun = 'iterateCustList';
        getAllCustomer();
    } else if (thePage === 'search' && theFolder === 'pages/customer') {

        $("#main").find('#btnSearchCustomer').click(function () {
            if ($("#main").find('#vehicleNo').val() === '' && $("#main").find('#mobileNo').val() === '') {
                toastr.error('Vehicle No OR Mobile No required');
                $("#main").find('#vehicleNo').focus();
            } else {
                var searchData = {
                    "vehicleNo": $("#main").find('#vehicleNo').val(),
                    'mobile_no': $("#main").find('#mobileNo').val()
                };
                resp = searchCustomer(searchData);
            }
        })

    } else if (thePage === 'add' && theFolder === 'pages/servicing') {
        $('.clsServiceAddPage .clsLnkAddItem').click(function () {
            $('.clsServiceAddPage .divServicingItems').append($('.tblServItemsSkel').html());
        })

        $('.clsServiceAddPage #btnSaveInv').click(function () {

        })

        $('.clsServiceAddPage .clsCamBillImg').click(function () {
            getCameraImage();
        })
        
        setVehicleNoAutocomplete();
    }

}

function getCustomerListing() {
    $.ajax({
        url: serverUrl + "/getCustomers.html",
        type: 'GET',
        dataType: 'html',
        async: true,
        error: function () {
        },
        success: function (resp) {
            $("#main").html(resp);
            definePageEvents(thePage, theFolder);
            getCustomerListing();
        }
    });
}

function removeSItem(objRmElem) {
    $(objRmElem).parent().parent().remove();
}