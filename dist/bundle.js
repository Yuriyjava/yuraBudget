/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_grid_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_signUp_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_login_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_html__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_html__);
    
    
    
    

    $(document).ready(function(){

    var div       = document.createElement('div');
    div.innerHTML = __WEBPACK_IMPORTED_MODULE_3__templates_html___default.a;
    document.body.appendChild(div);



    // views, layouts




        var MyRouter= Backbone.Router.extend({
            routes     : {
                ""         : "login",
                "home"     : "home",
                "signUp"    : "signUp",

            },
            initialize : function () {
                Backbone.history.start()
            },
            home       : function () {
                var GridView= new __WEBPACK_IMPORTED_MODULE_0__views_grid_js__["a" /* default */]();
                GridView.view.render();
            },
            login:function () {
                var LoginView= new __WEBPACK_IMPORTED_MODULE_2__views_login_js__["a" /* default */]();
                LoginView.view.render();

            },
            signUp: function(){
                var SignUpView= new __WEBPACK_IMPORTED_MODULE_1__views_signUp_js__["a" /* default */]();
                SignUpView.view.render();
            }


        });
        var router = new MyRouter();

    });



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


function Grid() {

        var self = this;
        var dataBudget = [];
        kendo.culture("ru-RU");
        var dataGrid = new kendo.data.DataSource({
                data     : dataBudget,
                autoSync : false,
                change   : function (e) {
                    if (e.action == "itemchange") {
                        var item = e.items[0].toJSON();
                        switch (e.field) {
                            case "AccruedSum" :
                                item.SumToPay = item.Prepayment ? item.AccruedSum - item.Prepayment : item.AccruedSum;
                                item.SumUSD   = Math.floor((item.SumToPay / 3) / 100) * 100;
                                item.SumUAH   = item.ExchangeRate ? (item.SumToPay - item.SumUSD) * item.ExchangeRate : (item.SumToPay - item.SumUSD) + "$ - установи курс!";
                                this.pushUpdate(item);
                                break;
                            case "ExchangeRate" :
                                item.SumUAH = item.SumUAH ? (item.SumToPay - item.SumUSD) * item.ExchangeRate : 0;
                                this.pushUpdate(item);
                                break;
                            case "Prepayment" :
                                item.SumToPay = item.Prepayment ? item.AccruedSum - item.Prepayment : item.AccruedSum;
                                item.SumUSD   = Math.floor((item.SumToPay / 3) / 100) * 100;
                                item.SumUAH   = item.ExchangeRate ? (item.SumToPay - item.SumUSD) * item.ExchangeRate : (item.SumToPay - item.SumUSD) + "$ - установи курс!";
                                this.pushUpdate(item);
                                break;
                        }

                    }


                },
                schema   : {
                    model : {
                        id     : "id",
                        fields : {
                            id           : {
                                defaultValue : function () {
                                    return kendo.guid();
                                }

                            }
                            ,
                            MonthToPay   : {}
                            ,
                            AccruedSum   : {},
                            SumToPay     : {}
                            ,
                            Prepayment   : {},
                            SumUAH       : {}
                            ,
                            ExchangeRate : {}
                            ,
                            DateUAHPay   : {}
                            ,
                            SumUSD       : {}
                            ,
                            DateUSDPay   : {}
                        }
                    }
                }


            }
        );


        var View  = Backbone.View.extend({
            el : "#content",

            initialize : function () {
               // this.render();
            },
            render     : function () {
                var self   = this;
                var gridEl = $("<div></div>");
                this.$el.html(gridEl);

                $.get("/home").done(function(response){
                    if (response.data) {
                        var model = JSON.parse(response.data);
                        dataGrid.data(model);
                        self.grid = gridEl.kendoGrid({
                            theme      : "material",
                            toolbar    : [
                                {
                                    name : "create",
                                    text: "Добавить новую запись"
                                },
                                {
                                    name : "save",
                                    text: "Сохранить данные"
                                }],
                            dataSource : dataGrid,
                            columns    : [
                                {
                                    field  : "id",
                                    hidden : true,
                                    editor : idEditor,
                                },
                                {
                                    field  : "MonthToPay",
                                    title  : "Месяц оплаты",
                                    editor : dateEditor,
                                    format : "{0: MMMM yyyy}"


                                },
                                {
                                    field  : "AccruedSum",
                                    title  : "Сумма начислено",
                                    editor : numberEditor
                                },

                                {
                                    field  : "SumToPay",
                                    title  : "Сумма к оплате",
                                    editor : numberEditor
                                },

                                {
                                    field : "Prepayment",
                                    title : "Сумма аванса",

                                },
                                {
                                    field : "SumUAH",
                                    title : "Сумма гривен"
                                },
                                {
                                    field : "ExchangeRate",
                                    title : "Курс"

                                },
                                {
                                    field  : "DateUAHPay",
                                    title  : "Дата получения UAH",
                                    editor : dateEditor,
                                    format : "{0: dd MMMM yyyy}",

                                },
                                {
                                    field : "SumUSD",
                                    title : "Сумма USD"

                                },
                                {
                                    field  : "DateUSDPay",
                                    title  : "Дата получения USD",
                                    editor : dateEditor,
                                    format : "{0: dd MMMM yyyy}",


                                },
                                {

                                    width : "200px"
                                }],
                            editable   : {
                                createAt : "bottom",
                                mode     : "popup"

                            },

                            height      : 600,
                            rowTemplate : kendo.template($("#rowTemplate").html()),
                            edit        : function (e) {
                                self.popupWindow = e.container;

                            },
                            dataBinding : function (e) {

                                if (e.action === "itemchange") {
                                    console.log("dataBinding");
                                    console.log(e);
                                    kendo.bind(self.popupWindow, e.items[0]);

                                }
                            },
                            saveChanges : function (e) {
                                var model = e.sender.dataSource.data().toJSON();
                                $.post("/saveData",{
                                    data: JSON.stringify(model)
                                }).done(function(data) {
                                    alert("Данные сохранены успешно!")
                                });
                            },
                            change      : function () {
                            }


                        }).data("kendoGrid");
                    }else{
                        window.location.replace("/");
                        alert("Авторизируйтесь пожалуйста");
                    }

                });






            }

        });
        self.view = new View();


        function dateEditor(container, options) {

            var index = self.view.grid.dataSource._data.length - 1;
            var D     = new Date(self.view.grid.dataSource._data[index - 1] ? self.view.grid.dataSource._data[index - 1].MonthToPay : "");
            D.setMonth(D.getMonth() + 1);
            self.view.grid.dataSource._data[index].MonthToPay = D;
            self.view.grid.dataSource._data[index].ExchangeRate=self.view.grid.dataSource._data[index-1]? self.view.grid.dataSource._data[index-1].ExchangeRate:'';
            var req   = (options.field == 'MonthToPay') ? 'required' : "";
            var input = $("<input " + req + " validationMessage='Заполни дату' />");
            // set its name to the field to which the column is bound ('name' in this case)
            input.attr("name", options.field);
            // append it to the container
            input.appendTo(container);
            input.kendoDatePicker({
                depth  : options.field == "MonthToPay" ? "year" : "day",
                start  : options.field == "MonthToPay" ? "year" : "day",
                format : options.field == "MonthToPay" ? "MMMM yyyy" : "dd/MMMM/yy",
                min    : new Date(2011, 0, 1),

                dateInput : true
            }).data("kendoDatePicker");

        }

        function numberEditor(container, options) {
            if (options.field == "AccruedSum") {
                $('<input class="k-input k-textbox" required min="100" validationMessage="Заполни сумму ЗП"/>').attr("name", options.field)
                    .appendTo(container);
            }
            else {
                $('<input class="k-input k-textbox" disabled="disabled" min="100" validationMessage="Заполни сумму ЗП"/>').attr("name", options.field)
                    .appendTo(container);
            }


        }

        function idEditor(container, options) {
            $("div > label[for='" + options.field + "']").hide();
            container.hide();


        }
    };

/* harmony default export */ __webpack_exports__["a"] = (Grid);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signUp_html__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signUp_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__signUp_html__);
/**
 * Created by Yurii on 14.12.2017.
 */



function SignUp() {
    var self = this;

    var View  = Backbone.View.extend({
        el         : "#content",
        initialize : function () {
            this.render();
        },
        events: {
            "submit form.formSingUp"         : "submitSignUp",
          },
        render     : function () {
            this.$el.html(__WEBPACK_IMPORTED_MODULE_0__signUp_html___default.a);
            //this.$el.find('form').on("submit", this.submitForm)
        },
        submitSignUp: function(e){
            var name = $(e.target).find("input#inputLogin").val();
            var email = $(e.target).find("input#inputEmail").val();

            var pass =  $(e.target).find("input#inputPassword").val();
            var passConfirm = $(e.target).find("input#confirmPassword").val();
            debugger
            if(pass!=passConfirm){
               alert("Введенные пароли не совпадают!");
                return false;
            }
            debugger
            $.post( "/signup", {
                username: name,
                password: pass,
                email: email
            } ).done(function( data ) {
                window.location.replace("#home");
            });
            return false;
        },
        signUp: function(){
            window.location.replace(window.location.href +"#signUp");
        }

    });

    self.view = new View();

}

/* harmony default export */ __webpack_exports__["a"] = (SignUp);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\r\n    <form class=\"form-signin formSingUp\">\r\n        <h2 class=\"form-signin-heading\">Пожалуйста заполните форму регистрации:</h2>\r\n        <label for=\"inputLogin\" class=\"sr-only\">Логин</label>\r\n        <input type=\"text\" id=\"inputLogin\" class=\"form-control\" placeholder=\"Введите логин\" required=\"\" autofocus=\"\">\r\n\r\n        <label for=\"inputEmail\" class=\"sr-only\">E-mail</label>\r\n        <input type=\"email\" id=\"inputEmail\" class=\"form-control\" placeholder=\"Введите e-mail'\" required=\"\" autofocus=\"\">\r\n\r\n        <label for=\"inputPassword\" class=\"sr-only\">Пароль</label>\r\n        <input type=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Введите пароль\" required=\"\">\r\n\r\n        <label for=\"confirmPassword\" class=\"sr-only\">Подтвердите пароль</label>\r\n        <input type=\"password\" id=\"confirmPassword\" class=\"form-control\" placeholder=\"Подтвердите пароль\" required=\"\">\r\n\r\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Зарегистрироваться</button>\r\n    </form>\r\n\r\n</div>";

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_html__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__login_html__);
/**
 * Created by Yurii on 14.12.2017.
 */



function Login() {
    var self = this;

    var View  = Backbone.View.extend({
        el         : "#content",
        initialize : function () {
            this.render();
        },
        events: {
            "submit form.formSingIn"         : "submitForm",
            "click #signUpBTN"    : "signUp"
        },
        render     : function () {
            this.$el.html(__WEBPACK_IMPORTED_MODULE_0__login_html___default.a);
            //this.$el.find('form').on("submit", this.submitForm)
        },
        submitForm: function(e){
            var name = $(e.target).find("input#inputLogin").val();
            var pass =  $(e.target).find("input#inputPassword").val();

            $.post( "/login", {
                username: name,
                password: pass
            } ).done(function(data) {
                window.location.replace("#home");
            });
            return false;
        },
        signUp: function(){
            window.location.replace(window.location.href +"#signUp");
        }

    });

    self.view = new View();

}

/* harmony default export */ __webpack_exports__["a"] = (Login);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\r\n    <form class=\"form-signin formSingIn\">\r\n        <h2 class=\"form-signin-heading\">Пожалуйста авторизируйтесь:</h2>\r\n        <label for=\"inputLogin\" class=\"sr-only\">Логин</label>\r\n        <input type=\"text\" id=\"inputLogin\" class=\"form-control\" placeholder=\"Введите логин\" required=\"\" autofocus=\"\">\r\n        <label for=\"inputPassword\" class=\"sr-only\">Пароль</label>\r\n        <input type=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Введите пароль\" required=\"\">\r\n        <div class=\"checkbox\">\r\n            <label>\r\n                <input type=\"checkbox\" value=\"remember-me\"> Remember me\r\n            </label>\r\n        </div>\r\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Войти</button>\r\n\r\n    </form>\r\n    <button class=\"btn btn-lg btn-info btn-block\" id=\"signUpBTN\">Зарегистрироваться</button>\r\n</div>";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "<script type=\"text/template\" id=\"rowTemplate\">\r\n\r\n    <tr data-uid=\"#= uid #\" class=\"#: DateUAHPay&&DateUSDPay  ? 'green':'' #\">\r\n        <td>#: MonthToPay ? kendo.toString(new Date(MonthToPay), \"MMMM yyyy\"):\"\" #</td>\r\n        <td>#: AccruedSum #</td>\r\n        <td>#: Prepayment #</td>\r\n        <td>#: SumToPay #</td>\r\n        <td class=\"#: DateUAHPay  ? 'green':'' #\">#: SumUAH #</td>\r\n        <td>#: ExchangeRate #</td>\r\n        <td class=\"#: DateUAHPay ? 'green':'' #\">#:DateUAHPay? kendo.toString(new Date(DateUAHPay),\"dd MMMM yy\"):\"\" #\r\n        </td>\r\n        <td class=\"#: DateUSDPay  ? 'green':'' #\">#: SumUSD #</td>\r\n        <td class=\"#: DateUSDPay  ? 'green':'' #\">#: DateUSDPay? kendo.toString(new Date(DateUSDPay),\"dd MMMM yy\"):\"\"\r\n            #\r\n        </td>\r\n        <td><a class=\"k-button k-button-icontext k-grid-edit\" href=\"\\\\#\"><span\r\n                class=\"k-icon k-edit\"></span>Edit</a><a class=\"k-button k-button-icontext k-grid-delete\"\r\n                                                        href=\"\\\\#\"><span\r\n                class=\"k-icon k-delete\"></span>Delete</a>\r\n        </td>\r\n    </tr>\r\n\r\n</script>\r\n\r\n<script type=\"text/template\" id=\"editWindowTemplate\">\r\n<div class=\"k-widget k-window\" data-role=\"draggable\"\r\n     style=\"padding-top: 32.9088px; min-width: 90px; min-height: 50px; top: 173.344px; left: 412px; touch-action: none; z-index: 10003; opacity: 1; transform: scale(1);\">\r\n    <div class=\"k-window-titlebar k-header\" style=\"margin-top: -32.9088px;\">&nbsp;<span\r\n            class=\"k-window-title\">Edit</span>\r\n        <div class=\"k-window-actions\"><a role=\"button\" href=\"#\" class=\"k-window-action k-link\"><span role=\"presentation\"\r\n                                                                                                     class=\"k-icon k-i-close\">Close</span></a>\r\n        </div>\r\n    </div>\r\n    <div data-uid=\"03c454ce-0207-4ed3-8fe7-eaa3602f67d0\" class=\"k-popup-edit-form k-window-content k-content\"\r\n         data-role=\"window\" tabindex=\"0\">\r\n        <div class=\"k-edit-form-container\">\r\n            <div class=\"k-edit-label\"><label for=\"id\">id</label></div>\r\n            <div data-container-for=\"id\" class=\"k-edit-field\"><input type=\"text\" class=\"k-input k-textbox\" name=\"id\"\r\n                                                                     data-bind=\"value:id\"></div>\r\n            <div class=\"k-edit-label\"><label for=\"MonthToPay\">Месяц оплаты</label></div>\r\n            <div data-container-for=\"MonthToPay\" class=\"k-edit-field\"><span class=\"k-widget k-datepicker k-header\"><span\r\n                    class=\"k-picker-wrap k-state-default\"><input required=\"\" validationmessage=\"Заполни дату\"\r\n                                                                 name=\"MonthToPay\" data-role=\"datepicker\" type=\"text\"\r\n                                                                 class=\"k-input\" role=\"combobox\" aria-expanded=\"false\"\r\n                                                                 aria-disabled=\"false\" data-bind=\"value:MonthToPay\"\r\n                                                                 style=\"width: 100%;\"><span unselectable=\"on\"\r\n                                                                                            class=\"k-select\"\r\n                                                                                            role=\"button\"><span\r\n                    unselectable=\"on\" class=\"k-icon k-i-calendar\">select</span></span></span></span></div>\r\n            <div class=\"k-edit-label\"><label for=\"AccruedSum\">Сумма начислено</label></div>\r\n            <div data-container-for=\"AccruedSum\" class=\"k-edit-field\"><input class=\"k-input k-textbox\" required=\"\"\r\n                                                                             min=\"100\"\r\n                                                                             validationmessage=\"Заполни сумму ЗП\"\r\n                                                                             name=\"AccruedSum\"\r\n                                                                             data-bind=\"value:AccruedSum\"></div>\r\n            <div class=\"k-edit-label\"><label for=\"SumToPay\">Сумма к оплате</label></div>\r\n            <div data-container-for=\"SumToPay\" class=\"k-edit-field\"><input class=\"k-input k-textbox\" disabled=\"disabled\"\r\n                                                                           min=\"100\"\r\n                                                                           validationmessage=\"Заполни сумму ЗП\"\r\n                                                                           name=\"SumToPay\" data-bind=\"value:SumToPay\">\r\n            </div>\r\n            <div class=\"k-edit-label\"><label for=\"Prepayment\">Сумма аванса</label></div>\r\n            <div data-container-for=\"Prepayment\" class=\"k-edit-field\"><input type=\"text\" class=\"k-input k-textbox\"\r\n                                                                             name=\"Prepayment\"\r\n                                                                             data-bind=\"value:Prepayment\"></div>\r\n            <div class=\"k-edit-label\"><label for=\"SumUAH\">Сумма гривен</label></div>\r\n            <div data-container-for=\"SumUAH\" class=\"k-edit-field\"><input type=\"text\" class=\"k-input k-textbox\"\r\n                                                                         name=\"SumUAH\" data-bind=\"value:SumUAH\"></div>\r\n            <div class=\"k-edit-label\"><label for=\"ExchangeRate\">Курс</label></div>\r\n            <div data-container-for=\"ExchangeRate\" class=\"k-edit-field\"><input type=\"text\" class=\"k-input k-textbox\"\r\n                                                                               name=\"ExchangeRate\"\r\n                                                                               data-bind=\"value:ExchangeRate\"></div>\r\n            <div class=\"k-edit-label\"><label for=\"DateUAHPay\">Дата получения UAH</label></div>\r\n            <div data-container-for=\"DateUAHPay\" class=\"k-edit-field\"><span class=\"k-widget k-datepicker k-header\"><span\r\n                    class=\"k-picker-wrap k-state-default\"><input validationmessage=\"Заполни дату\" name=\"DateUAHPay\"\r\n                                                                 data-role=\"datepicker\" type=\"text\" class=\"k-input\"\r\n                                                                 role=\"combobox\" aria-expanded=\"false\"\r\n                                                                 aria-disabled=\"false\" data-bind=\"value:DateUAHPay\"\r\n                                                                 style=\"width: 100%;\"><span unselectable=\"on\"\r\n                                                                                            class=\"k-select\"\r\n                                                                                            role=\"button\"><span\r\n                    unselectable=\"on\" class=\"k-icon k-i-calendar\">select</span></span></span></span></div>\r\n            <div class=\"k-edit-label\"><label for=\"SumUSD\">Сумма USD</label></div>\r\n            <div data-container-for=\"SumUSD\" class=\"k-edit-field\"><input type=\"text\" class=\"k-input k-textbox\"\r\n                                                                         name=\"SumUSD\" data-bind=\"value:SumUSD\"></div>\r\n            <div class=\"k-edit-label\"><label for=\"DateUSDPay\">Дата получения USD</label></div>\r\n            <div data-container-for=\"DateUSDPay\" class=\"k-edit-field\"><span class=\"k-widget k-datepicker k-header\"><span\r\n                    class=\"k-picker-wrap k-state-default\"><input validationmessage=\"Заполни дату\" name=\"DateUSDPay\"\r\n                                                                 data-role=\"datepicker\" type=\"text\" class=\"k-input\"\r\n                                                                 role=\"combobox\" aria-expanded=\"false\"\r\n                                                                 aria-disabled=\"false\" data-bind=\"value:DateUSDPay\"\r\n                                                                 style=\"width: 100%;\"><span unselectable=\"on\"\r\n                                                                                            class=\"k-select\"\r\n                                                                                            role=\"button\"><span\r\n                    unselectable=\"on\" class=\"k-icon k-i-calendar\">select</span></span></span></span></div>\r\n            <div class=\"k-edit-label\"><label for=\"undefined\"></label></div>\r\n            <div class=\"k-edit-field\"></div>\r\n            <div class=\"k-edit-buttons k-state-default\"><a class=\"k-button k-button-icontext k-primary k-grid-update\"\r\n                                                           href=\"#\"><span class=\"k-icon k-update\"></span>Update</a><a\r\n                    class=\"k-button k-button-icontext k-grid-cancel\" href=\"#\"><span class=\"k-icon k-cancel\"></span>Cancel</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</script>";

/***/ })
/******/ ]);