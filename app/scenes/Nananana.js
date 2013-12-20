define(
	"app/scenes/Nananana", 
	[
        "require",
        "exports",
        "module",
        "famous/Surface",
        "famous/Matrix",
        "famous/Modifier",
        "famous/Modifier",
        "famous/Engine",
        "famous-animation/RegisterEasing",
        "famous-utils/KeyCodes",
        "famous-utils/Utils",
        "app/widgets/TorqueRenderable",
        "app/widgets/SplitImages",
        "app/SceneTransitions",
        "core/Interface",
        "famous-feedback/FontFeedback",
        "famous/Transitionable",
        "famous-physics/utils/PhysicsTransition",
        "famous-audio/SoundPlayer",
        "famous-scene/Scene",
        "app/scenes/CounterView",
        "famous-ui/AutoUI"
    ],
    function (t, i, e) 
    {
        function s() {
            document.body.style.backgroundColor = "#222", m.apply(this, arguments), this.split, this.torque, this.ui, this.autoUI, this.labelProperties, this.descriptionProperties, this.lasers, this.audio, this.initLasers(), this.initAudio(), this.initButton(), this.initUI(), this.events()
        }

        t("famous/Surface");

        var o = t("famous/Matrix");

        t("famous/Modifier"),
        t("famous/Modifier");
        var n = t("famous/Engine");
        t("famous-animation/RegisterEasing");
        t("famous-utils/KeyCodes");
        var r = t("famous-utils/Utils");
        var a = t("app/widgets/TorqueRenderable");
        var h = t("app/widgets/SplitImages");
        var u = t("app/SceneTransitions");
        var p = t("core/Interface");
        var c = t("famous-feedback/FontFeedback");
        var l = t("famous/Transitionable");
        var f = t("famous-physics/utils/PhysicsTransition");

        l.registerMethod("physics", f);

        var d = t("famous-audio/SoundPlayer");
        var m = t("famous-scene/Scene");
        var y = t("app/scenes/CounterView");
        t("famous-ui/AutoUI");
        s.prototype = Object.create(m.prototype),
        s.prototype.constructor = s,
        s.NAME = "Ono-mato-poeia",
        s.IMAGE = "img/splitImage5/batman.svg",
        s.DEFAULT_OPTIONS = {
            torqueSize: [
                400, 400
            ]
        },
        s.prototype.events = function () {
            this.torque.on("forceApplied", y.add.bind(y, 1)), this.torque.on("forceApplied", this.audio.playSound.bind(this.audio, 0, 1)), this.torque.pipe(this.lasers), n.on("resize", r.debounce(this.setTorquePos.bind(this), 150))
        },
        s.prototype.setTorquePos = function () {
            this.torque.setTransform(o.translate(.5 * window.innerWidth - .5 * this.options.torqueSize[0], .5 * window.innerHeight - .5 * this.options.torqueSize[1]), {
                curve: "inOutBackNorm",
                duration: 500
            })
        },
        s.prototype.initLasers = function () {
            this.lasers = new c({
                fontContent: ["h", "j", "k", "l", "q", "s", "z", "0", "5", "u", "C", "D", "G", "J", "L"],
                fontProperties: {
                    textAlign: "center",
                    padding: "15px",
                    borderRadius: "5px",
                    color: "#51c8ee"
                },
                size: [320, 320],
                curve: {
                    curve: "outBackNorm",
                    duration: 2e3
                },
                opacityCurve: {
                    curve: "outSineNorm",
                    duration: 2200
                },
                zDepth: 10
            }), this.node.add(this.lasers)
        },
        s.prototype.initAudio = function () {
            this.audio = new d(["sounds/punch_02.wav"])
        },
        s.prototype.initButton = function () {
            this.split = new h({
                images: ["img/splitImage5/0.svg", "img/splitImage5/1.svg"],
                depth: 20,
                size: this.options.torqueSize
            }), this.torque = new a({
                views: [this.split],
                forceStrength: .5,
                forceSpringDamping: .35,
                forceSpringPeriod: 1100,
                torqueStrength: .2,
                torquePeriod: 12
            }), this.setTorquePos(), this.node.add(this.torque)
        },
        s.prototype.initUI = function () {
            this.labelProperties = {
                borderBottom: "1px solid white",
                color: "rgba( 255, 255, 255, 1 )",
                fontSize: "16px"
            },
            this.descriptionProperties = {
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
            }], this.ui = new p, n.pipe(this.ui), this.ui.setCurrentObject(this), this.node.add(this.ui)
        }, s.prototype.activate = function (t, i) {
            "next" == i ? u.sceneFadeInLeft(t) : u.sceneFadeInRight(t)
        }, s.prototype.deactivate = function (t, i) {
            "next" == i ? u.sceneFadeLeft(t) : u.sceneFadeRight(t)
        }, e.exports = s
    }
); 