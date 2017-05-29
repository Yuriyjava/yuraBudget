require([

    "text!templates.html",
    "views/grid"

], function ( Templates, Grid) {
    jQuery.migrateMute=true;
    jQuery.migrateTrace = false;
    jQuery.migrateReset();
    var div       = document.createElement('div');
    div.innerHTML = Templates;
    document.body.appendChild(div);



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