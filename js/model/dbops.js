var serverUrl = 'http://localhost/mwserver/api/';
//var serverUrl='http://localhost:90/mwserver/api/';
//var serverUrl = 'http://mjapps.shivtraderssangli.com/app/trade-app/api/';

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
                showThePage('list', 'pages/customer');
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

            if (resp === 'unauthorized') {
                showModal('login');
            } else {
                if (theNextFun) {
                    handleNextFunction(resp);
                } else {
                    return resp;
                }
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
    } else if (theNextFun === 'showEditCustData') {
        showEditCustDetail(resp);
    }
}

function iterateCustList(resp) {
    $.each(resp, function (idex, val) {
        $('.skelDivCustList .custListName').html(val.first_name + " " + val.last_name);
        $('.skelDivCustList .custMono').html(val.mobile_no);
        $('.skelDivCustList .custListVno').html(val.vehicle_no);

        if (val.maxinvdate !== '') {
            $('.skelDivCustList .custListSdate').html(moment(val.maxinvdate).format('DD MMM YYYY'));
        } else {
            $('.skelDivCustList .custListSdate').html("-");
        }
        $('.skelDivCustList .divCustSec').attr("custid", val.cust_id);
        $('#main .clsDivCustList').append($('.skelDivCustList').html());
    })
    $('#main .divCustSec').click(function () {
        custDtlId = $(this).attr('custid');
        showThePage('detail', 'pages/customer');
    })
}

function showSearchCust(resp) {
    if (resp !== null) {
        $('.skelDivCustList .custListName').html(resp.first_name + " " + resp.last_name);
        $('.skelDivCustList .custListVno').html(resp.vehicle_no);
        $('.skelDivCustList .custMono').html(resp.mobile_no);
        $('.skelDivCustList .custListCdate').html(moment(resp.createdon).format('DD MMM YYYY'));

        $('.clsDivCustList').attr('cust_id', resp.id);
        $('.skelDivCustList').show();
    } else {
        $('.skelDivCustList').hide();
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

function deleteCustomer(objFld) {

    var r = confirm("Do you really want to delete this Customer?");

    if (r == true) {
        var postData = {
            'cust_id': $(objFld).attr('cust_id')
        };
        $.ajax({
            url: serverUrl + 'deleteCustomer',
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
                    toastr.success('Customer deleted successfully');
                } else {
                    toastr.error('Customer delete fail');
                }
                showThePage('list', 'pages/customer');
            }
        });
    }
}

function editCustomer(objFld) {
    var postData = {
        'id': $(objFld).attr('cust_id'),
        'getfor': 'cust'
    };
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
            showThePage('edit', 'pages/customer');

            setTimeout(function () {
                handleNextFunction(resp);
            }, 500)
        }
    });
}

function showCustDetail(resp) {
    $('.clsCustDetail .custName').html(resp.cust.first_name + " " + resp.cust.last_name);
    $('.clsCustDetail .custVehicleNo').html(resp.cust.vehicle_no);
    $('.clsCustDetail .custMobileNo').html(resp.cust.mobile_no);
    $('.clsCustDetail').attr('cust_id', resp.cust.id);
    $('.clsCustDetail #icon_edit_cust').attr('cust_id', resp.cust.id);
    $('.clsCustDetail #icon_del_cust').attr('cust_id', resp.cust.id);

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

        $(".skelDivInvList .tblInvCustDetail").removeClass(function (index, className) {
            return (className.match(/(^|\s)inv_\S+/g) || []).join(' ');
        });

        $('.skelDivInvList .tblInvCustDetail').addClass('inv_' + invVal.id);
        $('.skelDivInvList .tblInvCustDetail').attr('inv_id', invVal.id);
        $('.skelDivInvList #icon_edit_inv').attr('inv_id', invVal.id);
        $('.skelDivInvList #icon_del_inv').attr('inv_id', invVal.id);

        $('.clsInvoiceDetail .divInvliceDetails').append($('.skelDivInvList').html());
    })
    
    $('.clsInvoiceDetail .divInvliceDetails .tblInvCustDetail').click(function(){
        getInvDtlModal($(this).attr('inv_id'));
    })
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
                showThePage('list', 'pages/customer');
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

function showEditCustDetail(resp) {
    $('.tblEditCust').attr('cust_id', resp.id);
    $('.tblEditCust #vehicleNo').val(resp.vehicle_no);
    $('.tblEditCust #customerFName').val(resp.first_name);
    $('.tblEditCust #customerLName').val(resp.last_name);
    $('.tblEditCust #mobileNo').val(resp.mobile_no);
}