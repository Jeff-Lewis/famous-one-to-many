define(
	"app/widgets/EmptyClass", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Surface", 
		"famous/Modifier", 
		"famous-animation/Easing"
	], 
	function (t, i, e) 
	{
        function s() {
            o.apply(this, arguments), this.eventInput.pipe(this.eventOutput)
        }

        var o = t("famous/View");
        t("famous/Matrix"), t("famous/Surface"), t("famous/Modifier"), t("famous-animation/Easing"), s.prototype = Object.create(o.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {}, e.exports = s
    }
); 