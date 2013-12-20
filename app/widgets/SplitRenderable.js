define(
	"app/widgets/SplitRenderable", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Surface", 
		"famous/ImageSurface", 
		"famous/Modifier", 
		"famous-animation/Easing"
	], 
	function (t, i, e) 
	{
        function s() {
            n.apply(this, arguments), this.eventInput.pipe(this.eventOutput), this.modifiers = [], o.call(this)
        }

        function o() {
            for (var t = 0; t < this.options.images.length; t++) this.addContent(this.options.content[t]);
            this.setDepth(this.options.depth)
        }

        var n = t("famous/View"),
            r = t("famous/Matrix");
        t("famous/Surface"), t("famous/ImageSurface");
        var a = t("famous/Modifier"),
            h = t("famous-animation/Easing");
        s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            content: [],
            size: [400, 400],
            depth: 50
        }, s.prototype.setDepth = function (t) {
            for (var i = 0; i < this.modifiers.length; i++) this.modifiers[i].halt(), this.modifiers[i].setTransform(r.translate(0, 0, t * i), {
                curve: h.outCubicNorm,
                duration: 400
            }), i == this.modifiers.length - 1 && (this._maxDepth = t * i)
        }, s.prototype.getSize = function () {
            return this.options.size
        }, s.prototype.getMaxDepth = function () {
            return this._maxDepth
        }, s.prototype.addContent = function (t) {
            var i = this.modifiers.length,
                e = new a({
                    transform: r.translate(0, 0, i * this.options.depth)
                });
            t.pipe(this), this.modifiers.push(e), this.node.add(e).link(t)
        }, e.exports = s
    }
); 