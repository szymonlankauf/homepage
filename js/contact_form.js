$(document).ready(function () {

    function handleError() {
        document.querySelector('#emailError').classList.remove('hidden')
    }

    function handleSuccess() {
        document.querySelector('#emailSent').classList.remove('hidden')
    }

    var form = $("#contact-form").find("form");

    form.find("input[type=submit]").removeAttr("disabled");

    form.on("submit", function (e) {
        e.preventDefault();

        // console.log({
        //     url: this.action,
        //     data:  $( this ).serialize()
        // });

        $.ajax({
            type: "POST",
            url: this.action,
            data:  $( this ).serialize(),
            dataType: 'json'
        }).then(function (data) {
            // console.log(data);

            if(data.code !== 200) {
                // console.log("error")
                handleError();
            } else {
                // console.log("success")
                handleSuccess()
            }

        }).fail(function (xhr, status, error) {
            // console.log(xhr, status, error);
            //
            // console.log("error")

            handleError();
        })
    })
});