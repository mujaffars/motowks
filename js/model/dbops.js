//var serverUrl = 'http://localhost/mwserver/api/';
//var serverUrl='http://localhost:90/mwserver/api/';
var serverUrl = 'http://mjapps.shivtraderssangli.com/app/trade-app/api/';
var myHeaders = {"Token": localStorage.getItem('token')};

function dbCreateCustomer(PostData) {

    $.ajax({
        url: serverUrl + 'createCustomer',
        type: 'post',
        beforeSend: function (request) {
            request.setRequestHeader("Token", localStorage.getItem('token'));
        },
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(PostData),
        success: function (res) {
            closeModal();
            if (res.code == 0)
            {
                toastr.success(res.result);
                closeModal();
                $('.divPageHeader').html('List customer');
                custDtlId = res.cust_id;
                showThePage('detail', 'pages/customer');
            } else {
                toastr.error(res.result);
            }
        },
        error: function (res) {
            closeModal();
            $('#main').html(JSON.stringify(res));
            closeModal();
        }
    });

}

function getAllCustomer() {

    $.ajax({
        url: serverUrl + "listCustomer",
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Token", localStorage.getItem('token'));
        },
        dataType: 'json',
        async: true,
        error: function () {
        },
        success: function (resp) {
            closeModal();
            if (theNextFun) {
                handleNextFunction(resp);
            } else {
                return resp;
            }
        },
        error: function (res) {
            closeModal();
        },
        fail: function () {
            alert('request failed');
        }
    });
}

function dbUpdateCustomer(PostData) {
    $.ajax({
        url: serverUrl + 'updateCustomer',
        type: 'post',
        beforeSend: function (request) {
            request.setRequestHeader("Token", localStorage.getItem('token'));
        },
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(PostData),
        success: function (res) {
            closeModal();
            if (res.code == 0)
            {
                toastr.success(res.result);
                closeModal();
                $('.divPageHeader').html('List customer');
                custDtlId = res.cust_id;
                showThePage('detail', 'pages/customer');
            } else {
                toastr.error(res.result);
            }
        },
        error: function (res) {
            closeModal();
            $('#main').html(JSON.stringify(res));
            closeModal();
        }
    });
}

function searchCustomer(PostData) {
    $.ajax({
        url: serverUrl + "searchCustomer",
        type: 'POST',
        beforeSend: function (request) {
            request.setRequestHeader("Token", localStorage.getItem('token'));
        },
        dataType: 'json',
        data: JSON.stringify(PostData),
        async: true,
        error: function () {
        },
        success: function (resp) {
            closeModal();
            if (theNextFun) {
                handleNextFunction(resp);
            } else {
                return resp;
            }
        }
    });
}

function handleNextFunction(resp) {
    if (theNextFun === 'iterateCustList') {
        iterateCustList(resp);
    } else if (theNextFun === 'showSearchCust') {
        showSearchCust(resp);
    } else if (theNextFun === 'iterateCustDetail') {
        showCustDetail(resp);
    } else if (theNextFun === 'showReminderData') {
        showRemindersList(resp);
    }
}

function iterateCustList(resp) {
    $.each(resp, function (idex, val) {
        $('.skelDivCustList .custListName').html(val.first_name + " " + val.last_name);
        $('.skelDivCustList .custMono').html(val.mobile_no);
        if (val.invdate !== '' && val.invdate !== null) {
            $('.skelDivCustList .custListSdate').html(moment(val.invdate).format('DD MMM YYYY'));
        } else {
            $('.skelDivCustList .custListSdate').html('-');
        }

        $('.skelDivCustList .custInvoiceAmt').html(val.amount);
        $('.skelDivCustList .divCustSec').attr("custid", val.cust_id);
        $('#main .clsDivCustList').append($('.skelDivCustList').html());
    })
    $('#main .divCustSec').click(function () {
        custDtlId = $(this).attr('custid');
        showThePage('detail', 'pages/customer');
    })
}

function showSearchCust(resp) {
    if (resp == null) {
        $('.skelDivCustList').hide();
    } else {
        $('.skelDivCustList .custListName').html(resp.first_name + " " + resp.last_name);
        $('.skelDivCustList .custListVno').html(resp.vehicle_no);
        $('.skelDivCustList .custMono').html(resp.mobile_no);
        $('.skelDivCustList .custListCdate').html(moment(resp.createdon).format('DD MMM YYYY'));
        $('.skelDivCustList').attr('cust_id', resp.id);
        $('.skelDivCustList').show();
    }
}

function setVehicleNoAutocomplete() {

    $('.clsServiceAddPage #vehicleNo').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: serverUrl + "getCustomerAutocomp",
                type: 'GET',
                beforeSend: function (request) {
                    request.setRequestHeader("Token", localStorage.getItem('token'));
                },
                dataType: 'json',
                data: request,
                success: function (data) {
                    response($.map(data, function (value, key) {
                        return {
                            id: value.id,
                            label: value.vehicle_no + " (" + value.first_name + " " + value.last_name + ")",
                            value: value.vehicle_no + " (" + value.first_name + " " + value.last_name + ")"
                        };
                    }));
                },
            });
        },
        select: function (event, ui) {
            $('.clsServiceAddPage #vehicleNo').attr('custid', ui.item.id);
        },
        minLength: 2
    });

}

function dbCreateInvoice(postData) {
    $.ajax({
        url: serverUrl + 'createInvoice',
        type: 'post',
        beforeSend: function (request) {
            request.setRequestHeader("Token", localStorage.getItem('token'));
        },
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function (res) {
            if (res.code == 0)
            {
                toastr.success(res.result);
                closeModal();

                custDtlId = $('#header').attr('addservfor');
                showThePage('detail', 'pages/customer');

            } else {
                toastr.error(res.result);
            }
        },
        error: function (res) {
            $('#main').html(JSON.stringify(res));
            closeModal();
        }
    });
}

function getCustAndInvoices(postData) {
    $.ajax({
        url: serverUrl + 'searchCustomer',
        type: 'post',
        beforeSend: function (request) {
            request.setRequestHeader("Token", localStorage.getItem('token'));
        },
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function (resp) {
            if (resp.code == 0)
            {
                if (theNextFun) {
                    handleNextFunction(resp);
                } else {
                    return resp;
                }
            } else {
                toastr.error('Not able to fetch Customer details');
            }
            closeModal();
        },
        error: function (resp) {
            $('#main').html(JSON.stringify(resp));
            closeModal();
        }
    });
}

function showCustDetail(resp) {
    $('.clsCustDetail .custName').html(resp.cust.first_name + " " + resp.cust.last_name);
    $('.clsCustDetail .custVehicleNo').html(resp.cust.vehicle_no);
    $('.clsCustDetail .custMobileNo').html(resp.cust.mobile_no);
    $('.clsCustDetail').attr('cust_id', resp.cust.id);
    $('.clsCustDetail .fa-pencil').attr('cust_id', resp.cust.id);

    $('.clsCustDetail .clsBtnAddInv').click(function () {
        $('#header').attr('addServFor', $('.clsCustDetail').attr('cust_id'));
        $('#header').attr('addServVehNo', $('.clsCustDetail .custVehicleNo').html());
        addServicing();
    })

    $('.clsCustDetail #btnBacklist').click(function () {
        showThePage('list', 'pages/customer');
    })

    $.each(resp.invoice, function (invIndex, invVal) {
        $('.skelDivInvList .invTdDate').html(invVal.formDate);
        $('.skelDivInvList .invTdAmount').html(invVal.amount);
        $('.skelDivInvList .invTdSummary').html(invVal.summary);

        $('.clsInvoiceDetail .divInvliceDetails').append($('.skelDivInvList').html());
    })

    $('.clsCustDetail .fa-pencil').click(function () {

        var postData = {
            'id': $(this).attr('cust_id'),
            'getfor': 'custdtl'
        }
        $.ajax({
            url: serverUrl + "searchCustomer",
            type: 'POST',
            beforeSend: function (request) {
                request.setRequestHeader("Token", localStorage.getItem('token'));
            },
            dataType: 'json',
            async: true,
            data: JSON.stringify(postData),
            error: function () {
            },
            success: function (resp) {
                showModal('edit', 'customer', resp);
            }
        });

    })

}

function showRemindersList(resp) {
    $.each(resp, function (invIndex, invVal) {

        if (invVal.reserve_date !== null) {
            $('.skelDivCustReminder .divCustSec').attr('cust_id', invVal.cust_id);
            $('.skelDivCustReminder .custReminderDate').html(moment(invVal.reserve_date).format('DD MMM YYYY'));
            if (invVal.invdate !== null) {
                $('.skelDivCustReminder .custListSdate').html(moment(invVal.invdate).format('DD MMM YYYY'));
            }
            $('.skelDivCustReminder .custName').html(invVal.first_name + " " + invVal.last_name);
            $('.skelDivCustReminder .custMoNo').html(invVal.mobile_no);


            $('.clsDivReminderList').append($('.skelDivCustReminder').html());
        }
    })
}

function getAllReminders() {

    $.ajax({
        url: serverUrl + "listReminders",
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Token", localStorage.getItem('token'));
        },
        dataType: 'json',
        async: true,
        error: function () {
        },
        success: function (resp) {
            closeModal();

            if (resp === 'unauthorized') {
                showModal('login');
            } else {
                if (theNextFun) {
                    handleNextFunction(resp);
                } else {
                    return resp;
                }
            }
        },
        error: function (res) {
            closeModal();
        },
        fail: function () {
            alert('request failed');
        }
    });
}