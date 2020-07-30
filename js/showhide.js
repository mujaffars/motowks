var tokenPresent=false;

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
    if ($('#sidebar-left').css('display')!=='block') {
        $('#sidebar-left').show("slide", {direction: "left"}, 100);
    } else {
        $('#sidebar-left').hide("slide", {direction: "left"}, 100);
    }
}

function showThePage(thePage, theFolder) {

    console.log('Inside show page '+thePage' '+theFolder);
    $('#main').html('');

    $.ajax({
        url: theFolder+"/"+thePage+'.html',
        type: 'GET',
        dataType: 'html',
        async: true,
        error: function () {
        },
        success: function (resp) {
            $("#main").html(resp);
            definePageEvents(thePage, theFolder);
        }
    });

}

function definePageEvents(thePage, theFolder) {
    if (thePage==='add'&&theFolder==='pages/customer') {
        $("#main").find('#btnCreateCustomer').click(function () {
            if ($("#main").find('#vehicleNo').val()==='') {
                toastr.error('Vehicle No required');
            } else if ($("#main").find('#vehicleNo').val()==='') {
                toastr.error('Vehicle No required');
            }

            var fdata = {
                'vehicleno': $("#main").find('#vehicleNo').val(),
                'customername': $("#main").find('#customerName').val(),
                'mobileno': $("#main").find('#mobileNo').val()
            };
            
            $.ajax({
                url: theFolder+"/saveCustomer",
                type: 'POST',
                data: fdata,
                dataType: 'json',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    if(resp.error){
                        toastr.error(resp.errormsg);
                    }
                }
            });
            
        })
    }
}