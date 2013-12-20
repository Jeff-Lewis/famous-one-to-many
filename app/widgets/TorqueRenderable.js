define(
	"app/widgets/TorqueRenderable", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/View", 
		"famous/Matrix", 
		"famous/Modifier", 
		"famous/RenderNode", 
		"famous-physics/PhysicsEngine", 
		"famous-physics/math/Vector", 
		"famous-physics/math/Vector", 
		"famous-physics/forces/TorqueSpring", 
		"famous-physics/forces/Spring", 
		"famous-physics/forces/Drag", 
		"famous-utils/Utils"
	], 
	function (t, i, e) 
	{
        function s() {
            a.apply(this, arguments), this.eventInput.pipe(this.eventOutput), this.physicsMod = new u({
                origin: [.5, .5]
            }), this.physicsNode = new p, this.modifier = new u({
                size: this.options.size
            }), this.node.link(this.modifier).link(this.physicsMod).link(this.physicsNode), this.PE = new c, this.body = this.PE.createBody({
                shape: this.PE.BODIES.RECTANGLE,
                size: this.options.size
            }), this.torqueSpring = new d({
                anchor: new f(0, 0, 0, 0),
                period: this.options.torquePeriod,
                dampingRatio: this.options.torqueDamping
            }), this.forceSpring = new m({
                anchor: [0, 0, 0],
                period: this.options.forceSpringPeriod,
                dampingRatio: this.options.forceSpringDamping
            }), this.drag = new y({
                strength: this.options.drag
            }), g.isWebkit() ? this.on("mousedown", n.bind(this)) : this.on("mousedown", r.bind(this)), this.on("touchstart", r.bind(this)), this._torque = new l(0, 0, -this.options.torqueStrength), this._force = new l(0, 0, -this.options.forceStrength), this.PE.attach([this.torqueSpring, this.forceSpring]), o.call(this)
        }

        function o() {
            for (var t = 0; t < this.options.views.length; t++) this.add(this.options.views[t])
        }

        function n(t) {
            this.applyTorque(new l(t.offsetX - this.body.size[0] / 2, -(t.offsetY - this.body.size[1] / 2), 0))
        }

        function r(t) {
            this.applyTorque(new l(t.pageX - this.offset[0] - this.body.size[0] / 2, -(t.pageY - this.offset[1] - this.body.size[1] / 2), 0))
        }

        var a = t("famous/View"),
            h = t("famous/Matrix"),
            u = t("famous/Modifier"),
            p = t("famous/RenderNode"),
            c = t("famous-physics/PhysicsEngine"),
            l = t("famous-physics/math/Vector"),
            f = t("famous-physics/math/Vector"),
            d = t("famous-physics/forces/TorqueSpring"),
            m = t("famous-physics/forces/Spring"),
            y = t("famous-physics/forces/Drag"),
            g = t("famous-utils/Utils");
        s.prototype = Object.create(a.prototype), s.prototype.constructor = s, s.DEFAULT_OPTIONS = {
            pos: [0, 0, 0],
            vel: [0, 0, 0],
            torqueStrength: .02,
            torquePeriod: 5,
            torqueDamping: 20,
            forceStrength: .02,
            forceSpringPeriod: 1e3,
            forceSpringDamping: .8,
            zDepth: -300,
            size: [400, 400],
            drag: .01,
            views: []
        }, s.prototype.setTransform = function (t, i, e) {
            this.modifier.setTransform(t, i, e), this.setOffset(h.getTranslate(t))
        }, s.prototype.setOffset = function (t) {
            this.offset = t
        }, s.prototype.setSize = function (t) {
            this.body.setOptions({
                size: t
            }), this.modifier.setSize(t)
        }, s.prototype.applyTorque = function (t) {
            this.body.applyTorque(t.cross(this._torque)), this.body.applyForce(this._force), this.emit("forceApplied")
        }, s.prototype.add = function (t) {
            this.physicsNode.add(t), t.pipe(this)
        }, s.prototype.render = function () {
            this.PE.step();
            var t = this.body.getTransform();
            return this.physicsMod.setTransform(t), this.node.render()
        }, s.prototype.setTorqueSpringOpts = function () {
            this.torqueSpring.setOpts({
                period: this.options.torquePeriod,
                dampingRatio: this.options.torqueDamping
            })
        }, s.prototype.setForceSpringOpts = function () {
            this.forceSpring.setOpts({
                period: this.options.forceSpringPeriod,
                dampingRatio: this.options.forceSpringDamping
            })
        }, s.prototype.setForce = function (t) {
            this.options.forceStrength = t, this._force = new l(0, 0, -this.options.forceStrength)
        }, s.prototype.setTorque = function (t) {
            this.options.torqueStrength = t, this._torque = new l(0, 0, -this.options.torqueStrength)
        }, e.exports = s
    }
); 