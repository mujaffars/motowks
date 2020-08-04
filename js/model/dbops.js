var serverUrl = 'http://localhost/mwserver/api/';
//var serverUrl = 'http://mjapps.shivtraderssangli.com/app/trade-app/api/';

function dbCreateCustomer(PostData) {

    $.ajax({
        url: serverUrl + 'createCustomer',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(PostData),
        success: function (res) {
            if (res.code == 0)
            {
                toastr.success(res.result);
                closeModal();
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

function getAllCustomer() {
    $.ajax({
        url: serverUrl + "listCustomer",
        type: 'GET',
        dataType: 'json',
        async: true,
        error: function () {
        },
        success: function (resp) {
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
        url: serverUrl + "searchCustomer",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(PostData),
        async: true,
        error: function () {
        },
        success: function (resp) {
            return resp;
        }
    });
}

function handleNextFunction(resp) {
    if (theNextFun === 'iterateCustList') {
        iterateCustList(resp);
    }
}

function iterateCustList(resp) {
    $.each(resp, function (idex, val) {
        $('.skelDivCustList .custListName').html(val.first_name + " " + val.last_name);
        $('.skelDivCustList .custMono').html(val.mobile_no);
        $('.skelDivCustList .custListSdate').html("-");
        $('#main .clsDivCustList').append($('.skelDivCustList').html());
    })
}

function setVehicleNoAutocomplete() {

    $('.clsServiceAddPage #vehicleNo').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: serverUrl + "getCustomerAutocomp",
                type: 'GET',
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
            //return false;
        },
        minLength: 2
    });

//    $.ajax({
//        url: serverUrl + "getCustomerAutocomp",
//        type: 'GET',
//        dataType: 'json',
//        async: true,
//        error: function () {
//        },
//        success: function (resp) {
//            $('.clsServiceAddPage #vehicleNo').autocomplete({
//                source: resp
//            });
//        }
//    });
//
//    var availableTags = [
//        "ActionScript",
//        "AppleScript",
//        "Asp",
//        "BASIC",
//        "C",
//        "C++",
//        "Clojure",
//        "COBOL",
//        "ColdFusion",
//        "Erlang",
//        "Fortran",
//        "Groovy",
//        "Haskell",
//        "Java",
//        "JavaScript",
//        "Lisp",
//        "Perl",
//        "PHP",
//        "Python",
//        "Ruby",
//        "Scala",
//        "Scheme"
//    ];
//    $('.clsServiceAddPage #vehicleNo').autocomplete({
//        source: availableTags
//    });
}