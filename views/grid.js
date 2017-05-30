define(function () {

    return function () {

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
                    theme       : "material",
                    toolbar     : [
                        {
                            name : "create"
                        },
                        {
                            name : "save"

                        }],
                    dataSource  : dataGrid,
                    columns     : [
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
                    editable    : {
                        createAt : "bottom",
                        mode     : "popup"

                    },

                    height      : 600,
                    rowTemplate : kendo.template($("#rowTemplate").html()),
                    edit        : function (e) {
                        self.popupWindow = e.container;

                        if (!e.model.MonthToPay) {
                        var index=_.findIndex(e.sender.dataSource._data, {id:e.model.id});
                           var D = new Date(e.sender.dataSource._data[index-1] ? e.sender.dataSource._data[index-1].MonthToPay:"");
                            D.setMonth(D.getMonth() + 1);
                            console.log(kendo.toString(new Date(D), "MMMM yyyy"));
                            e.model.AccruedSum=900;
                            e.sender.dataSource.pushUpdate(e.model);

                        }
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
                        console.log(JSON.stringify(data));
                        localStorage.setItem("budget", JSON.stringify(data));

                    },
                    change: function(){
                        debugger;
                    }



                }).data("kendoGrid");

            }

        });
        self.view = new View();

        function dateEditor(container, options) {
            debugger;
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
    }


})
;