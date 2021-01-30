
$(document).ready(function()
{
    let boton = $("#theme");

    boton.on("click", function()
    {
        if (boton.is(":checked"))
        {
            $(".navbar").removeClass("bg-light").addClass("bg-dark1"); // cabecera
            $(".main").removeClass("bg-light").addClass("bg-dark2"); // body
            $(".negrita, .main").removeClass("text-dark1").addClass("text-light"); // texto
            $(".nav-link").removeClass("text-primary").addClass("text-light"); // menú
        } else
        {
            $(".navbar").removeClass("bg-dark1").addClass("bg-light");
            $(".main").removeClass("bg-dark2").addClass("bg-light");
            $(".negrita, .main").removeClass("text-light").addClass("text-dark1");
            $(".nav-link").removeClass("text-light").addClass("text-primary");
        }
    });

    

});



