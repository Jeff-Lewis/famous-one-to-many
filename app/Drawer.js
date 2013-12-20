define(
	"app/Drawer", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/RenderNode", 
		"famous-kinematics/EnergyHelper", 
		"famous/Matrix", 
		"famous-sync/TouchSync", 
		"famous/Engine", 
		"famous/EventHandler"
	], 
	function (t, i, e) 
	{
        function s(t, i) {
            this.opts = {
                dir: "l",
                openFirmness: .001,
                openDamp: .5,
                closeFirmness: .001,
                closeDamp: .5,
                actionDistance: 100,
                zDepth: 0
            }, this.setOpts(t), this.dir = this.opts.dir, this.size = i, this.closedPos = void 0, this.openPos = void 0, this.calcPositions(), c.on("resize", this.calcPositions.bind(this)), this.closedPos < 0 ? (this.closeCond = o(this.openPos - this.opts.actionDistance), this.openCond = n(-this.opts.actionDistance), this.openVelo = 3, this.closeVelo = -3) : (this.closeCond = n(this.closedPos - this.opts.actionDistance), this.openCond = o(this.openPos + this.opts.actionDistance), this.openVelo = -3, this.closeVelo = 3), this.node = new a, this.state = new h(this.closedPos), this.positionState = "closed", this.agentsReleased = !1, this.agents = [];
            var e = "l" == this.dir || "r" == this.dir ? 0 : 1;
            this.touchSync = new p(function () {
                var t = this.state.getPos();
                return e ? [0, t] : [t, 0]
            }.bind(this)), this.touchSync.on("update", function (t) {
                this.releaseAgents();
                var i = t.p[e];
                this.state.setPos(i), this.state.setVelo(0)
            }.bind(this)), this.touchSync.on("end", function (t) {
                t.p[e];
                var i = t.v[e];
                this.closedPos > 0 ? i > 0 || 0 === i ? this.close() : this.open() : i > 0 ? this.open() : this.close(), this.state.setVelo(i), this.resetAgents()
            }.bind(this)), this.eventHandler = new l, l.setInputHandler(this, this.eventHandler), l.setOutputHandler(this, this.eventHandler), this.pipe(this.touchSync)
        }

        function o(t) {
            return function (i) {
                return t > i
            }
        }

        function n(t) {
            return function (i) {
                return i > t
            }
        }

        function r(t, i) {
            var e = !1;
            return function () {
                return !e && t.apply(this, arguments) && (e = !0), e ? i.apply(this, arguments) : 0
            }
        }
        var a = t("famous/RenderNode"),
            h = t("famous-kinematics/EnergyHelper"),
            u = t("famous/Matrix"),
            p = t("famous-sync/TouchSync"),
            c = t("famous/Engine"),
            l = t("famous/EventHandler");
        s.prototype.setOpts = function (t) {
            for (var i in t) this.opts[i] = t[i]
        }, s.prototype.calcPositions = function () {
            "l" == this.dir ? (this.closedPos = -this.size, this.openPos = 0) : "r" == this.dir ? (this.closedPos = window.innerWidth, this.openPos = window.innerWidth - this.size) : "b" == this.dir ? (this.closedPos = window.innerHeight, this.openPos = window.innerHeight - this.size) : "t" == this.dir && (this.closedPos = -this.size, this.openPos = 0)
        }, s.prototype.releaseAgents = function () {
            this.agentsReleased || (this.agentsReleased = !0, this.state.setAgents([]))
        }, s.prototype.resetAgents = function () {
            this.agentsReleased = !1, this.state.setAgents(this.agents)
        }, s.prototype.contentFrom = function (t) {
            return this.node = new a(t), this.node
        }, s.prototype.open = function () {
            var t = r(this.openCond, h.spring(this.openPos, this.opts.openFirmness, this.opts.openDamp));
            this.agents = [t], this.resetAgents(), this.state.setVelo(this.openVelo), this.emit("opening"), this.positionState = "opened"
        }, s.prototype.close = function () {
            var t = r(this.closeCond, h.spring(this.closedPos, this.opts.closeFirmness, this.opts.closeDamp));
            this.agents = [t], this.resetAgents(), this.state.setVelo(this.closeVelo), this.emit("closing"), this.positionState = "closed"
        }, s.prototype.emit = function (t, i) {
            this.touchSync.emit(t, i), this.eventHandler.emit(t, i)
        }, s.prototype.render = function () {
            var t, i = this.state.getPos();
            return t = "l" == this.dir || "r" == this.dir ? u.translate(i, 0, this.opts.zDepth) : u.translate(0, i, this.opts.zDepth), {
                transform: t,
                target: this.node.render()
            }
        }, e.exports = s
    }
); 