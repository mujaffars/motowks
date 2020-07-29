var jsLoaded=true;
var admobid={};
var isTesting=false;
var vidUnlockNext=false;
if (/(android)/i.test(navigator.userAgent)) {
    admobid={
        banner: 'ca-app-pub-3868593263837372/1966919416',
        interstitial: 'ca-app-pub-3868593263837372/6836102719',
        reward: 'ca-app-pub-3868593263837372/8357720563'
    };
} else {
    admobid={
        banner: 'ca-app-pub-3868593263837372/1966919416',
        interstitial: 'ca-app-pub-3868593263837372/6836102719',
        reward: 'ca-app-pub-3868593263837372/8357720563'
    };
}
var push;

$(function () {

        

});

function getRegId(){
	document.addEventListener('deviceready', function () {

        push=PushNotification.init({
            android: {
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', function (data) {
            $('#main').html(data.registrationId);
			// alert(data.registrationId);
            // data.registrationId
        });

        push.on('notification', function (data) {
			
        });

        push.on('error', function (e) {
            alert(e);
            // e.message
        });


    });
}

function onLoad() {

    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        initApp();
    }

    $('.bs-example-modal-sm').on('hidden.bs.modal', function () {
        //AdMob.removeBanner();
    })
}

function initApp() {
    if (typeof admob!=='undefined') {
        if (!AdMob) {/* alert( 'admob plugin not ready' );*/
            return;
        }
        initAd();
    }

    //registerAdEvents();
}

function closeModal() {
    $('.bs-example-modal-sm').modal('hide');
    $('.bs-example-modal-sm2').modal('hide');
}

function fnVidUnlockNext() {
    vidUnlockNext=true;
    showReward();
}