require([

    "text!templates.html",
    "views/grid"

], function ( Templates, Grid) {
    var div       = document.createElement('div');
    div.innerHTML = Templates;
    document.body.appendChild(div);

    console.log(kendo.format("{0:c}", 99)); // outputs "$99.00" using the default en-US culture
    kendo.culture("ru-RU"); // change the culture
    console.log(kendo.format("{0:c}", 99)); // outputs "£99.00"

    // views, layouts
var GridView= new Grid();
    var MyRouter= Backbone.Router.extend({

        routes     : {
            ""         : "home",
            "home"     : "home",
            "sport"    : "sport",
            "learning" : "learning",
            "multi"    : "multi",
            "chars"    : "chars",
            "contacts" : "contacts"
        },
        initialize : function () {
            Backbone.history.start()
        },
        home       : function () {
            GridView.view.render();

        }


    });
    var router = new MyRouter();
});