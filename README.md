# FlotEnumeration
Plot enumerated values in flot!

Set axis.mode to "enum" to enable. 

The plugin requires the enumerated axis to contain an "enumMap" option.
"enumMap" is an array of strings that maps the value in the data to
a string. Example:
	
["DIS","ENA"] would display "DIS" on the axis for points at 0 and "ENA"
for points at 1.
