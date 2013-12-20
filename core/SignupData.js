define(
	"core/SignupData", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/EventHandler", 
		"famous/Utility", 
		"app/ID", 
		"./GA"
	], 
	function (t, i, e) 
	{
        function s(t) {
            this.options = {
                formId: "",
                emailId: "",
                githubId: "",
                twitterId: ""
            };
            for (var i in t) this.options[i] = t[i];
            this.form, this.email, this.github, this.twitter, this.eventHandler = new n, n.setInputHandler(this, this.eventHandler), n.setOutputHandler(this, this.eventHandler), this._onSubmit = o.bind(this), this.registerView(), this.reset()
        }

        function o(t) {
            t.preventDefault(), this.sendData()
        }

        var n = t("famous/EventHandler"),
            r = t("famous/Utility"),
            a = t("app/ID"),
            h = t("./GA");
        s.prototype.reset = function () {
            this.form = document.getElementById(this.options.formId), this.email = document.getElementById(this.options.emailId), this.github = document.getElementById(this.options.githubId), this.twitter = document.getElementById(this.options.twitterId), this.events()
        }, s.prototype.events = function () {
            this.form.addEventListener("submit", this._onSubmit)
        }, s.prototype._getData = function () {
            var t = {};
            return this.email && (t.email = this.email.value), this.github && (t.github = this.github.value), this.twitter && (t.twitter = this.twitter.value), t
        }, s.prototype.registerView = function () {
            var t = "http://fsrv.us/?f=registerView&demoID=" + a;
            r.loadURL(t)
        }, s.prototype.sendData = function () {
            var t = this._getData(),
                i = "http://fsrv.us/?f=registerUserforNewsletter&email=" + t.email + "&demoID=" + a;
            t.github && (i += "&github=" + t.github), t.twitter && (i += "&twitter=" + t.twitter), this.emit("loadingStart"), h.push(["_trackEvent", "sign-up", "submit", , 1, !0]), r.loadURL(i, function (t) {
                this.signupResponse = JSON.parse(t), this.parseResponse()
            }.bind(this))
        }, s.prototype.parseResponse = function () {
            console.log(this.signupResponse), this.emit("loadingEnd"), null == this.signupResponse.error ? this.emit("success") : this.emit("error", this.signupResponse.error)
        }, e.exports = s
    }
); 