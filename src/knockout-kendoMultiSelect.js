createBinding({
    name: "kendoMultiSelect",
    events: {
        change: function(options, event) {
            var widget = event.sender,
                valuePrimitive = widget.options.valuePrimitive;

            if (options.value) {
                if (valuePrimitive) {
                    options.value(widget.value());
                } else {
                    options.value(widget.dataItems());
                }
            }
        },
        dataBound: function (options, event) {
	        var widget = event.sender;
        	if (widget._state !== "filter") {
        		setListValue(widget, ko.utils.unwrapObservable(options.value));
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
        search: [SEARCH, CLOSE],
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        },
        value: function(value) {
	        setListValue(this, value);
        }
    }
});
