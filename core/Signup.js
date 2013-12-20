define(
	"core/Signup", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Surface", 
		"famous/Modifier", 
		"famous/Utility", 
		"famous-animation/Easing", 
		"famous-utils/Utils", 
		"famous-utils/KeyCodes", 
		"app/ID", 
		"famous-utils/Time", 
		"./Submit"
	], 
	function (t, i, e) 
	{
        function s() {
            o.apply(this, arguments), this.logo, this.logoModifier, this.logoOpacity = .75, this.buttonOpacity = .75, this.form, this.formModifier, this.submit, this.submitModifier, this.error, this.errorModifier, this.fade, this.fadeModifier, this.close, this.closeModifier, this._signupID = "signuptextfield" + s.ID, s.ID++, this._formSize = [this.options.buttonSize[0] * this.options.textInputScale, this.options.buttonSize[1]], this._submitSize = [this.options.buttonSize[0] * this.options.submitScale, this.options.buttonSize[1]], this.positions(), this.initForm(), this.initLogo(), this.initError(), this.events(), this.showLogo(), this.showFormElements()
        }

        var o = t("famous/View"),
            n = t("famous/Matrix"),
            r = t("famous/Surface"),
            a = t("famous/Modifier"),
            h = t("famous/Utility"),
            u = t("famous-animation/Easing"),
            p = t("famous-utils/Utils"),
            c = t("famous-utils/KeyCodes"),
            l = t("app/ID"),
            f = t("famous-utils/Time"),
            d = t("./Submit");
        s.prototype = Object.create(o.prototype), s.prototype.constructor = s;
        var m = "Join Beta.";
        s.setMessage = function (t) {
            m = t
        }, s.ID = 0, s.DEFAULT_OPTIONS = {
            offset: [0, 0],
            buttonSize: [0, 0],
            submitScale: 2.5,
            textInputScale: 6,
            uiFadeTransition: {
                curve: u.inOutBackNorm,
                duration: 400
            },
            hoverTransition: {
                curve: u.inOutSineNorm,
                duration: 800
            },
            errorSize: [250, 50],
            errorInTransition: {
                curve: u.inOutCubicNorm,
                duration: 400
            },
            errorOutTransition: {
                curve: u.inOutCubicNorm,
                duration: 400
            }
        }, s.prototype.positions = function () {
            var t = window.innerWidth,
                i = window.innerHeight;
            this.shownPositions = {
                logo: n.translate(t - this.options.offset[0] - this.options.buttonSize[0], i - this.options.buttonSize[1] - this.options.offset[1], 0),
                form: n.translate(t - 2 * this.options.offset[0] - this.options.buttonSize[0] - this._formSize[0], i - this.options.buttonSize[1] - this.options.offset[1], 2),
                submit: n.translate(t - 3 * this.options.offset[0] - this.options.buttonSize[0] - this._formSize[0] - this._submitSize[0], i - this.options.buttonSize[1] - this.options.offset[1], 0),
                error: n.translate(t - 2 * this.options.offset[0] - this.options.buttonSize[0] - this._formSize[0], i - 2 * this.options.offset[1] - this.options.errorSize[1] - this.options.buttonSize[1], 0)
            }, this.hiddenPositions = {
                logo: n.translate(t - this.options.offset[0] - this.options.buttonSize[0], i, 0),
                form: n.translate(t - 2 * this.options.offset[0] - this.options.buttonSize[0] - this._formSize[0], i + this.options.buttonSize[1] + this.options.offset[1], 0),
                submit: n.translate(t - 3 * this.options.offset[0] - this.options.buttonSize[0] - this._formSize[0] - this._submitSize[0], i + this.options.buttonSize[1] + this.options.offset[1], 0),
                error: n.translate(t, i - 2 * this.options.offset[1] - this.options.errorSize[1] - this.options.buttonSize[1], 0)
            }
        }, s.prototype.initLogo = function () {
            this.logo = new r({
                properties: {
                    backgroundColor: "rgba( 0, 0, 0, 0.0)"
                },
                content: '<img draggable="false" class="no-user-select" src="js/core/famous.svg" height="' + this.options.buttonSize[1] + '"></img>',
                size: this.options.buttonSize
            }), this.logoModifier = new a({
                size: this.options.butonSize,
                transform: this.hiddenPositions.logo,
                opacity: this.logoOpacity
            }), this.node.add(this.logoModifier).link(this.logo)
        }, s.prototype.initForm = function () {
            this.form = new r({
                properties: {
                    backgroundColor: "rgba( 0, 0, 0, 0.0)"
                },
                content: '<input class="textinput"; id="' + this._signupID + '"; type="text" value="' + m + '">',
                size: this._formSize
            }), this.formModifier = new a({
                size: this._formSize,
                transform: this.hiddenPositions.form,
                opacity: this.buttonOpacity
            }), this.submit = new d(this._submitSize), this.submitModifier = new a({
                size: this._submitSize,
                transform: this.hiddenPositions.submit,
                opacity: 1
            }), this.node.add(this.formModifier).link(this.form), this.node.add(this.submitModifier).link(this.submit)
        }, s.prototype.initError = function () {
            this.errorSuccessProperties = {
                color: "#43c529",
                border: "1px soild white"
            }, this.errorFailedProperties = {
                color: "#dd2036",
                border: "1px soild red"
            }, this.error = new r({
                size: this.options.errorSize,
                classes: ["core-error"],
                content: ""
            }), this.errorModifier = new a({
                transform: this.shownPositions.error
            }), this.node.add(this.errorModifier).link(this.error)
        }, s.prototype.events = function () {
            this.submit.on("touchdown", this._submitForm.bind(this)), this.submit.on("mousedown", this._submitForm.bind(this))
        }, s.prototype.resize = function () {
            this.positions(), this.showFormElements(), this.showLogo(), this.hideError()
        }, s.prototype.mousemove = function (t, i) {
            var e = p.distance(t.pageX, t.pageY, this.logoX, this.logoY);
            i > e ? 1 != this.logoOpacity && (this.logoOpacity = 1, this.logoModifier.halt(), this.logoModifier.setOpacity(this.logoOpacity, this.options.hoverTransition)) : .5 != this.logoOpacity && (this.logoOpacity = .5, this.logoModifier.halt(), this.logoModifier.setOpacity(this.logoOpacity, this.options.hoverTransition))
        }, s.prototype._submitForm = function () {
            this.submit.setLoading();
            var t = this.textinput.value;
            this._ajaxSignup(t)
        }, s.prototype.formEvents = function () {
            var t = document.getElementById(this._signupID);
            return null !== t ? (t.onclick = function () {
                t.value === m && (t.value = "")
            }, t.onfocus = function () {
                t.value === m && (t.value = "")
            }, t.onblur = function () {
                "" === t.value && (t.value = m)
            }, t.onkeydown = function (t) {
                t.stopPropagation(), t.keyCode == c.ENTER && this._submitForm()
            }.bind(this), t.onkeyup = p.debounce(this.textInputCheck.bind(this), 333), this.textinput = t, !0) : !1
        }, s.prototype.textInputCheck = function () {
            if (this.textinput) {
                var t = this.textinput.value; - 1 !== t.indexOf("@") && -1 !== t.indexOf(".") ? (this.submitModifier.halt(), this.submitModifier.setTransform(this.shownPositions.submit, this.options.uiFadeTransition), this.submitModifier.setOpacity(1, this.options.uiFadeTransition)) : (this.submitModifier.halt(), this.submitModifier.setTransform(this.hiddenPositions.submit, this.options.uiFadeTransition), this.submitModifier.setOpacity(0, this.options.uiFadeTransition))
            }
        }, s.prototype.hideAll = function () {
            this.hideFormElements(), this.hideLogo()
        }, s.prototype.showAll = function () {
            this.showLogo(), this.showFormElements()
        }, s.prototype.hideFormElements = function () {
            this.formModifier.halt(), this.formModifier.setTransform(this.hiddenPositions.form, this.options.uiFadeTransition), this.formModifier.setOpacity(0, this.options.uiFadeTransition), this.submitModifier.halt(), this.submitModifier.setTransform(this.hiddenPositions.submit, this.options.uiFadeTransition), this.submitModifier.setOpacity(0, this.options.uiFadeTransition)
        }, s.prototype.showFormElements = function () {
            this._formSuccess || (this.formModifier.halt(), this.formModifier.setTransform(this.shownPositions.form, this.options.uiFadeTransition), this.formModifier.setOpacity(this.logoOpacity, this.options.uiFadeTransition), this.textInputCheck())
        }, s.prototype.showLogo = function () {
            var t = this.shownPositions.logo;
            this.logoX = t[12] + .5 * this.options.buttonSize[0], this.logoY = t[13] + .5 * this.options.buttonSize[1], this.logoModifier.halt(), this.logoModifier.setTransform(t, this.options.uiFadeTransition)
        }, s.prototype.hideLogo = function () {
            var t = this.hiddenPositions.logo;
            this.logoX = t[12] + .5 * this.options.buttonSize[0], this.logoY = t[13] + .5 * this.options.buttonSize[1], this.logoModifier.halt(), this.logoModifier.setTransform(t, this.options.uiFadeTransition)
        }, s.prototype._ajaxSignup = function (t) {
            var i = "http://fsrv.us/?f=registerUserforNewsletter&email=" + t + "&demoID=" + l;
            h.loadURL(i, function (t) {
                this.signupResponse = JSON.parse(t), this.parseResponse()
            }.bind(this))
        }, s.prototype.parseResponse = function () {
            null == this.signupResponse.error ? this.responseSuccess() : (this.error.setProperties(this.errorFailedProperties), this.updateSignupError(), this.submit.setDefault()), this.showError()
        }, s.prototype.responseSuccess = function () {
            this._formSuccess = !0, this.error.setProperties(this.errorSuccessProperties), this.submit.setSuccess(), this.error.setContent("SUCCESS!"), this.hideFormElements()
        }, s.prototype.updateSignupError = function () {
            this.error.setContent('<h5 style="position: absolute; bottom: 0">' + this.signupResponse.error + "</h5>")
        }, s.prototype.showError = function () {
            this.errorModifier.halt(), this.errorModifier.setTransform(this.shownPositions.error, this.options.errorInTransition), this.errorModifier.setOpacity(1, this.options.errorInTransition), f.setTimeout(this.hideError.bind(this), 4e3)
        }, s.prototype.hideError = function () {
            this.errorModifier.halt(), this.errorModifier.setTransform(this.hiddenPositions.error, this.options.errorOutTransition), this.errorModifier.setOpacity(0, this.options.errorOutTransition)
        }, e.exports = s
    }
); 