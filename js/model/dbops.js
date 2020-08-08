//var serverUrl = 'http://localhost/mwserver/api/';
var serverUrl='http://localhost:90/mwserver/api/';
//var serverUrl = 'http://mjapps.shivtraderssangli.com/app/trade-app/api/';

function dbCreateCustomer(PostData) {

    $.ajax({
        url: serverUrl+'createCustomer',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(PostData),
        success: function (res) {
            closeModal();
            if (res.code==0)
            {
                toastr.success(res.result);
                closeModal();
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
        url: serverUrl+"listCustomer",
        type: 'GET',
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
        }
    });
}

function searchCustomer(PostData) {
    $.ajax({
        url: serverUrl+"searchCustomer",
        type: 'POST',
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
    if (theNextFun==='iterateCustList') {
        iterateCustList(resp);
    } else if (theNextFun==='showSearchCust') {
        showSearchCust(resp);
    } else if (theNextFun==='iterateCustDetail') {
        showCustDetail(resp);
    }
}

function iterateCustList(resp) {
    $.each(resp, function (idex, val) {
        $('.skelDivCustList .custListName').html(val.first_name+" "+val.last_name);
        $('.skelDivCustList .custMono').html(val.mobile_no);
        $('.skelDivCustList .custListSdate').html("-");
        $('.skelDivCustList .divCustSec').attr("custid", val.id);
        $('#main .clsDivCustList').append($('.skelDivCustList').html());
    })
    $('#main .divCustSec').click(function () {
        custDtlId=$(this).attr('custid');
        showThePage('detail', 'pages/customer');
    })
}

function showSearchCust(resp) {
    if (resp==null) {
        alert(8999)
    }
}

function setVehicleNoAutocomplete() {

    $('.clsServiceAddPage #vehicleNo').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: serverUrl+"getCustomerAutocomp",
                type: 'GET',
                dataType: 'json',
                data: request,
                success: function (data) {
                    response($.map(data, function (value, key) {
                        return {
                            id: value.id,
                            label: value.vehicle_no+" ("+value.first_name+" "+value.last_name+")",
                            value: value.vehicle_no+" ("+value.first_name+" "+value.last_name+")"
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
        url: serverUrl+'createInvoice',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function (res) {
            if (res.code==0)
            {
                toastr.success(res.result);
                closeModal();
                
                custDtlId=$('#header').attr('addservfor');
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
        url: serverUrl+'searchCustomer',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function (resp) {
            if (resp.code==0)
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
    $('.clsCustDetail .custName').html(resp.cust.first_name+" "+resp.cust.last_name);
    $('.clsCustDetail .custVehicleNo').html(resp.cust.vehicle_no);
    $('.clsCustDetail .custMobileNo').html(resp.cust.mobile_no);
    $('.clsCustDetail').attr('cust_id', resp.cust.id);

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
}