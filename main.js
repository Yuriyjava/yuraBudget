    import Grid from './views/grid.js';
    import SignUp from './views/signUp.js';
    import Login from './views/login.js';
    import Templates from './templates.html';

    $(document).ready(function(){

    var div       = document.createElement('div');
    div.innerHTML = Templates;
    document.body.appendChild(div);



    // views, layouts


        var GridView= new Grid();
        var SignUpView= new SignUp();
        var MyRouter= Backbone.Router.extend({
            routes     : {
                "home"     : "home",
                "signUp"     : "signUp",

            },
            initialize : function () {
                Backbone.history.start()
            },
            home       : function () {
                GridView.view.render();
            },
            signUp: function () {
                SignUpView.view.render();
            },


        });
        var router = new MyRouter();

    });

