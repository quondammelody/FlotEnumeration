/* Flot plugin for enumerated axes

Copyright (c) 2014 SSL and Joshua Hoskins
Licensed under the MIT license

Version 0.3

Set axis.mode to "enum" to enable. 

The plugin requires the enumerated axis to contain an "enumMap" option.
"enumMap" is an array of strings that maps the value in the data to
a string. Example:
	
["DIS","ENA"] would display "DIS" on the axis for points at 0 and "ENA"
for points at 1.

*/

(function($) {

    var options = {
        yaxis: {
            enumMap: null       // Array of strings with each string corresponding to the enumeration value
        }
    };

    function init(plot) {
        plot.hooks.processOptions.push(function (plot, options) {
            $.each(plot.getAxes(), function(axisName, axis) {

                var opts = axis.options;

                if (opts.mode == "enum") {
                    axis.tickGenerator = function (axis) {

                        var ticks = [],
                            start = floorInBase(axis.min, axis.tickSize),
                            i = 0,
                            v = Number.NaN,
                            prev;

                        do {
                            prev = v;
                            v = start + i * axis.tickSize;
                            ticks.push(v);
                            ++i;
                        } while (v < axis.max && v != prev);
                        return ticks;
                    };

                    axis.tickFormatter = function (value, axis) {
                        formatted = axis.options.enumMap[value];
                        if(formatted === null)
                            formatted = "undef";
                        return formatted;
                    };
                }
            });
        });
    }
    
    // round to nearby lower multiple of base
    function floorInBase(n, base) {
        return base * Math.floor(n / base);
    }
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'enum',
        version: '0.3'
    });

})(jQuery);
