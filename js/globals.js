
var timeout;
var floor_width;
var linking = {};
var lvlId;
var nextId;
var animSpeed = 400;
var activePage = '';
var pastPage = '';
var devideBy = 360;
var pzlid = '';
var pzlDtl = {};
var backStart = new Date().getTime();
var inMiddleLoading = false;

var screenHeight = parseInt($(window).height());
var screenWidth = screenHeight * 56.25 / 100;
var headerHeight = eval(eval(screenHeight * 10) / 100);
var imgHeight = parseInt(eval(eval(screenHeight * 40) / 100));

var showingModal = false;

function genModalSkeleton() {
    $('.bs-example-modal-sm').remove();
    var modalSkeleton = $("<div />", {
        "class": "modal bs-example-modal-sm noselect",
        tabindex: "-1",
        role: "dialog",
        'aria-labelledby': "mySmallModalLabel",
        'data-backdrop': "false"
    });
    var modal = $("<div />", {
        "class": "modal-dialog modal-sm"
    });
    var modalContent = $("<div />", {
        "class": "modal-content"
    });
    var modalBody = $("<div />", {
        "id": "modalShellBody",
        "class": "modal-body"
    }).html('Loading...');
    modalContent.append(modalBody);
    modal.append(modalContent);
    modalSkeleton.append(modal);

    return modalSkeleton;
}

function showModal(whichone, forModel, showData) {
    var modalSkeleton = genModalSkeleton();

    if (whichone === 'finished' || whichone === 'insuff') {
        $(modalSkeleton).modal({
            backdrop: 'static',
            keyboard: false
        });
    } else {
        $(modalSkeleton).modal("show");
    }
    setModalContent(modalSkeleton, whichone, forModel, showData);
}

function setModalContent(modalSkeleton, forwhat, forModel, showData) {

    var urlVariable = forwhat;
    if (forModel) {
        urlVariable = 'pages/' + forModel + '/' + forwhat;
    }
    $.ajax({
        url: urlVariable + '.html',
        type: 'GET',
        dataType: 'html',
        async: true,
        error: function () {
        },
        success: function (resp) {
            $(modalSkeleton).find('#modalShellBody').html('').append(resp);
            defineFunctions(modalSkeleton, forwhat, forModel, showData);
        }
    });

}

function loginUser()
{
    $('#tblLogin .clsBtnLogin').hide();
    $('#tblLogin .clsLoginLoader').show();

    var UserName = $('#tblLogin #username').val();
    var password = $('#tblLogin #password').val();

    var PostData = {
        "UserName": UserName,
        "password": password
    }

    toastr.clear();

    $.ajax({
        url: serverUrl + "UserLogin",
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(PostData),
        success: function (res) {
            if (res.code == 0)
            {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('UserId', res.data.userData.UserId);
                localStorage.setItem('user_name', res.data.userData.userRoleName);
                toastr.success(res.result);
                closeModal();
            } else {
                $('#tblLogin .clsBtnLogin').show();
                $('#tblLogin .clsLoginLoader').hide();
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

function defineFunctions(modalSkeleton, forwhat, forModel, showData) {
    if (forwhat === 'login') {
        $('#sidebar-left .clsServer3, .clsLoginText').click(function () {
            serverUrl = 'http://mjapps.shivtraderssangli.com/app/trade-app/api/';
        })
    } else if (forModel == 'servicing' && forwhat == 'detail') {
        console.log('111111111111');
        console.log(showData);
        
        $(modalSkeleton).find('.clsSpanDate').html(moment(showData.invdate).format('DD MMM YYYY'));
        $(modalSkeleton).find('.clsSpanKmRun').html(moment(showData.kmrun).format('DD MMM YYYY'));
        $(modalSkeleton).find('.clsTotalAmt').html(showData.amount);
        $(modalSkeleton).find('.clsSummary').html(showData.summary);
        $(modalSkeleton).find('.clsSpanRSDate').html(moment(showData.reservice_date).format('DD MMM YYYY'));
    }
}