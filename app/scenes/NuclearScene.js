define(
	"app/scenes/NuclearScene", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous/Matrix", 
		"famous/Modifier", 
		"famous/Engine", 
		"famous-utils/Utils", 
		"famous-feedback/Circle", 
		"app/widgets/TorqueRenderable", 
		"app/widgets/SplitImages", 
		"app/SceneTransitions", 
		"famous-scene/Scene", 
		"core/Interface", 
		"app/scenes/CounterView", 
		"famous/Transitionable", 
		"famous-physics/utils/PhysicsTransition", 
		"famous-audio/SoundPlayer"
	], 
	function (t, i, e) 
	{
        function s() {
            document.body.style.backgroundColor = "#222", f.apply(this, arguments), this.split, this.torque, this.ui, this.autoUI, this.labelProperties, this.descriptionProperties, this.lasers, this.alarmSurface, this.alarmMod, this._shoudlHighlight, this.initLasers(), this.initButton(), this.initAlarm(), this.initUI(), this.events()
        }

        var o = t("famous/Surface"),
            n = t("famous/Matrix"),
            r = t("famous/Modifier"),
            a = t("famous/Engine"),
            h = t("famous-utils/Utils"),
            u = t("famous-feedback/Circle"),
            p = t("app/widgets/TorqueRenderable"),
            c = t("app/widgets/SplitImages"),
            l = t("app/SceneTransitions"),
            f = t("famous-scene/Scene"),
            d = t("core/Interface"),
            m = t("app/scenes/CounterView"),
            y = t("famous/Transitionable"),
            g = t("famous-physics/utils/PhysicsTransition");
        y.registerMethod("physics", g), t("famous-audio/SoundPlayer"), s.prototype = Object.create(f.prototype), s.prototype.constructor = s, s.NAME = "The Countdown", s.IMAGE = "img/splitImage4/nuclear.svg", s.DEFAULT_OPTIONS = {
            torqueSize: [400, 400],
            alarmDelay: 1e3,
            alarmCurve: {
                curve: "outSineNorm",
                duration: 1e3
            }
        }, s.prototype.events = function () {
            a.on("resize", h.debounce(this.setTorquePos.bind(this), 150)), this.torque.on("forceApplied", m.add.bind(m, 1)), this.split.pipe(this.lasers)
        }, s.prototype.setTorquePos = function () {
            this.torque.setTransform(n.translate(.5 * window.innerWidth - .5 * this.options.torqueSize[0], .5 * window.innerHeight - .5 * this.options.torqueSize[1]), {
                curve: "inOutBackNorm",
                duration: 500
            })
        }, s.prototype.initLasers = function () {
            this.lasers = new u, this.node.add(this.lasers)
        }, s.prototype.initAlarm = function () {
            this.alarmSurface = new o({
                classes: ["alarm-bg"],
                properties: {
                    pointerEvents: "none"
                }
            }), this.alarmMod = new r({
                opacity: 0,
                transform: n.translate(0, 0, -1)
            }), this._shoudlHighlight = !0, this.node.add(this.alarmMod).link(this.alarmSurface);
            var t = function () {
                var t = this._shoudlHighlight ? i : void 0;
                this.alarmMod.setOpacity(1, this.options.alarmCurve, t)
            }.bind(this),
                i = function () {
                    var i = this._shoudlHighlight ? t : void 0;
                    this.alarmMod.setOpacity(0, this.options.alarmCurve, i)
                }.bind(this);
            t()
        }, s.prototype.initButton = function () {
            this.split = new c({
                images: ["img/splitImage4/0.svg", "img/splitImage4/1.svg", "img/splitImage4/2.svg", "img/splitImage4/3.svg", "img/splitImage4/4.svg"],
                depth: 20,
                size: this.options.torqueSize
            }), this.torque = new p({
                views: [this.split],
                forceStrength: .5,
                forceSpringDamping: .35,
                forceSpringPeriod: 1100,
                torqueStrength: .2,
                torquePeriod: 12
            }), this.setTorquePos(), this.node.add(this.torque)
        }, s.prototype.initUI = function () {
            this.labelProperties = {
                borderBottom: "1px solid white",
                color: "rgba( 255, 255, 255, 1 )",
                fontSize: "16px"
            }, this.descriptionProperties = {
                color: "rgba( 200, 200, 200, 1 )",
                fontSize: "14px"
            }, this.autoUI = [{
                type: "label",
                uiOptions: {
                    content: "IMAGE",
                    properties: this.labelProperties
                }
            }, {
                type: "label",
                uiOptions: {
                    content: "This changes the scale of the layers of images.",
                    properties: this.descriptionProperties
                }
            }, {
                type: "slider",
                callback: this.split.setDepth.bind(this.split),
                uiOptions: {
                    range: [0, 100],
                    name: "Depth",
                    defaultValue: this.split.options.depth
                }
            }, {
                type: "label",
                uiOptions: {
                    content: "TORQUE SPRING",
                    properties: this.labelProperties
                }
            }, {
                type: "label",
                uiOptions: {
                    content: "Torque controls the rotation of the button.",
                    properties: this.descriptionProperties
                }
            }, {
                type: "slider",
                object: this.torque.options,
                key: "torquePeriod",
                callback: this.torque.setTorqueSpringOpts.bind(this.torque),
                uiOptions: {
                    range: [.5, 15],
                    name: "Duration",
                    defaultValue: this.torque.options.torquePeriod
                }
            }, {
                type: "slider",
                object: this.torque.options,
                key: "torqueStrength",
                callback: this.torque.setTorque.bind(this.torque),
                uiOptions: {
                    range: [5e-5, .5],
                    name: "Force",
                    defaultValue: this.torque.options.torqueStrength
                }
            }, {
                type: "label",
                uiOptions: {
                    content: "FORCE SPRING",
                    properties: this.labelProperties
                }
            }, {
                type: "label",
                uiOptions: {
                    content: "Force controls the depth of the button when it is clicked.",
                    properties: this.descriptionProperties
                }
            }, {
                type: "slider",
                object: this.torque.options,
                key: "forceStrength",
                callback: this.torque.setForce.bind(this.torque),
                uiOptions: {
                    range: [.05, 5],
                    name: "Force Strength",
                    defaultValue: this.torque.options.forceStrength
                }
            }, {
                type: "slider",
                object: this.torque.options,
                key: "forceSpringDamping",
                callback: this.torque.setForceSpringOpts.bind(this.torque),
                uiOptions: {
                    range: [5e-5, .9],
                    name: "Force Spring Damping",
                    defaultValue: this.torque.options.forceSpringDamping
                }
            }, {
                type: "slider",
                object: this.torque.options,
                key: "forceSpringPeriod",
                callback: this.torque.setForceSpringOpts.bind(this.torque),
                uiOptions: {
                    range: [100, 2e3],
                    name: "Force Spring Period",
                    defaultValue: this.torque.options.forceSpringPeriod
                }
            }], this.ui = new d, a.pipe(this.ui), this.ui.setCurrentObject(this), this.node.add(this.ui)
        }, s.prototype.activate = function (t, i) {
            "next" == i ? l.sceneFadeInLeft(t) : l.sceneFadeInRight(t)
        }, s.prototype.deactivate = function (t, i) {
            "next" == i ? l.sceneFadeLeft(t) : l.sceneFadeRight(t)
        }, e.exports = s
    }
); 