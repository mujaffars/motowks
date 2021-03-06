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
            if (res === 'unauthorized') {
                showModal('login');
            } else {
                if (res.code == 0)
                {
                    toastr.success(res.result);
                    closeModal();

                    custDtlId = $('#header').attr('addservfor');
                    showThePage('detail', 'pages/customer');

                } else {
                    toastr.error(res.result);
                }
            }
        },
        error: function (res) {
            $('#main').html(JSON.stringify(res));
            closeModal();
        }
    });
}

function deleteInvoice(objFld) {

    var r = confirm("Do you really want to delete this Invoice?");

    if (r == true) {
        var postData = {
            'inv_id': $(objFld).attr('inv_id')
        };
        $.ajax({
            url: serverUrl + 'deleteInvoice',
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
                    // Remove the Invoice detail block
                    $('.divInvliceDetails .inv_' + resp.invid).fadeOut('fast');
                    toastr.success('Invoice deleted successfully');
                } else {
                    toastr.error('Invoice delete fail');
                }
            }
        });
    }
}

function editInvoice(objFld) {
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

function getInvDtlModal(invId) {

    var postData = {
        'id': invId
    };
    $.ajax({
        url: serverUrl + 'getInvoice',
        type: 'post',
        beforeSend: function (request) {
            request.setRequestHeader("Token", localStorage.getItem('token'));
        },
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success: function (resp) {
//            console.log(resp);moment(val.maxinvdate).format('DD MMM YYYY')
            showModal('detail', 'servicing', resp);
        }
    });

}

function getDashboardDtl() {

    $.ajax({
        url: serverUrl + "dashboardDtl",
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Token", localStorage.getItem('token'));
        },
        dataType: 'json',
        async: true,
        error: function () {
        },
        success: function (resp) {
            showDashboardData(resp);
        },
        error: function (res) {

        },
        fail: function () {
            alert('request failed');
        }
    });
}


function showDashboardData(respData) {
    var cnt = 1;
    $.each(respData, function (key, val) {
        $('.clsTblDashboard .clsChartMonth' + cnt).html(key);
        var arrMonthDtl = val.split('_');
        $('.clsTblDashboard .clsBar' + cnt).css('width', arrMonthDtl[1] + '%');
        if (arrMonthDtl[0] > 0) {
            $('.clsTblDashboard .clsBar' + cnt).html('_');
        } else {
            $('.clsTblDashboard .clsBar' + cnt).html('');
        }
        $('.clsTblDashboard .clsMonAmt' + cnt).html(arrMonthDtl[0]);
        console.log(arrMonthDtl);
        cnt++;
    });
}