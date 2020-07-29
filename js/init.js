var tokenPresent = false;

$(window).on('load', function () {
	
	//showModal('login');
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

$(function(){
	//localStorage.setItem('custo', '[{ "name": "John", "age": 30, "city": "New York", "citsdfy": "New York", "cisdfasdfty": "New York", "cityaaaa": "New York"}]');
	
	obj = $.parseJSON(localStorage.getItem('custo'));
	console.log(obj);
	
	$('#main').click(function(){
		if($('#sidebar-left').css('display') == 'block'){
			$('#sidebar-left').hide("slide", { direction: "left" }, 100);
		}
	})
})

function hideScreen(){
    
}

function handleLeftMenuClicks(){
	
	$('#sidebar-left .clsCustomer .clsCustomerAdd').click(function(){		
		showHideSidebar();		
		showThePage('add', 'pages/customer');
	})
	
	$('#sidebar-left .clsCustomer .clsCustomerList').click(function(){		
		showHideSidebar();		
		showThePage('list', 'pages/customer');
	})
	
	$('#sidebar-left .clsCustomer .clsCustomerSearch').click(function(){		
		showHideSidebar();		
		showThePage('search', 'pages/customer');
	})
	
}