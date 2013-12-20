define(
	"core/ExpandingSurface", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous/Engine"
	], function (t, i, e) 
	{
        function s() {
            n.apply(this, arguments), this._dirty = !0, this._checkHeight = o.bind(this), r.on("postrender", this._checkHeight)
        }

        function o() {
            if (this._dirty && this._currTarget) {
                var t = [this.size[0], this._currTarget.firstChild.clientHeight];
                this.setSize(t), this.emit("resize", t), this._dirty = !1, r.unbind("postrender", this._checkHeight)
            }
        }

        var n = t("famous/Surface"),
            r = t("famous/Engine");
        s.prototype = Object.create(n.prototype), s.prototype.constructor = s, s.prototype.setHeightDirty = function () {
            this._dirty = !0, r.on("postrender", this._checkHeight)
        }, e.exports = s
    }
); 