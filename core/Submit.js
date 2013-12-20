define(
	"core/Submit", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous-utils/Time"
	], 
	function (t, i, e) 
	{
        function s() {
            this._submitDelay = 200, this.submit = new n({
                properties: {
                    backgroundColor: "rgba( 255, 255, 255, 1.0)",
                    color: "rgba( 0, 0, 0, 1.0 )",
                    textAlign: "center"
                },
                classes: ["submit"],
                content: "JOIN!",
                size: this._submitSize
            }), this.loadingIndex = 2
        }

        function o() {
            if (this.isLoading) {
                for (var t = "", i = 1; i < this.loadingIndex; i++) t += ".";
                this.loadingIndex = (this.loadingIndex + 1) % 4 + 1, this.submit.setContent(t), r.setTimeout(this._boundLoading, this._submitDelay)
            }
        }

        var n = t("famous/Surface"),
            r = t("famous-utils/Time");
        s.prototype.render = function () {
            return this.submit.render()
        }, s.prototype.on = function (t, i) {
            return this.submit.on(t, i)
        }, s.prototype.setLoading = function () {
            this.isLoading = !0, this._boundLoading = o.bind(this), o.call(this)
        }, s.prototype.setSuccess = function () {
            this.isLoading = !1, this.submit.setContent("SENT")
        }, s.prototype.setDefault = function () {
            this.isLoading = !1, this.submit.setContent("JOIN!")
        }, e.exports = s
    }
); 