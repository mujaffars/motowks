var dbShell;
// constants
var board_row_size=4;
var board_col_size=4;
// variables
var debug_mode=false;
var hint_mode=false;
var best_score=0;
var score=0;
var direction='';
var multiplier=0;
var images=[
    'images/icons/sprite.png',
    'images/picto/fire.gif',
    'images/picto/star.gif',
    'images/anim/explosion.png'
];
var timeout;
var floor_width;
var linking={};
var lvlId;
var nextId;
var animSpeed=400;
var activePage='';
var pastPage='';
var devideBy=360;
var pzlid='';
var pzlDtl={};
var backStart=new Date().getTime();
var inMiddleLoading=false;

var screenHeight=parseInt($(window).height());
var screenWidth=screenHeight*56.25/100;
var headerHeight=eval(eval(screenHeight*10)/100);
var imgHeight=parseInt(eval(eval(screenHeight*40)/100));

var showingModal=false;
var baseurl="http://mjapps.shivtraderssangli.com/app/trade-app/api/";
//var baseurl="../api/";

function genModalSkeleton() {
    $('.bs-example-modal-sm').remove();
    var modalSkeleton=$("<div />", {
        "class": "modal bs-example-modal-sm noselect",
        tabindex: "-1",
        role: "dialog",
        'aria-labelledby': "mySmallModalLabel",
        'data-backdrop': "false"
    });
    var modal=$("<div />", {
        "class": "modal-dialog modal-sm"
    });
    var modalContent=$("<div />", {
        "class": "modal-content"
    });
    var modalBody=$("<div />", {
        "id": "modalShellBody",
        "class": "modal-body"
    }).html('Loading...');
    modalContent.append(modalBody);
    modal.append(modalContent);
    modalSkeleton.append(modal);

    return modalSkeleton;
}

function showModal(whichone) {
    var modalSkeleton=genModalSkeleton();

    if (whichone==='finished'||whichone==='insuff') {
        $(modalSkeleton).modal({
            backdrop: 'static',
            keyboard: false
        });
    } else {
        $(modalSkeleton).modal("show");
    }
    setModalContent(modalSkeleton, whichone);
}

function setModalContent(modalSkeleton, forwhat) {
    
	$.ajax({
		url: forwhat+'.html',
		type: 'GET',
		dataType: 'html',
		async: true,
		error: function () {
		},
		success: function (resp) {
			$(modalSkeleton).find('#modalShellBody').html('').append(resp);

			defineFunctions(modalSkeleton, forwhat);
		}
	});
            
}

function loginUser()
{
    var UserName=$('#tblLogin #username').val();
    var password=$('#tblLogin #password').val();

    var PostData={
        "UserName": UserName,
        "password": password
    }
    //baseurl="../api/UserLogin";
	
	toastr.clear();
	
    $.ajax({
        url: baseurl+"UserLogin",
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(PostData),
        success: function (res) {
            if (res.code==0)
            {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('UserId', res.data.userData.UserId);
                localStorage.setItem('user_name', res.data.userData.userRoleName);
				toastr.success(res.result);
                closeModal();
            }else{
				toastr.error(res.result);
			}
        },
        error: function (res) {
            $('#main').html(JSON.stringify(res));            
            closeModal();
        }
    });

}

function closeModal() {
    $('.bs-example-modal-sm').modal('hide');
    $('.bs-example-modal-sm2').modal('hide');
}

function defineFunctions(modalSkeleton, forwhat){
	console.log(forwhat);
}