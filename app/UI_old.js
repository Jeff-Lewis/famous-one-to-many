define(
	"app/UI_old", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Engine", 
		"famous/Surface", 
		"famous/Modifier", 
		"famous/Matrix", 
		"famous/RenderNode", 
		"famous/View", 
		"famous/RenderNode", 
		"famous-animation/Easing", 
		"famous-utils/Time", 
		"famous-color/Color", 
		"famous-utils/Utils"
	], 
	function (t, i, e) 
	{
        function s(t, i, e, s) {
            d.apply(this, arguments), this.obj = i, this.leftPanel = e, this.rightPanel = s, this.widgets = {}, this.settings = {}, this.transforms = [], this.surfaceSize = [50, 50], this.transition = {
                duration: 250,
                curve: m.inOutBackNorm
            }, this.curves = h(), this.addSaveSettingsSurface(), this.initUI(), this.loadStoredSettings(), p.on("resize", v.debounce(this.reflow.bind(this), 400))
        }

        function o(t, i) {
            for (var e = this.transforms.length, s = 0; e--;) t.call(this, e, s, i), s++
        }

        function n() {
            r.call(this, "down", function () {
                this.clearSavedSettings(), this.addSaveSettingsSurface()
            }.bind(this))
        }

        function r(t, i) {
            var e = this.surfaceSize[0] + this.options.padding,
                s = this.transforms.length * e,
                n = -s / 2,
                r = function (i, s, o) {
                    var r, h = e * i;
                    "down" == t ? r = f.translate(n + h, window.innerHeight / 2 + this.surfaceSize[1] / 2) : "up" == t && (r = f.translate(n + h, window.innerHeight / 2 - this.surfaceSize[1] / 2));
                    var u = this.transforms[i],
                        p = this.options.fadeOutDuration * s;
                    0 !== i && (o = void 0), g.setTimeout(a.bind(this, u, r, o), p)
                };
            o.call(this, r, i)
        }

        function a(t, i, e) {
            t.setTransform(i, this.transition, e)
        }

        function h() {
            for (var t = /norm/gi, i = u(m).filter(function (i) {
                    return t.test(i)
                }).sort(), e = [], s = 0; s < i.length; s++) e.push(m[i[s]]);
            return e
        }

        function u(t) {
            var i = [];
            for (key in t) t.hasOwnProperty(key) && i.push(key);
            return i
        }
        var p = t("famous/Engine"),
            c = t("famous/Surface"),
            l = t("famous/Modifier"),
            f = t("famous/Matrix");
        t("famous/RenderNode");
        var d = t("famous/View");
        t("famous/RenderNode");
        var m = t("famous-animation/Easing"),
            g = t("famous-utils/Time"),
            y = t("famous-color/Color"),
            v = t("famous-utils/Utils");
        s.prototype = Object.create(d.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            padding: 10,
            fadeOutDuration: 40,
            easingSize: [20, 20],
            title: "",
            description: ""
        }, s.numSaved = 0, s.prototype.initUI = function () {
            this.options.padding, this.leftPanel.addDescription('<h3 style="padding-bottom: 40px;">' + this.options.title + "</h3>" + "<p>" + this.options.description + "</p>", 100), this.leftPanel.addLabel("OUTLINE COLOR");
            var t = new y(36, 183, 159, 1);
            this.obj.setCSSProp({
                border: "1px solid " + t.hex
            });
            var i = this.leftPanel.addColorPicker(t, "");
            i.on("change", function (t) {
                var i = t.value.clone();
                i.a = this.widgets.outlineOpacity.get().toFixed(2), this.obj.setCSSProp({
                    border: "1px solid " + i.getCSSColor()
                })
            }.bind(this)), this.widgets.outlineOpacity = this.leftPanel.addSlider([0, 1], 1, "OPACITY").on("change", v.debounce(function (t) {
                var e = i.get(),
                    s = e.clone();
                s.a = t.value.toFixed(2), this.obj.setCSSProp({
                    border: "1px solid " + s.getCSSColor()
                })
            }.bind(this), 50)), this.leftPanel.addLabel("BACKGROUND COLOR");
            var e = new y(0, 255, 228, .5);
            this.obj.setCSSProp({
                "background-color": e.getCSSColor()
            });
            var s = this.leftPanel.addColorPicker(e, "");
            s.on("change", function (t) {
                var i = t.value.clone();
                i.a = this.widgets.bgOpacity.get().toFixed(2), this.obj.setCSSProp({
                    "background-color": i.getCSSColor()
                })
            }.bind(this)), this.widgets.bgOpacity = this.leftPanel.addSlider([0, 1], e.a, "OPACITY").on("change", v.debounce(function (t) {
                var i = s.get(),
                    e = i.clone();
                e.a = t.value.toFixed(2), this.obj.setCSSProp({
                    "background-color": e.getCSSColor()
                })
            }.bind(this), 50)), this.leftPanel.addLabel("POSITION"), this.widgets.gutters = this.leftPanel.addSlider([0, 50], this.obj.options.gutters, "GUTTERS", 0).on("change", v.debounce(function (t) {
                this.obj.options.gutters = Math.floor(t.value), this.obj.findTotalWidth(), this.obj.reflow()
            }.bind(this), 50)), this.widgets.zDepth = this.leftPanel.addSlider([0, 100], 0, "Z-DEPTH", 0).on("change", v.debounce(function (t) {
                this.obj.setCollapseZDepth(Math.floor(t.value)), this.obj.reflow()
            }.bind(this), 50)), this.leftPanel.addLabel("ROTATION"), this.widgets.rotateX = this.leftPanel.addSlider([0, Math.PI], 0, "ROTATE-X").on("change", v.debounce(function (t) {
                this.obj.options.rotateX = t.value, this.obj.reflow()
            }.bind(this), 50)), this.widgets.rotateY = this.leftPanel.addSlider([0, Math.PI], 0, "ROTATE-Y").on("change", v.debounce(function (t) {
                this.obj.options.rotateY = t.value, this.obj.reflow()
            }.bind(this), 50)), this.widgets.rotateZ = this.leftPanel.addSlider([0, Math.PI], 0, "ROTATE-Z").on("change", v.debounce(function (t) {
                this.obj.options.rotateZ = t.value, this.obj.reflow()
            }.bind(this), 50)), this.widgets.rotateByIndex = this.leftPanel.addToggle(this.obj.options.rotateByIndex, "ROTATE-BY-INDEX").on("change", function (t) {
                this.obj.options.rotateByIndex = t.value, this.obj.reflow()
            }.bind(this)), this.rightPanel.addLabel("ANIMATION"), this.widgets.animDuration = this.rightPanel.addSlider([10, 2e3], this.obj.transition.duration, "DURATION", 0).on("change", function (t) {
                this.obj.transition.duration = t.value
            }.bind(this)), this.rightPanel.addLabel("CAMERA"), this.widgets.cameraPosition = this.rightPanel.addDropdown({
                items: [{
                    name: "Front View",
                    value: "front"
                }, {
                    name: "Half Right View",
                    value: "halfRight"
                }, {
                    name: "Half Left View",
                    value: "halfLeft"
                }, {
                    name: "Left View",
                    value: "left"
                }, {
                    name: "Right View",
                    value: "right"
                }],
                defaultSelected: 0,
                height: 250,
                selectedProperties: {
                    border: "3px solid #33ccff"
                }
            }), this.widgets.cameraPosition.on("change", function (t) {
                this.obj.setCameraTransform(t.value)
            }.bind(this)), this.rightPanel.addLabel("EASING"), this.widgets.animMultiToggle = this.rightPanel.addEasingToggle(this.curves, 0), this.widgets.animMultiToggle.on("change", function (t) {
                this.obj.transition.curve = t.value
            }.bind(this))
        }, s.prototype.loadStoredSettings = function () {
            var t = localStorage.getItem("famoDiscrete");
            if (t) {
                t = JSON.parse(t), this.settings = t, this.addClearSettingsSurface();
                for (var i in t) s.numSaved++, this.createSettingsSurface();
                g.setTimeout(r.bind(this, "up"), 500)
            }
        }, s.prototype.setSettings = function (t) {
            var i = this.settings["_" + t];
            for (var e in i) this.widgets[e].set(i[e])
        }, s.prototype.clearSavedSettings = function () {
            localStorage.setItem("famoDiscrete", ""), this.nodes = [], this.settings = {}, this.transforms = [], s.numSaved = 0
        }, s.prototype.saveSettings = function () {
            this.saveCurrentSettings(), 1 == this.transforms.length && this.addClearSettingsSurface(), this.createSettingsSurface(!0), localStorage.setItem("famoDiscrete", JSON.stringify(this.settings))
        }, s.prototype.saveCurrentSettings = function () {
            var t = this.settings["_" + s.numSaved++] = {};
            for (var i in this.widgets) t[i] = this.widgets[i].get()
        }, s.prototype.addSaveSettingsSurface = function () {
            var t = new c({
                size: this.surfaceSize,
                content: '<img src="img/save.svg"></img>',
                classes: ["settings-save-button", "no-user-select"],
                properties: {
                    padding: "15px"
                }
            }),
                i = new l({
                    transform: f.translate(0, window.innerHeight / 2 + this.surfaceSize[1])
                });
            i.setTransform(f.translate(0, window.innerHeight / 2 - .5 * this.surfaceSize[1]), this.transition), this.transforms.push(i), this.add(i).link(t), t.on("click", function (t) {
                this.saveSettings(), t.setOpacity(.5), t.setOpacity(1, {
                    curve: m.outBounceNorm,
                    duration: 400
                })
            }.bind(this, i))
        }, s.prototype.addClearSettingsSurface = function () {
            var t = new c({
                size: this.surfaceSize,
                content: " X ",
                classes: ["settings-clear", "no-user-select"],
                properties: {
                    padding: "15px",
                    "text-align": "center"
                }
            }),
                i = new l({
                    transform: f.translate(0, window.innerHeight / 2 + this.surfaceSize[1])
                });
            this.transforms.push(i), this.add(i).link(t), t.on("click", function (t) {
                n.call(this), t.setOpacity(.5), t.setOpacity(1, {
                    curve: m.outBounceNorm,
                    duration: 400
                })
            }.bind(this, i))
        }, s.prototype.createSettingsSurface = function (t) {
            var i = new c({
                size: this.surfaceSize,
                content: s.numSaved - 1 + "",
                properties: {
                    padding: "15px",
                    "text-align": "center"
                },
                classes: ["settings-save", "no-user-select"]
            }),
                e = new l({
                    transform: f.translate(0, window.innerHeight / 2 + .5 * this.surfaceSize[1])
                });
            this.transforms.push(e), i.on("click", function (t, i) {
                this.setSettings(i);
                var e = f.getTranslate(t.getFinalTransform());
                t.setTransform(f.translate(e[0], e[1] - 40, 0)), t.setTransform(f.translate(e[0], e[1], 0), {
                    curve: m.outBounceNorm,
                    duration: 400
                })
            }.bind(this, e, this.transforms.length - 3)), this.add(e).link(i), t && this.animateAddSurface(i)
        }, s.prototype.animateAddSurface = function () {
            for (var t = this.surfaceSize[0] + this.options.padding, i = this.transforms.length * t, e = -i / 2, s = this.transforms[this.transforms.length - 1], o = 0; o < this.transforms.length; o++) {
                var n = t * o,
                    r = f.translate(e + n, .5 * window.innerHeight - this.surfaceSize[1] / 2);
                this.transforms[o].halt(), 1 == o ? this.transforms[o].setTransform(r, this.transition, function () {
                    s.setTransform(r, this.transition)
                }.bind(this)) : o !== this.transforms.length - 1 ? this.transforms[o].setTransform(r, this.transition) : s.setTransform(f.translate(e + n, .5 * window.innerHeight + this.surfaceSize[1]))
            }
        }, s.prototype.reflow = function () {
            for (var t = this.surfaceSize[0] + this.options.padding, i = this.transforms.length * t, e = .5 * -i, s = 0; s < this.transforms.length; s++) {
                var o = this.transforms[s],
                    n = t * s,
                    r = f.translate(e + n, .5 * window.innerHeight - this.surfaceSize[1] / 2);
                o.halt(), g.setTimeout(o.setTransform.bind(o, r, this.transition), 50 * s)
            }
        }, e.exports = s
    }
); 