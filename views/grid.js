import swal from 'sweetalert2'
function Grid() {

    var self       = this;
    var dataBudget = [];
    var name
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

            $.get("/getData").done(function (response) {
                var _response = JSON.parse(response);
                if (_response.data) {
                    var model = JSON.parse(_response.data);
                    name      = _response.name;
                    dataGrid.data(model);
                    self.grid = gridEl.kendoGrid({
                        theme      : "material",
                        toolbar    : [
                            {
                                template : '<span class="nameSpan" >Добрый день ' + name + '!</span>'
                            },
                            {
                                name : "create",
                                text : "Добавить новую запись"
                            },
                            {
                                name : "save",
                                text : "Сохранить данные"
                            },
                            {
                                template : '<a class="k-button logoutBtn" href="\\#">Выйти</a>'
                            }
                        ],
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

                            $('.logoutBtn').off().on("click", logout);
                            if (e.action === "itemchange") {
                                kendo.bind(self.popupWindow, e.items[0]);

                            }
                        },
                        saveChanges : function (e, callback) {
                            var model = self.grid.dataSource.data().toJSON();
                            $.post("/saveData", {
                                data : JSON.stringify(model)
                            }).done(function (data) {
                                swal({
                                    title             : 'Сохранено!',
                                    text              : 'Данные сохранены успешно!',
                                    type              : 'success',
                                    showConfirmButton : false,
                                    timer             : 1500
                                });
                            });
                        },
                        change      : function () {
                        }
                    }).data("kendoGrid");
                } else {
                    window.location.replace("/");
                    alert("Авторизируйтесь пожалуйста");
                }

            }).fail(function (response) {
                window.location.replace("/");
                alert("Авторизируйтесь пожалуйста");
            });


        }

    });
    self.view = new View();

    function logout() {
        swal({
            title              : 'Сохранить данные?',
            text               : "You won't be able to revert this!",
            type               : 'warning',
            showCancelButton   : true,
            confirmButtonColor : '#3085d6',
            cancelButtonColor  : '#d33',
            confirmButtonText  : 'Да, сохранить и выйти!',
            cancelButtonText   : 'Нет, выйти без сохранения!',
            confirmButtonClass : 'btn btn-success',
            cancelButtonClass  : 'btn btn-danger',
            buttonsStyling     : false,
            reverseButtons     : true
        }).then((result) => {
            if (result.value) {
                self.view.grid.saveChanges();
                setTimeout(function () {
                    $.get('/signout').done(function () {
                        window.location.replace("/");
                    });
                }, 1000);
                // result.dismiss can be 'cancel', 'overlay',
                // 'close', and 'timer'
            } else if (result.dismiss === 'cancel') {

                swal(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
                setTimeout(function () {
                    $.get('/signout').done(function () {
                        window.location.replace("/");
                    });
                }, 1000);
            }
        });
        /* $.get('/signout').done(function () {
         alert("Всего наилучшего!");
         window.location.replace("/");
         })*/
    };

    function dateEditor(container, options) {

        var index = self.view.grid.dataSource._data.length - 1;
        var D     = new Date(self.view.grid.dataSource._data[index - 1] ? self.view.grid.dataSource._data[index - 1].MonthToPay : "");
        D.setMonth(D.getMonth() + 1);
        self.view.grid.dataSource._data[index].MonthToPay   = D;
        self.view.grid.dataSource._data[index].ExchangeRate = self.view.grid.dataSource._data[index - 1] ? self.view.grid.dataSource._data[index - 1].ExchangeRate : '';
        var req                                             = (options.field == 'MonthToPay') ? 'required' : "";
        var input                                           = $("<input " + req + " validationMessage='Заполни дату' />");
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

export default Grid;