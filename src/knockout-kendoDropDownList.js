createBinding({
    name: "kendoDropDownList",
    events: {
        change: function (options, event) {
            var widget = event.sender,
                valuePrimitive = widget.options.valuePrimitive;

            if (options.value) {
                if (valuePrimitive) {
                    options.value(widget.value());
                } else {
                    options.value(widget.dataItems ? widget.dataItems() : widget.dataItem());
                }
            }
        },
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE],
        data: function(value) {
            ko.kendo.setDataSource(this, value);

            //if nothing is selected and there is an optionLabel, select it
            if (value.length && this.options.optionLabel && this.select() < 0) {
                this.select(0);
            }
        },
        value: function (value) {
            var widget = this,
                dataValueField = widget.options.dataValueField;

            if ((value instanceof Array || value instanceof kendo.data.ObservableArray) && value.length) {
                value = $.map(value, function(item) {
                    return item !== null && item[dataValueField] !== undefined ? item[dataValueField] : item;
                });
            } else if (typeof value === "object" && value !== null && value[dataValueField] !== undefined) {
                value = value[dataValueField];
            }

            widget.value(value);
        }
    }
});