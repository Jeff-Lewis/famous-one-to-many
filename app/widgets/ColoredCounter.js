define(
	"app/widgets/ColoredCounter", 
	[
        "require",
        "exports",
        "module",
        "./Counter",
        "famous-color/ColorPalettes"
    ],
    function (t, i, e) 
    {
        function s() {
            o.apply(this, arguments)
        }

        var o = t("./Counter");
        var n = t("famous-color/ColorPalettes");

        s.prototype = Object.create(o.prototype),
        s.prototype.constructor = s,
        s.DEFAULT_OPTIONS = o.DEFAULT_OPTIONS,
        s.DEFAULT_OPTIONS.colorPalette = n.getRandomPalette(),
        s.prototype._setToValue = function (t) {
            var i = this.options.colorPalette.getColor(this.value % this.options.colorPalette.colors.length);
            t.setProperties({
                color: i.hex
            }),
            t.setContent(this.value + "")
        };
        e.exports = s;
    }
);