var service = function () {
    var serviceObj = {}
    serviceObj.fetchDataFromAPI = function () {
        var responseText;
        $.ajax(
            {
                url: "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students",
                success: function (result) {
                    responseText = result;
                }
            });

        console.log(responseText);
        return responseText
    }



    serviceObj.postDataToAPI = function(formData) {
        console.log("Form date ",formData);
        $.ajax({
            type : "POST",
            url : "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students", 
            data : formData,
            success : function(data,status){
                console.log("Data: " + data + "\nStatus: " + status);
                addBtn.show();
                },

            dataType : "json",
            ContentType : "application/json"
        });
    }

    return serviceObj;
}();


$('#display').click(function (e) {

    e.preventDefault();
    // text = service.fetchDataFromAPI();

    $.ajax(
        {
            url: "http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students",
            success: function (result) {
                console.log(result);
            }
        });


    // console.log(text);
})
var addBtn = $('#add');

addBtn.click(function (e) {
    e.preventDefault();
    addBtn.hide();

    if(!validateName() || !validateAge() || !validateRno()
    || !validateEmail() || !validateDate()) {
        alert("Enter Details Properly!!!!");
        addBtn.show();
        return;
    }

    console.log('Validating Form');
    console.log('Form Validated')
    var form = $('#registrationForm');
    //var formData = new FormData();
    result = $('#registrationForm').serializeArray();
    result2 = objectifyForm(result);

    console.log(result2)

    service.postDataToAPI(result2);

})

function objectifyForm(formArray) {
    //serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return JSON.stringify(returnArray);
}

function validateName() {
    var name = $('#name').val();
    var pattern = /^[a-zA-Z]*$/;

    if (!pattern.test(name) || name.length < 3) {
        $("#errName").html("Enter Valid Name")
        $("#errName").show(); 
        return false;
    }

    $("#errName").hide();
    return true;
}

function validateAge() {
    var age = $('#age').val();

    if (age<5 || age=="") {
        $("#errAge").html("Enter Valid Age")
        $("#errAge").show(); 
        return false;
    }

    $("#errName").hide();
    return true;
}

function validateEmail() {
    var email = $('#email').val();
    console.log(email);
    return true
}

function validateRno() {
    var rno = $('#rollno').val();

    if (rno == "") {
        $("#errRNo").html("Enter Valid Roll No")
        $("#errRNo").show(); 
        return false;
    }

    $("#errRNo").hide();
    return true
}

function validateGender() {
    var gender = $('#gender').val();
    console.log(gender);
}

function validateDate() {
    var date = $('#date').val();

    if (date == "") {
        $("#errDate").html("Enter Correct Date")
        $("#errDate").show(); 
        return false;
    }

    $("#errDate").hide();
    return true
}
