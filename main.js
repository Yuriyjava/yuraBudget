import Grid from './views/grid.js';
import SignUp from './views/signUp.js';
import Templates from './templates.html';
import swal from 'sweetalert2'

$(document).ready(function () {

    var div = document.createElement('div');
    div.innerHTML = Templates;
    document.body.appendChild(div);


    // views, layouts


    var GridView = new Grid();
    var SignUpView = new SignUp();
    var MyRouter = Backbone.Router.extend({
        routes: {
            "home": "home",
            "signUp": "signUp",

        },
        initialize: function () {
            Backbone.history.start()
        },
        home: function () {
            $.get("/getData").done(function (response) {
                var _response = JSON.parse(response);
                if (_response.data) {
                    var data = JSON.parse(_response.data);
                    var name = _response.name;
                    GridView.view.render(data, name);
                } else {
                    swal({
                        title: 'Доступ запрещен!',
                        text: 'Неправильный логин или пароль!',
                        type: 'error',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setTimeout(function () {
                        window.location.replace("/");
                    }, 1000);
                }

            }).fail(function (response) {
                swal({
                    title: 'Доступ запрещен!',
                    text: 'Неправильный логин или пароль!',
                    type: 'error',
                    showConfirmButton: false,
                    timer: 1000
                });
                setTimeout(function () {
                    window.location.replace("/");
                }, 1000);
            });
        },
        signUp: function () {
            SignUpView.view.render();
        },


    });
    var router = new MyRouter();

});

