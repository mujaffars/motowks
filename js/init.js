var tokenPresent = false;
var theNextFun = false;

$(window).on('load', function () {

    if (localStorage.getItem("token") === "" || localStorage.getItem("token") === null || localStorage.getItem("token") === undefined) {
        showModal('login');
    }

//        showModal('loader');
    handleLeftMenuClicks();

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

})

$(function () {
    //localStorage.setItem('custo', '[{ "name": "John", "age": 30, "city": "New York", "citsdfy": "New York", "cisdfasdfty": "New York", "cityaaaa": "New York"}]');

    //obj = $.parseJSON(localStorage.getItem('custo'));
    //console.log(obj);

    $('#main').click(function () {
        if ($('#sidebar-left').css('display') == 'block') {
            $('#sidebar-left').hide("slide", {direction: "left"}, 100);
        }
    })
    
    showThePage('index', 'pages/dashboard');
})

function hideScreen() {

}

function handleLeftMenuClicks() {

    $('#sidebar-left .clsLnkDashboard').click(function () {
        showHideSidebar();
        $('.divPageHeader').html('Dashboard');
        showThePage('index', 'pages/dashboard');
    })
    
    $('#sidebar-left .clsCustomer .clsCustomerAdd').click(function () {
        showHideSidebar();
        $('.divPageHeader').html('Add customer');
        showThePage('add', 'pages/customer');
    })

    $('#sidebar-left .clsCustomer .clsCustomerList').click(function () {
        showHideSidebar();
        $('.divPageHeader').html('List customer');
        showThePage('list', 'pages/customer');
    })

    $('#sidebar-left .clsCustomer .clsCustomerSearch').click(function () {
        showHideSidebar();
        $('.divPageHeader').html('Search customer');
        showThePage('search', 'pages/customer');
    })

    $('#sidebar-left .clsServicing .clsServicingAdd').click(function () {
        showHideSidebar();
        addServicing();
    })

    $('#sidebar-left .clsCustomer .clsCustomerReminders').click(function () {
        showHideSidebar();
        $('.divPageHeader').html('Re-Service Reminders');
        showThePage('reminder', 'pages/customer');
    })

    $('#sidebar-left .clsServer1').click(function () {
        serverUrl = 'http://localhost/mwserver/api/';
    })
    $('#sidebar-left .clsServer2').click(function () {
        serverUrl = 'http://localhost:90/mwserver/api/';
    })
    $('#sidebar-left .clsServer3').click(function () {
        serverUrl = 'http://mjapps.shivtraderssangli.com/app/trade-app/api/';
    })
    $('#sidebar-left .clsLogout').click(function () {
        localStorage.setItem('token', '');
        showHideSidebar();
        showModal('login');
    })
}

function addServicing() {
    $('.divPageHeader').html('Add servicing');
    showThePage('add', 'pages/servicing');
}