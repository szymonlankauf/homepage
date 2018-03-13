$(document).ready(function () {

    function handleError() {

    }

    function handleSuccess() {

    }

    $("#contact-form").find("form").on("submit", function (e) {
        e.preventDefault();

        console.log({
            url: this.action,
            data:  $( this ).serialize()
        });


        $.ajax({
            type: "POST",
            url: this.action,
            data:  $( this ).serialize()
        }).then(function (data) {
            console.log(data);

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