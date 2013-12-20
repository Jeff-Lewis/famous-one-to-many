define(
    "app/scenes/CounterView", 
    [
        "require",
        "exports",
        "module",
        "app/widgets/ColoredCounter",
        "famous/Modifier",
        "famous/Matrix",
        "famous/Engine",
        "famous-utils/Utils",
        "famous-animation/Easing"
    ],
    function (t, i, e) 
    {
        function s() {
            this.mod = new Modifier;
            this.counter = new ColoredCounter({
                localstorageId: "famous-torque-counter"
            });

            Engine.on(
                "resize",
                Utils.debounce(this.placeMod.bind(this), 150)
            );

            this.placeMod();
        }

        var ColoredCounter = t("app/widgets/ColoredCounter");
        var Modifier = t("famous/Modifier");
        var Matrix = t("famous/Matrix");
        var Engine = t("famous/Engine");
        var Utils = t("famous-utils/Utils");
        var Easing = t("famous-animation/Easing");

        s.prototype.setCtx = function (t) {
            t.add(this.mod).link(this.counter)
        },
        s.prototype.add = function (t) {
            return this.counter.add(t)
        },
        s.prototype.placeMod = function () {
            this.mod.setTransform(
                Matrix.translate(20, window.innerHeight - 60), {
                    curve: Easing.inOutBackNorm,
                    duration: 400
                }
            )
        };

        var p = new s;
        e.exports = p;
    }
); 