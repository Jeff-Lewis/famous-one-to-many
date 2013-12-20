define(
	"app/UI", 
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
		"famous-ui/PanelScrollview", 
		"famous-ui/Toggles/BoolToggle", 
		"famous-ui/Toggles/MultiBoolToggle", 
		"famous-ui/Easing/MultiEasingToggle", 
		"famous-ui/Dropdown/Dropdown", 
		"famous-ui/Slider", 
		"famous-ui/ColorPicker/ColorPicker", 
		"famous-ui/Text/Label", 
		"famous-animation/Easing", 
		"famous-utils/Time", 
		"famous-color/Color", 
		"famous-utils/Utils", 
		"famous-utils/Keycodes", 
		"core/Signup", 
		"core/SignupError"
	], 
	function (t, i, e) 
	{
        function s(t, i, e, s) {
            d.apply(this, arguments), this.obj = i, this.leftPanel = e, this.rightPanel = s, this.widgets = {}, this.settings = {}, this.transforms = [], this.surfaceSize = [50, 50], this.transition = {
                duration: 250,
                curve: w.inOutBackNorm
            }, this.curves = h(), this.addSaveSettingsSurface(), this.initUI(), this.loadStoredSettings(), p.on("resize", T.debounce(this.reflow.bind(this), 250)), p.on("keyup", function (t) {
                t.keyCode == M.S && this.saveSettings()
            }.bind(this))
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
                n = -s / 2 + .5 * window.innerWidth,
                r = function (i, s, o) {
                    var r, h = e * i;
                    "down" == t ? r = f.translate(n + h, window.innerHeight + this.surfaceSize[1]) : "up" == t && (r = f.translate(n + h, window.innerHeight - this.surfaceSize[1]));
                    var u = this.transforms[i],
                        p = this.options.fadeOutDuration * s;
                    0 !== i && (o = void 0), b.setTimeout(a.bind(this, u, r, o), p)
                };
            o.call(this, r, i)
        }

        function a(t, i, e) {
            t.setTransform(i, this.transition, e)
        }

        function h() {
            for (var t = /norm/gi, i = u(w).filter(function (i) {
                    return t.test(i)
                }).sort(), e = [], s = 0; s < i.length; s++) e.push(w[i[s]]);
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
        t("famous/RenderNode"), t("famous-ui/PanelScrollview");
        var m = t("famous-ui/Toggles/BoolToggle");
        t("famous-ui/Toggles/MultiBoolToggle");
        var g = t("famous-ui/Easing/MultiEasingToggle"),
            y = t("famous-ui/Dropdown/Dropdown"),
            v = t("famous-ui/Slider"),
            S = t("famous-ui/ColorPicker/ColorPicker"),
            x = t("famous-ui/Text/Label"),
            w = t("famous-animation/Easing"),
            b = t("famous-utils/Time"),
            z = t("famous-color/Color"),
            T = t("famous-utils/Utils"),
            M = t("famous-utils/Keycodes"),
            P = t("core/Signup"),
            C = t("core/SignupError");
        s.prototype = Object.create(d.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            padding: 10,
            fadeOutDuration: 40,
            easingSize: [20, 20],
            title: "",
            description: ""
        }, s.numSaved = 0, s.prototype.initUI = function () {
            this.options.padding;
            var t = new x({
                content: '<h3 style="padding-bottom: 40px;">' + this.options.title + "</h3>" + '<p style="padding-bottom: 20px;">' + this.options.description + "</p>",
                properties: {
                    borderBottom: "1px solid white"
                }
            });
            this.leftPanel.add(t);
            var t = new x({
                content: "<h3>OUTLINE COLOR</h3>"
            });
            this.leftPanel.add(t);
            var i = new z(36, 183, 159, 1);
            this.obj.setCSSProp({
                border: "1px solid " + i.hex
            });
            var e = new S({
                defaultColor: i
            });
            e.on("change", function (t) {
                this.obj.setCSSProp({
                    border: "1px solid " + t.value.getCSSColor()
                })
            }.bind(this)), this.leftPanel.add(e);
            var t = new x({
                content: "<h3>BACKGROUND COLOR</h3>"
            });
            this.leftPanel.add(t);
            var s = new z(0, 255, 228, .5);
            this.obj.setCSSProp({
                backgroundColor: s.getCSSColor()
            });
            var o = new S({
                defaultColor: s
            });
            o.on("change", function (t) {
                this.obj.setCSSProp({
                    backgroundColor: t.value.getCSSColor()
                })
            }.bind(this)), this.leftPanel.add(o);
            var t = new x({
                content: "<h3>POSITION</h3>"
            });
            this.leftPanel.add(t), this.widgets.gutters = new v({
                range: [0, 50],
                defaultValue: this.obj.options.gutters,
                precision: 0,
                name: "GUTTERS"
            }), this.widgets.gutters.on("change", T.debounce(function (t) {
                this.obj.options.gutters = Math.floor(t.value), this.obj.findTotalWidth(), this.obj.reflow()
            }.bind(this), 50)), this.leftPanel.add(this.widgets.gutters), this.widgets.zDepth = new v({
                range: [0, 100],
                defaultValue: this.obj.options.collapseZDepth,
                precision: 0,
                name: "Z - DEPTH"
            }), this.widgets.zDepth.on("change", T.debounce(function (t) {
                this.obj.setCollapseZDepth(Math.floor(t.value)), this.obj.reflow()
            }.bind(this), 50)), this.leftPanel.add(this.widgets.zDepth);
            var t = new x({
                content: "<h3>ROTATION</h3>"
            });
            this.leftPanel.add(t), this.widgets.rotateX = new v({
                range: [0, Math.PI],
                defaultValue: this.obj.options.rotateX,
                precision: 0,
                name: "ROTATE - X"
            }), this.widgets.rotateX.on("change", T.debounce(function (t) {
                this.obj.options.rotateX = t.value, this.obj.reflow()
            }.bind(this), 50)), this.leftPanel.add(this.widgets.rotateX), this.widgets.rotateY = new v({
                range: [0, Math.PI],
                defaultValue: this.obj.options.rotateY,
                precision: 0,
                name: "ROTATE - Y"
            }), this.widgets.rotateY.on("change", T.debounce(function (t) {
                this.obj.options.rotateY = t.value, this.obj.reflow()
            }.bind(this), 50)), this.leftPanel.add(this.widgets.rotateY), this.widgets.rotateZ = new v({
                range: [0, Math.PI],
                defaultValue: this.obj.options.rotateZ,
                precision: 0,
                name: "ROTATE - Z"
            }), this.widgets.rotateZ.on("change", T.debounce(function (t) {
                this.obj.options.rotateZ = t.value, this.obj.reflow()
            }.bind(this), 50)), this.leftPanel.add(this.widgets.rotateZ), this.widgets.rotateByIndex = new m({
                name: "ROTATE - BY - INDEX",
                value: this.obj.options.rotateByIndex
            }), this.widgets.rotateByIndex.on("change", function (t) {
                this.obj.options.rotateByIndex = t.value, this.obj.reflow()
            }.bind(this)), this.leftPanel.add(this.widgets.rotateByIndex);
            var n = new P;
            this.leftPanel.add(n);
            var r = new C({
                signup: n
            });
            this.node.add(r);
            var t = new x({
                content: "<h3>ANIMATION</h3>"
            });
            this.rightPanel.add(t), this.widgets.animDuration = new v({
                range: [300, 2e3],
                defaultValue: this.obj.transition.duration,
                precision: 0,
                name: "DURATION"
            }), this.widgets.animDuration.on("change", function (t) {
                this.obj.transition.duration = t.value
            }.bind(this)), this.rightPanel.add(this.widgets.animDuration);
            var t = new x({
                content: "<h3>CAMERA</h3>"
            });
            this.rightPanel.add(t), this.widgets.cameraPosition = new y({
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
            }.bind(this)), this.rightPanel.add(this.widgets.cameraPosition);
            var t = new x({
                content: "<h3>EASING</h3>"
            });
            this.rightPanel.add(t), this.widgets.animMultiToggle = new g({
                easingFns: this.curves,
                columns: 3
            }), this.widgets.animMultiToggle.on("change", function (t) {
                this.obj.transition.curve = t.value
            }.bind(this)), this.rightPanel.add(this.widgets.animMultiToggle)
        }, s.prototype.loadStoredSettings = function () {
            var t = localStorage.getItem("famoDiscrete");
            if (t) {
                t = JSON.parse(t), this.settings = t, this.addClearSettingsSurface();
                for (var i in t) s.numSaved++, this.createSettingsSurface();
                b.setTimeout(r.bind(this, "up"), 500)
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
                    transform: f.translate(.5 * window.innerWidth, window.innerHeight + this.surfaceSize[1])
                });
            i.setTransform(f.translate(.5 * window.innerWidth, window.innerHeight - this.surfaceSize[1]), this.transition), this.transforms.push(i), this.node.add(i).link(t), t.on("click", function (t) {
                this.saveSettings(), t.setOpacity(.5), t.setOpacity(1, {
                    curve: w.outBounceNorm,
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
                    textAlign: "center"
                }
            }),
                i = new l({
                    transform: f.translate(.5 * window.innerWidth, window.innerHeight + this.surfaceSize[1])
                });
            this.transforms.push(i), this.node.add(i).link(t), t.on("click", function (t) {
                n.call(this), t.setOpacity(.5), t.setOpacity(1, {
                    curve: w.outBounceNorm,
                    duration: 400
                })
            }.bind(this, i))
        }, s.prototype.createSettingsSurface = function (t) {
            var i = new c({
                size: this.surfaceSize,
                content: s.numSaved - 1 + "",
                properties: {
                    padding: "15px",
                    textAlign: "center"
                },
                classes: ["settings-save", "no-user-select"]
            }),
                e = new l({
                    transform: f.translate(.5 * window.innerWidth, window.innerHeight + this.surfaceSize[1])
                });
            this.transforms.push(e), i.on("click", function (t, i) {
                this.setSettings(i);
                var e = f.getTranslate(t.getFinalTransform());
                t.setTransform(f.translate(e[0], e[1] - 40, 0)), t.setTransform(f.translate(e[0], e[1], 0), {
                    curve: w.outBounceNorm,
                    duration: 400
                })
            }.bind(this, e, this.transforms.length - 3)), this.node.add(e).link(i), t && this.animateAddSurface(i)
        }, s.prototype.animateAddSurface = function () {
            for (var t = this.surfaceSize[0] + this.options.padding, i = this.transforms.length * t, e = -i / 2 + .5 * window.innerWidth, s = this.transforms[this.transforms.length - 1], o = 0; o < this.transforms.length; o++) {
                var n = t * o,
                    r = f.translate(e + n, window.innerHeight - this.surfaceSize[1]);
                this.transforms[o].halt(), 1 == o ? this.transforms[o].setTransform(r, this.transition, function () {
                    s.setTransform(r, this.transition)
                }.bind(this)) : o !== this.transforms.length - 1 ? this.transforms[o].setTransform(r, this.transition) : s.setTransform(f.translate(e + n, window.innerHeight + this.surfaceSize[1]))
            }
        }, s.prototype.reflow = function () {
            for (var t = this.surfaceSize[0] + this.options.padding, i = this.transforms.length * t, e = .5 * -i + .5 * window.innerWidth, s = 0; s < this.transforms.length; s++) {
                var o = this.transforms[s],
                    n = t * s,
                    r = f.translate(e + n, window.innerHeight - this.surfaceSize[1]);
                o.halt(), b.setTimeout(o.setTransform.bind(o, r, this.transition), 50 * s)
            }
        }, e.exports = s
    }
); 