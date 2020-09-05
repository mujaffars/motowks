var tokenPresent = false;
var serverUrl = '';
var custDtlId = '';

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
                $('.toast').focus();
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
                showModal('loader');
                dbCreateCustomer(fdata);
            }
        })
    } else if (thePage === 'list' && theFolder === 'pages/customer') {
        showModal('loader');
        theNextFun = 'iterateCustList';
        getAllCustomer();
    } else if (thePage === 'search' && theFolder === 'pages/customer') {

        $('#main .divCustSec').click(function () {
            custDtlId = $(this).parent().attr('cust_id');
            showThePage('detail', 'pages/customer');
        })

        $("#main").find('#btnSearchCustomer').click(function () {
            if ($("#main").find('#vehicleNo').val() === '' && $("#main").find('#mobileNo').val() === '') {
                toastr.error('Vehicle No OR Mobile No required');
                $("#main").find('#vehicleNo').focus();
            } else {
                showModal('loader');
                var searchData = {
                    "getfor": 'cust',
                    "vehicleNo": $("#main").find('#vehicleNo').val(),
                    'mobile_no': $("#main").find('#mobileNo').val()
                };
                theNextFun = 'showSearchCust';
                resp = searchCustomer(searchData);
            }
        })

    } else if (thePage === 'add' && theFolder === 'pages/servicing') {

        $(".clsServiceAddPage #invoiceDate").val(moment().format('YYYY-MM-DD'));

        $('.clsServiceAddPage .clsLnkAddItem').click(function () {
            $('.clsServiceAddPage .divServicingItems').append($('.tblServItemsSkel').html());
        })

        $('.tblServicing .clsSpanVno').html($('#header').attr('addservvehno'));

        $('.clsServiceAddPage #btnSaveInv').click(function () {
            if ($("#main").find('#vehicleNo').val() === '') {
                toastr.error('Vehicle No required');
                $("#main").find('#vehicleNo').focus();
            } else if ($("#main").find('#invTotalAmt').val() === '') {
                toastr.error('Invoice amount required');
                $("#main").find('#invTotalAmt').focus();
            } else {
                var fdata = {
                    'cust_id': $("#header").attr('addservfor'),
                    'vehicle_no': $(".tblServicing .clsSpanVno").attr('clsSpanVno'),
                    "invTotalAmt": $("#main").find('#invTotalAmt').val(),
                    "invdate": $("#main").find('#invoiceDate').val(),
                    'invSummary': $("#main").find('#invSummary').val(),
                    'reservice_date': $("#main").find('#reserviceDate').val(),
                    'vehicleKmrun': $("#main").find('#vehicleKmrun').val(),
                    'billImgUri': ''
                };

                dbCreateInvoice(fdata);
            }
        })

        $('.clsServiceAddPage #btnCancleInv').click(function () {
            custDtlId = $('#header').attr('addservfor');
            showThePage('detail', 'pages/customer');
        })

        $('.clsServiceAddPage .clsCamBillImg').click(function () {
            getCameraImage();
        })

        setVehicleNoAutocomplete();
    } else if (thePage === 'detail' && theFolder === 'pages/customer') {
        var fdata = {
            'id': custDtlId,
            'getfor': 'custinv'
        }
        theNextFun = 'iterateCustDetail';
        getCustAndInvoices(fdata);
    } else if (thePage === 'edit' && theFolder === 'pages/customer') {
        theNextFun = 'showEditCustData';

        $('.tblEditCust #btnUpdateCustomer').click(function () {
            
            if ($("#main").find('#vehicleNo').val() === '') {
                toastr.error('Vehicle No required');
                $("#main").find('#vehicleNo').focus();
            } else {
                var fdata = {
                    'cust_id': $("#main .tblEditCust").attr('cust_id'),
                    "firstname": $("#main").find('#customerFName').val(),
                    "lastname": $("#main").find('#customerLName').val(),
                    'vehicle_no': $("#main").find('#vehicleNo').val(),
                    'mobile_no': $("#main").find('#mobileNo').val()
                };

                dbUpdateCustomer(fdata);
            }
        })

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


/*** Alter Queries ***/
// ALTER TABLE `mw_service` ADD `invdate` DATE NULL DEFAULT NULL AFTER `amount`;
// ALTER TABLE `mw_service` ADD `remind_date` DATE NULL DEFAULT NULL AFTER `invdate`;
// ALTER TABLE `mw_service` ADD `km_run` VARCHAR(50) NULL DEFAULT NULL AFTER `summary`;