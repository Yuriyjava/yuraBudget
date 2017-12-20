/**
 * Created by Yurii on 14.12.2017.
 */

import Template from '../signUp.html';
import swal from 'sweetalert2'
function SignUp() {
    var self = this;

    var View  = Backbone.View.extend({
        el         : "#content",
        initialize : function () {
           // this.render();
        },
        events: {
            "submit form.formSingUp"         : "submitSignUp",
          },
        render     : function () {
            this.$el.html(Template);
            //this.$el.find('form').on("submit", this.submitForm)
        },
        submitSignUp: function(e){
            var name = $(e.target).find("input#inputLogin").val();
            var email = $(e.target).find("input#inputEmail").val();

            var pass =  $(e.target).find("input#inputPassword").val();
            var passConfirm = $(e.target).find("input#confirmPassword").val();
            if(pass!=passConfirm){
               alert("Введенные пароли не совпадают!");
                return false;
            }

            $.post( "/signup", {
                username: name,
                password: pass,
                email: email
            } ).done(function(data) {
                window.location.replace("/#home");
            }).fail(function(response){
                if(response.statusText === "Forbidden" && response.responseText) {
                    swal({
                        title             : 'Регистрация отклонена!',
                        text              : 'Пользователь с таким логином уже существует. Выберите другой логин!',
                        type              : 'warning',
                        showConfirmButton : true,
                        timer             : 2000
                    });
                }
            });
            return false;
        },


    });

    self.view = new View();

}

export default SignUp;