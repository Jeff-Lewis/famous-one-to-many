define(
	"app/scenes/XButton", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous/Matrix", 
		"famous/Modifier", 
		"famous/Modifier", 
		"famous/Engine", 
		"famous-animation/Easing", 
		"famous-utils/KeyCodes", 
		"famous-utils/Utils", 
		"app/widgets/TorqueRenderable", 
		"app/widgets/SplitImages", 
		"famous-feedback/Circle", 
		"app/SceneTransitions", 
		"app/scenes/CounterView", 
		"famous-scene/Scene", 
		"core/Interface"
	], 
	function (t, i, e) 
	{
        function s() {
            document.body.style.backgroundColor = "#222", l.apply(this, arguments), this.split, this.torque, this.ui, this.autoUI, this.labelProperties, this.descriptionProperties, this.lasers, this.initLasers(), this.initButton(), this.initUI(), this.events()
        }

        t("famous/Surface");
        var o = t("famous/Matrix");
        t("famous/Modifier"), t("famous/Modifier");
        var n = t("famous/Engine");
        t("famous-animation/Easing"), t("famous-utils/KeyCodes");
        var r = t("famous-utils/Utils"),
            a = t("app/widgets/TorqueRenderable"),
            h = t("app/widgets/SplitImages"),
            u = t("famous-feedback/Circle"),
            p = t("app/SceneTransitions"),
            c = t("app/scenes/CounterView"),
            l = t("famous-scene/Scene"),
            f = t("core/Interface");
        s.prototype = Object.create(l.prototype), s.prototype.constructor = s, s.NAME = "The Big X", s.IMAGE = "img/splitImage/xButton.svg", s.DEFAULT_OPTIONS = {
            torqueSize: [400, 400]
        }, s.prototype.events = function () {
            this.torque.on("forceApplied", c.add.bind(c, 1)), this.split.pipe(this.lasers), n.on("resize", r.debounce(this.setTorquePos.bind(this), 150))
        }, s.prototype.setTorquePos = function () {
            this.torque.setTransform(o.translate(.5 * window.innerWidth - .5 * this.options.torqueSize[0], .5 * window.innerHeight - .5 * this.options.torqueSize[1]), {
                curve: "inOutBackNorm",
                duration: 500
            })
        }, s.prototype.initButton = function () {
            this.split = new h({
                images: ["img/splitImage/0.svg", "img/splitImage/1.svg", "img/splitImage/2.svg"],
                depth: 20,
                size: this.options.torqueSize
            }), this.torque = new a({
                views: [this.split],
                torqueStrength: 0,
                forceStrength: .6
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
            }], this.ui = new f, n.pipe(this.ui), this.ui.setCurrentObject(this), this.node.add(this.ui)
        }, s.prototype.initLasers = function () {
            this.lasers = new u, this.node.add(this.lasers)
        }, s.prototype.activate = function (t) {
            p.sceneFadeInLeft(t)
        }, s.prototype.deactivate = function (t) {
            p.sceneFadeLeft(t)
        }, e.exports = s
    }
); 