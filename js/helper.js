// constants
var board_row_size=6;
var board_col_size=5;

// variables
var debug_mode=false;
var hint_mode=false;
var best_score=0;
var score=0;
var $icon;
var $binomial;
var direction='';
var multiplier=0;
var images=[
    'images/icons/sprite.png',
    'images/picto/fire.gif',
    'images/picto/star.gif',
    'images/anim/explosion.png'
];

var timeout;
var movingTile;
var pastPositions={};
var topPositions=[];
var leftPositions=[];

var floorClasses={};
var tileClasses={};


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

function setModalContent(modalSkeleton, forwhat, adWTime) {
    switch (forwhat) {
        case 'must watch ad':
            var modalContent=$("<div />", {
            }).html('You must watch ad to continue playing');
            $(modalSkeleton).find('#modalShellBody').html('').append(modalContent);
            break;
        case 'login':
            $.ajax({
                url: 'login.html',
                type: 'GET',
                dataType: 'html',
                async: true,
                error: function () {
                },
                success: function (resp) {
                    $(modalSkeleton).find('#modalShellBody').html('').append(resp);
                    bindIconMenu();
                }
            });
            break;
    }
}