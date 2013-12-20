define(
	"app/scenes/Stop", 
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
		"app/scenes/CounterView"
	], 
	function (t, i, e) 
	{
        function s() {
            document.body.style.backgroundColor = "#222", c.apply(this, arguments), this.split, this.torque, this.ui, this.autoUI, this.labelProperties, this.descriptionProperties, this.lasers, this.initButton(), this.initUI(), this.initLasers(), this.events()
        }

        t("famous/Surface");
        var o = t("famous/Matrix");
        t("famous/Modifier");
        var n = t("famous/Engine"),
            r = t("famous-utils/Utils"),
            a = t("famous-feedback/Circle"),
            h = t("app/widgets/TorqueRenderable"),
            u = t("app/widgets/SplitImages"),
            p = t("app/SceneTransitions"),
            c = t("famous-scene/Scene"),
            l = t("core/Interface"),
            f = t("app/scenes/CounterView");
        s.prototype = Object.create(c.prototype), s.prototype.constructor = s, s.NAME = "Stop Sign", s.IMAGE = "img/splitImage3/stop.svg", s.DEFAULT_OPTIONS = {
            torqueSize: [400, 400]
        }, s.prototype.events = function () {
            this.torque.on("forceApplied", f.add.bind(f, 1)), n.on("resize", r.debounce(this.setTorquePos.bind(this), 150)), this.split.pipe(this.lasers)
        }, s.prototype.initButton = function () {
            this.split = new u({
                images: ["img/splitImage3/0.svg", "img/splitImage3/1.svg"],
                depth: 20,
                size: this.options.torqueSize
            }), this.torque = new h({
                views: [this.split]
            }), this.setTorquePos(), this.node.add(this.torque)
        }, s.prototype.setTorquePos = function () {
            this.torque.setTransform(o.translate(.5 * window.innerWidth - .5 * this.options.torqueSize[0], .5 * window.innerHeight - .5 * this.options.torqueSize[1]), {
                curve: "inOutBackNorm",
                duration: 500
            })
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
            }], this.ui = new l, n.pipe(this.ui), this.ui.setCurrentObject(this), this.node.add(this.ui)
        }, s.prototype.initLasers = function () {
            this.lasers = new a, this.node.add(this.lasers)
        }, s.prototype.activate = function (t) {
            p.sceneFadeInLeft(t)
        }, s.prototype.deactivate = function (t) {
            p.sceneFadeLeft(t)
        }, e.exports = s
    }
); 