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

    
   // import Templates from './templates.html';
    jQuery.migrateMute=true;
    jQuery.migrateTrace = false;
    jQuery.migrateReset();
  /*  var div       = document.createElement('div');
    div.innerHTML = Templates;
    document.body.appendChild(div);*/



    // views, layouts
    $(document).ready(function(){
        var GridView= new __WEBPACK_IMPORTED_MODULE_0__views_grid_js__["a" /* default */]();
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



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


function Grid() {

        var self = this;

        var dataBudget = JSON.parse(localStorage.getItem("budget")) || [];

        kendo.culture("ru-RU")
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


                this.render();
            },
            render     : function () {
                var self   = this;
                var gridEl = $("<div></div>");
                this.$el.html(gridEl);

                self.grid = gridEl.kendoGrid({
                    theme      : "material",
                    toolbar    : [
                        {
                            name : "create"
                        },
                        {
                            name : "save"

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
                        var data = e.sender.dataSource.data().toJSON();
                        localStorage.setItem("budget", JSON.stringify(data));

                    },
                    change      : function () {
                    }


                }).data("kendoGrid");

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

/***/ })
/******/ ]);