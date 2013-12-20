define(
	"app/scenes/TorqueScene", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous/Matrix", 
		"famous/Modifier", 
		"famous-animation/Easing", 
		"famous-utils/KeyCodes", 
		"famous/Modifier", 
		"famous/Engine", 
		"famous-utils/Utils", 
		"app/widgets/TorqueRenderable", 
		"app/widgets/SplitImages", 
		"famous-feedback/Circle", 
		"app/scenes/CounterView", 
		"famous-scene/Scene", 
		"app/SceneTransitions", 
		"core/Interface"
	], 
	function (t, i, e) 
	{
        function s() {
            document.body.style.backgroundColor = "#222", c.apply(this, arguments), this.split, this.torque, this.ui, this.autoUI, this.labelProperties, this.descriptionProperties, this.lasers, this.initLasers(), this.initButton(), this.initUI(), this.events()
        }

        t("famous/Surface");
        var o = t("famous/Matrix");
        t("famous/Modifier"), t("famous-animation/Easing"), t("famous-utils/KeyCodes"), t("famous/Modifier");
        var n = t("famous/Engine"),
            r = t("famous-utils/Utils"),
            a = t("app/widgets/TorqueRenderable"),
            h = t("app/widgets/SplitImages"),
            u = t("famous-feedback/Circle"),
            p = t("app/scenes/CounterView"),
            c = t("famous-scene/Scene"),
            l = t("app/SceneTransitions"),
            f = t("core/Interface");
        s.prototype = Object.create(c.prototype), s.prototype.constructor = s, s.NAME = "THE PYRAMID", s.IMAGE = "img/splitImage2/base.svg", s.DEFAULT_OPTIONS = {
            torqueSize: [400, 400]
        }, s.prototype.events = function () {
            this.torque.on("forceApplied", p.add.bind(p, 1)), n.on("resize", r.debounce(this.setTorquePos.bind(this), 150)), this.split.pipe(this.lasers)
        }, s.prototype.initLasers = function () {
            this.lasers = new u, this.node.add(this.lasers)
        }, s.prototype.initButton = function () {
            this.split = new h({
                images: ["img/splitImage2/0.svg", "img/splitImage2/1.svg", "img/splitImage2/2.svg", "img/splitImage2/3.svg", "img/splitImage2/4.svg", "img/splitImage2/5.svg", "img/splitImage2/6.svg", "img/splitImage2/7.svg"],
                depth: .1,
                size: this.options.torqueSize
            }), this.torque = new a({
                views: [this.split],
                torqueStrength: .08,
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
                    name: "Torque Period",
                    defaultValue: this.torque.options.torquePeriod
                }
            }, {
                type: "slider",
                object: this.torque.options,
                key: "torqueStrength",
                callback: this.torque.setTorque.bind(this.torque),
                uiOptions: {
                    range: [5e-5, .5],
                    name: "Torque Strength",
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
            }], this.ui = new f, n.pipe(this.ui), this.ui.setCurrentObject(this), this.node.add(this.ui)
        }, s.prototype.activate = function (t) {
            l.sceneFadeInLeft(t)
        }, s.prototype.deactivate = function (t) {
            l.sceneFadeLeft(t)
        }, s.prototype.setTorquePos = function () {
            this.torque.setTransform(o.translate(.5 * window.innerWidth - .5 * this.options.torqueSize[0], .5 * window.innerHeight - .5 * this.options.torqueSize[1]), {
                curve: "inOutBackNorm",
                duration: 500
            })
        }, e.exports = s
    }
); 