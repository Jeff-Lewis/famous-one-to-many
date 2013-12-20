define(
	"core/SignupContent", 
	[
		"require", 
		"exports", 
		"module"
	], 
	function (t, i, e) 
	{
        var s = '<span class = "famous-signup-label">E-Mail</span>',
            o = '<span class = "famous-signup-label">Twitter</span> <span class = "famous-signup-optional">optional</span>',
            n = '<span class = "famous-signup-label">Github</span ><span class  = "famous-signup-optional">optional</span>',
            r = "Email",
            a = "Handle",
            h = "Name",
            u = "Sign Up",
            p = "Sign up for Beta",
            c = "LOADING..",
            l = "SUBMITTED!",
            f = '<span class = "famous-headline-one">This is</span><br><strong class = "famous-headline-two">famo.us</strong>',
            d = "",
            m = "",
            y = !1,
            g = !1;
        e.exports = {
            getEmailLabel: function () {
                return s
            },
            setEmailLabel: function (t) {
                s = t
            },
            getEmailMessage: function () {
                return r
            },
            setEmailMessage: function (t) {
                r = t
            },
            getTwitterMessage: function () {
                return a
            },
            setTwitterMessage: function (t) {
                a = t
            },
            getEmailMessage: function () {
                return r
            },
            setEmailMessage: function (t) {
                r = t
            },
            getGithubMessage: function () {
                return h
            },
            setGithubMessage: function (t) {
                h = t
            },
            getHeadLine: function () {
                return f
            },
            setHeadline: function (t) {
                f = t
            },
            getSubHeadLine: function () {
                return d
            },
            setSubHeadline: function (t) {
                d = t
            },
            getMainText: function () {
                return m
            },
            setMainText: function (t) {
                m = t
            },
            getSignupButton: function () {
                return u
            },
            setSignupButton: function (t) {
                u = t
            },
            getOpenMessage: function () {
                return p
            },
            setOpenMessage: function (t) {
                p = t
            },
            useGithub: function () {
                return y
            },
            setGithub: function (t) {
                y = t
            },
            useTwitter: function () {
                return g
            },
            setTwitter: function (t) {
                g = t
            },
            getLoadingStart: function () {
                return c
            },
            setLoadingStart: function (t) {
                c = t
            },
            getLoadingEnd: function () {
                return l
            },
            setLoadingEnd: function (t) {
                l = t
            },
            getContent: function () {
                var t = '<div class="famous-signup-backing" style="float: left;">';
                return "" !== f && (t += '<h1 class="famous-signup-spacer famous-signup-headline">' + f + "</h1>"), "" !== d && (t += '<h6 class="famous-signup-spacer famous-signup-sub-headline">' + d + "</h6>"), "" !== m && (t += '<h3 class="famous-signup-main-text">' + m + "</h3>"), t += '<form id="famous-signup-form"><div class="famous-signup-spacer" style="width: 100%; float: left;"><label for="email" style="width: 30%;float: left;padding-top: 15px;">' + s + "</label>" + '<input class="famous-signup-input" id="famous-signup-email" type="email" size="50" style="float: left; width: 70%;" name="email" maxlength="75" placeholder="' + r + '">' + "<br>" + "</div>", y && (t += '<div style="width: 100%;float: left;" class="famous-signup-spacer" ><label for="github" style="width: 30%; float: left;padding-top: 15px;">' + n + "</label>" + '<input class="famous-signup-input" id="famous-signup-github" type="text" size="30" style="float: left;width: 70%;"  name="github" maxlength="75" placeholder="' + h + '">' + "<br>" + "</div>"), g && (t += '<div style="width: 100%; float: left;" class="famous-signup-spacer"><label for="twitter" style="width: 30%; float: left;padding-top: 15px;">' + o + "</label>" + '<input class="famous-signup-input" id="famous-signup-twitter" type="text" size="30" style="float: left;width: 70%;" name="twitter" maxlength="75" placeholder="' + a + '">' + "</div>"), t += '<div style="width: 100%; float: left;" ><input class="famous-signup-button" style="float: left; width: 100%;"type="submit" value="' + u + '">' + "</div>" + "</form>" + "</div>"
            }
        }
    }
); 