define(
	"app/scenes/TiledScene", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Surface", 
		"famous/RenderNode", 
		"famous/Matrix", 
		"famous/Modifier", 
		"famous-animation/Easing", 
		"famous-utils/KeyCodes", 
		"famous/Modifier", 
		"famous/Engine", 
		"famous-utils/Utils", 
		"famous-utils/Time", 
		"app/widgets/TorqueRenderable", 
		"app/widgets/SplitImages", 
		"famous-feedback/Lasers", 
		"app/widgets/GridLayout", 
		"famous-scene/Scene", 
		"app/SceneTransitions", 
		"famous-ui/AutoUI"
	], 
	function (t, i, e) 
	{
        function s() {
            document.body.style.backgroundColor = "#eee", p.apply(this, arguments), this.autoUI, this.labelProperties, this.descriptionProperties, this.torqueMod = new n({
                origin: [.5, .5]
            }), this.lasers = new h, this.node.add(this.lasers), this.layout = new u({
                useScrollview: !1,
                columnWidth: this.options.size[0],
                rowHeight: this.options.size[1]
            });
            var t = ~~ (window.innerWidth / (this.options.size[0] - this.layout.options.topMargin)),
                i = ~~ (window.innerHeight / (this.options.size[1] - this.layout.options.bottomMargin));
            this.options.numTiles = t * i, this.tileButtons()
        }

        t("famous/Surface");
        var o = t("famous/RenderNode");
        t("famous/Matrix"), t("famous/Modifier"), t("famous-animation/Easing"), t("famous-utils/KeyCodes");
        var n = t("famous/Modifier");
        t("famous/Engine"), t("famous-utils/Utils"), t("famous-utils/Time");
        var r = t("app/widgets/TorqueRenderable"),
            a = t("app/widgets/SplitImages"),
            h = t("famous-feedback/Lasers"),
            u = t("app/widgets/GridLayout"),
            p = t("famous-scene/Scene"),
            c = t("app/SceneTransitions");
        t("famous-ui/AutoUI"), s.prototype = Object.create(p.prototype), s.prototype.constructor = s, s.NAME = "THE WARHOL", s.DEFAULT_OPTIONS = {
            size: [200, 200],
            torqueSize: [400, 400],
            numTiles: 50
        }, s.prototype.tileButtons = function () {
            function t() {
                var t = new a({
                    images: ["img/splitImage2/0.svg", "img/splitImage2/1.svg", "img/splitImage2/2.svg", "img/splitImage2/3.svg", "img/splitImage2/4.svg", "img/splitImage2/5.svg", "img/splitImage2/6.svg", "img/splitImage2/7.svg"],
                    depth: 5,
                    size: this.options.torqueSize,
                    size: this.options.size
                }),
                    i = new r({
                        views: [t],
                        size: this.options.size
                    }),
                    e = new o;
                e.link(i).link(t), this.nodes.push(e), this.layout.append(e)
            }

            this.nodes = [], this._numNode = 0;
            for (var i = 0; i < this.options.numTiles; i++) t.call(this);
            this.node.add(this.layout)
        }, s.prototype.initUI = function () {
            this.labelProperties = {
                "border-bottom": "1px solid white",
                color: "rgba( 255, 255, 255, 1 )",
                "font-size": "16px"
            }, this.descriptionProperties = {
                color: "rgba( 200, 200, 200, 1 )",
                "font-size": "14px"
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
            }]
        }, s.prototype.activate = function (t) {
            c.sceneFadeInLeft(t)
        }, s.prototype.deactivate = function (t) {
            c.sceneFadeLeft(t)
        }, e.exports = s
    }
); 