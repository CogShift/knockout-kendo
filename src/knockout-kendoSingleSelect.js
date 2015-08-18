createBinding({
	name: "kendoSingleSelect",
	events: {
		change: function(options, event) {
			var widget = event.sender,
				valuePrimitive = widget.options.valuePrimitive;

			if (options.value) {
				var value = widget.value();
                if(value === "" || value === undefined || value === null) {
                    options.value(null);
                } else if (valuePrimitive) {
                    options.value(value);
                } else {
                    options.value(widget.dataItem());
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
		search: [SEARCH, CLOSE],
		data: function(value) {
			ko.kendo.setDataSource(this, value);
		},
		value: function(value) {
            var widget = this,
                dataValueField = widget.options.dataValueField;

            value = ko.utils.unwrapObservable(value);

            if ((value instanceof Array || value instanceof kendo.data.ObservableArray) && value.length) {
                value = $.map(value, function(item) {
            		ensureDataExists(value, widget);
                    return getDataValueField(item, dataValueField);
                });
            } else {
        		ensureDataExists(value, widget);
                value = getDataValueField(value, dataValueField);
            }

            widget.value(value);
        }
	}
});
