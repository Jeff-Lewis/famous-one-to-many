define(
	"app/Styles", 
	[
		"require", 
		"exports", 
		"module", 
		"famous/Matrix", 
		"famous/EventHandler", 
		"famous/Surface", 
		"famous/RenderNode"
	], 
	function (t, i, e) 
	{
        function s(t, i) {
            for (var e = 0; e < t.length; e++) {
                var s = t[e];
                o(s, i)
            }
        }

        function o(t, i) {
            n[i] && n[i](t)
        }
        t("famous/Matrix"), t("famous/EventHandler"), t("famous/Surface"), t("famous/RenderNode");
        var n = {
            design: function (t) {
                t.setClasses(["backface-visible", "bor-blue"])
            },
            design2: function (t) {
                t.setClasses(["blue-bg"])
            },
            selected: function (t) {
                t.setClasses(["diagonal-stripes", "backface-visible", "bor-yellow", "yellow-bg"])
            },
            buttons: function (t) {
                console.log("buttons!!"), t.setClasses(["bor-yellow", "text-center", "l-grey-bg", "shadGreyBl", "black"])
            }
        };
        e.exports = {
            getStyle: n,
            applyStyles: s,
            applyStyle: o
        }
    }
); 