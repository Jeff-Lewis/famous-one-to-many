define(
	"app/Highlight", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous/RenderNode", 
		"famous/Modifier", 
		"famous/Matrix"
	], 
	function (t, i, e) 
	{
        function s(t, i, e, s, a) {
            this.x = t, this.y = i, this.surface = e, this.scaleX = s, this.scaleY = a, "undefined" == typeof this.scaleX && (this.scaleX = 10), "undefined" == typeof this.scaleY && (this.scaleY = 10), this.transition = {
                curve: "easeInOut",
                duration: 1e3
            }, this.transform = new n(r.identity, 0), this.node = new o, this.node.from(this.transform).from(this.surface)
        }
        t("famous/Surface");
        var o = t("famous/RenderNode"),
            n = t("famous/Modifier"),
            r = t("famous/Matrix");
        s.prototype.set = function (t, i) {
            return this.x = t, this.y = i, this
        }, s.prototype.setScaleX = function (t) {
            this.scaleX = t
        }, s.prototype.setScaleY = function (t) {
            this.scaleY = t
        }, s.prototype.setTransitionCurve = function (t) {
            this.transition.curve = t
        }, s.prototype.setTransitionDuration = function (t) {
            this.transition.duration = t
        }, s.prototype.activate = function (t) {
            return this.transform.halt(), this.transform.setOpacity(1), this.transform.setTransform(r.move(r.scale(1, 1, 1), [this.x, this.y, -1])), this.transform.setTransform(r.move(r.scale(this.scaleX, this.scaleY), [this.x, this.y, -1]), this.transition), this.transform.setOpacity(0, this.transition, t), this
        }, s.prototype.render = function () {
            return this.node.execute()
        }, e.exports = s
    }
); 