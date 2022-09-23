


/**
* NOTE:
* Install or include the js-sha256 library to calculate the response in sha256 hash
* Install via npm:
* - npm i js-sha256
* or include from cdn:
* - https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js
**/
let payload = {
    //your unique request reference
    "reference": `SP_REQUEST_${Math.random()}`,
    //URL where you will receive the webhooks from Shufti Pro
    "callback_url": "",
    //"https://yourdomain.com/profile/sp-notify-callback",
    //end-user email
    "email": "bedprakash.kushwaha@w3villa.com",
    //end-user country
    "country": "",
    //what kind of proofs will be provided to Shufti Pro for verification?
    "verification_mode": "any",
    //allow end-user to upload verification proofs if the webcam is not accessible
    "allow_offline": "1",
    //allow end user to upload real-time or already	catured proofs
    "allow_online": "1",
    //privacy policy screen will be shown to end-user
    "show_privacy_policy": "1",
    //verification results screen will be shown to end-user
    "show_results": "1",
    //consent screen will be shown to end-user
    "show_consent": "1",
    //User can send Feedback
    "show_feedback_form": "1",
}
//background check/AML verification with OCR
payload['background_checks'] = {
    "name": {
        "first_name": "bed",
        "middle_name": "prakash",
        "last_name": "kushwaha"
    },
    "dob": "1994-06-03"
}


var token = btoa("gqWdt0qMJHNpZPkWVtRIqcQc1KL5q4zJ1uY1TIp1FLXY9UMa1S1663848868:$2y$10$guhOZh1jtFfi8fMJpLNzru5KgXUSl2.svcQTcBayHG/f0e.qUndNm"); //BASIC AUTH TOKEN
var responsesignature = null;
//Dispatch request via fetch API or with whatever else which best suits for you
fetch('https://api.shuftipro.com/',
    {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + token
        },
        body: JSON.stringify(payload)
    })
    .then(function (response) {
        responsesignature = response.headers.get('Signature');
        return response.json();
    }).then(function (data) {
        if (validatesignature(data, responsesignature, '$2y$10$guhOZh1jtFfi8fMJpLNzru5KgXUSl2.svcQTcBayHG/f0e.qUndNm')) {
            console.log('signature validated', data)
        } else {
            console.log('signature not validated', data)
        }
    });
//this method is used to validate the response signature
function validatesignature(data, signature, SK) {
    data = JSON.stringify(data);
    data = data.replace(/\//g, "\\/")
    data = `${data}${SK}`;

    sha256(data);
    var hash = sha256.create();
    hash.update(data);

    if (hash.hex() == signature) {
        return true;
    } else {
        return false;
    }
}
