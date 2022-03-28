(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function n(s, r, o) {
        function a(i, t) {
            if (!r[i]) {
                if (!s[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (h) return h(i, !0);
                    throw (e = new Error("Cannot find module '" + i + "'")).code = "MODULE_NOT_FOUND", 
                    e;
                }
                e = r[i] = {
                    exports: {}
                }, s[i][0].call(e.exports, (function(t) {
                    return a(s[i][1][t] || t);
                }), e, e.exports, n, s, r, o);
            }
            return r[i].exports;
        }
        for (var h = "function" == typeof require && require, t = 0; t < o.length; t++) a(o[t]);
        return a;
    }({
        1: [ function(t, i, e) {
            "use strict";
            window.SlotMachine = t("./slot-machine");
        }, {
            "./slot-machine": 3
        } ],
        2: [ function(t, i, e) {
            "use strict";
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            i.exports = function(t) {
                setTimeout((function() {
                    return n(t);
                }), 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
            };
        }, {} ],
        3: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            var r = t("./timer"), o = t("./raf"), a = {
                active: 0,
                delay: 200,
                auto: !1,
                spins: 5,
                randomize: null,
                onComplete: null,
                inViewport: !0,
                direction: "up",
                transition: "ease-in-out"
            }, h = "slotMachineNoTransition", u = "slotMachineBlurFast", c = "slotMachineBlurMedium", l = "slotMachineBlurSlow", f = "slotMachineBlurTurtle", d = "slotMachineGradient", v = d;
            n = (n(g, [ {
                key: "changeSettings",
                value: function(i) {
                    var e = this;
                    Object.keys(i).forEach((function(t) {
                        e[t] = i[t];
                    }));
                }
            }, {
                key: "_wrapTiles",
                value: function() {
                    var i = this;
                    this.container = document.createElement("div"), this.container.classList.add("slotMachineContainer"), 
                    this.container.style.transition = "1s ease-in-out", this.element.appendChild(this.container), 
                    this._fakeFirstTile = this.tiles[this.tiles.length - 1].cloneNode(!0), this.container.appendChild(this._fakeFirstTile), 
                    this.tiles.forEach((function(t) {
                        i.container.appendChild(t);
                    })), this._fakeLastTile = this.tiles[0].cloneNode(!0), this.container.appendChild(this._fakeLastTile);
                }
            }, {
                key: "_setBounds",
                value: function() {
                    var t = this.getTileOffset(this.active), i = this.getTileOffset(this.tiles.length), e = this.getTileOffset(this.tiles.length);
                    this._bounds = {
                        up: {
                            key: "up",
                            initial: t,
                            first: 0,
                            last: e,
                            to: this._maxTop,
                            firstToLast: e,
                            lastToFirst: 0
                        },
                        down: {
                            key: "down",
                            initial: t,
                            first: i,
                            last: 0,
                            to: this._minTop,
                            firstToLast: e,
                            lastToFirst: 0
                        }
                    };
                }
            }, {
                key: "_changeTransition",
                value: function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.delay, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.transition;
                    this.container.style.transition = t / 1e3 + "s " + i;
                }
            }, {
                key: "_changeTransform",
                value: function(t) {
                    this.container.style.transform = "matrix(1, 0, 0, 1, 0, " + t + ")";
                }
            }, {
                key: "_isGoingBackward",
                value: function() {
                    return this.nextActive > this.active && 0 === this.active && this.nextActive === this.tiles.length - 1;
                }
            }, {
                key: "_isGoingForward",
                value: function() {
                    return this.nextActive <= this.active && this.active === this.tiles.length - 1 && 0 === this.nextActive;
                }
            }, {
                key: "getTileOffset",
                value: function(t) {
                    for (var i = 0, e = 0; e < t; e++) i += this.tiles[e].offsetHeight;
                    return this._minTop - i;
                }
            }, {
                key: "_resetPosition",
                value: function(t) {
                    this.container.classList.toggle(h), this._changeTransform(isNaN(t) ? this.bounds.initial : t), 
                    this.container.offsetHeight, this.container.classList.toggle(h);
                }
            }, {
                key: "prev",
                value: function() {
                    return this.nextActive = this.prevIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "next",
                value: function() {
                    return this.nextActive = this.nextIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "_getDelayFromSpins",
                value: function(t) {
                    var i = this.delay;
                    switch (this.transition = "linear", t) {
                      case 1:
                        i /= .5, this.transition = "ease-out", this._animationFX = f;
                        break;

                      case 2:
                        i /= .75, this._animationFX = l;
                        break;

                      case 3:
                        i /= 1, this._animationFX = c;
                        break;

                      case 4:
                        i /= 1.25, this._animationFX = c;
                        break;

                      default:
                        i /= 1.5, this._animationFX = u;
                    }
                    return i;
                }
            }, {
                key: "shuffle",
                value: function(i, e) {
                    var t, n = this;
                    return "function" == typeof i && (e = i), this.running = !0, this.visible || !0 !== this.inViewport ? (t = this._getDelayFromSpins(i), 
                    this._changeTransition(t), this._changeTransform(this.bounds.to), o((function() {
                        var t;
                        !n.stopping && n.running && (t = i - 1, n._resetPosition(n.bounds.first), 1 < t ? n.shuffle(t, e) : n.stop(e));
                    }), t)) : this.stop(e), this.nextActive;
                }
            }, {
                key: "stop",
                value: function(t) {
                    var i = this;
                    if (!this.running || this.stopping) return this.nextActive;
                    this.running = !0, this.stopping = !0, Number.isInteger(this.nextActive) || (this.nextActive = this.custom), 
                    this._isGoingBackward() ? this._resetPosition(this.bounds.firstToLast) : this._isGoingForward() && this._resetPosition(this.bounds.lastToFirst), 
                    this.active = this.nextActive;
                    var e = this._getDelayFromSpins(1);
                    return this._changeTransition(e), this._animationFX = v, this._changeTransform(this.getTileOffset(this.active)), 
                    o((function() {
                        i.stopping = !1, i.running = !1, i.nextActive = null, "function" == typeof i.onComplete && i.onComplete(i.active), 
                        "function" == typeof t && t.apply(i, [ i.active ]);
                    }), e), this.active;
                }
            }, {
                key: "run",
                value: function() {
                    var t = this;
                    this.running || (this._timer = new r((function() {
                        t.visible || !0 !== t.inViewport ? t.shuffle(t.spins, (function() {
                            t._timer.reset();
                        })) : o((function() {
                            t._timer.reset();
                        }), 500);
                    }), this.auto));
                }
            }, {
                key: "destroy",
                value: function() {
                    var i = this;
                    this._fakeFirstTile.remove(), this._fakeLastTile.remove(), this.tiles.forEach((function(t) {
                        i.element.appendChild(t);
                    })), this.container.remove();
                }
            }, {
                key: "active",
                get: function() {
                    return this._active;
                },
                set: function(t) {
                    ((t = Number(t)) < 0 || t >= this.tiles.length || isNaN(t)) && (t = 0), this._active = t;
                }
            }, {
                key: "direction",
                get: function() {
                    return this._direction;
                },
                set: function(t) {
                    this.running || (this._direction = "down" === t ? "down" : "up");
                }
            }, {
                key: "bounds",
                get: function() {
                    return this._bounds[this._direction];
                }
            }, {
                key: "transition",
                get: function() {
                    return this._transition;
                },
                set: function(t) {
                    this._transition = t || "ease-in-out";
                }
            }, {
                key: "visibleTile",
                get: function() {
                    var t = this.tiles[0].offsetHeight, i = this.container.style.transform || "";
                    i = parseInt(i.replace(/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/, "$1"), 10);
                    return Math.abs(Math.round(i / t)) - 1;
                }
            }, {
                key: "random",
                get: function() {
                    return Math.floor(Math.random() * this.tiles.length);
                }
            }, {
                key: "custom",
                get: function() {
                    var t;
                    return this.randomize ? (((t = this.randomize(this.active)) < 0 || t >= this.tiles.length) && (t = 0), 
                    t) : this.random;
                }
            }, {
                key: "_prevIndex",
                get: function() {
                    var t = this.active - 1;
                    return t < 0 ? this.tiles.length - 1 : t;
                }
            }, {
                key: "_nextIndex",
                get: function() {
                    var t = this.active + 1;
                    return t < this.tiles.length ? t : 0;
                }
            }, {
                key: "prevIndex",
                get: function() {
                    return "up" === this.direction ? this._nextIndex : this._prevIndex;
                }
            }, {
                key: "nextIndex",
                get: function() {
                    return "up" === this.direction ? this._prevIndex : this._nextIndex;
                }
            }, {
                key: "visible",
                get: function() {
                    var t = this.element.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, e = window.innerWidth || document.documentElement.clientWidth;
                    i = t.top <= i && 0 <= t.top + t.height, t = t.left <= e && 0 <= t.left + t.width;
                    return i && t;
                }
            }, {
                key: "_animationFX",
                set: function(i) {
                    var t = this, e = this.delay / 4;
                    o((function() {
                        [].concat(function(t) {
                            if (Array.isArray(t)) {
                                for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
                                return e;
                            }
                            return Array.from(t);
                        }(t.tiles), [ t._fakeLastTile, t._fakeFirstTile ]).forEach((function(t) {
                            t.classList.remove(u, c, l, f), i !== v && t.classList.add(i);
                        })), i === v ? t.container.classList.remove(d) : t.container.classList.add(d);
                    }), e);
                }
            } ]), g);
            function g(t, i) {
                !function(t) {
                    if (!(t instanceof g)) throw new TypeError("Cannot call a class as a function");
                }(this), this.element = t, this.tiles = [].slice.call(this.element.children), this.running = !1, 
                this.stopping = !1, this.element.style.overflow = "hidden", this._wrapTiles(), this._minTop = -this._fakeFirstTile.offsetHeight, 
                this._maxTop = -this.tiles.reduce((function(t, i) {
                    return t + i.offsetHeight;
                }), 0), this.changeSettings(Object.assign({}, a, i)), this._setBounds(), this._resetPosition(), 
                !1 !== this.auto && this.run();
            }
            i.exports = n;
        }, {
            "./raf": 2,
            "./timer": 4
        } ],
        4: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            function r(t, i) {
                return function(t) {
                    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
                }(this), this.cb = t, this.initialDelay = i, this.delay = i, this.startTime = null, 
                this.timer = null, this.running = !1, this.resume(), this;
            }
            i.exports = (n(r, [ {
                key: "_start",
                value: function() {
                    var t = this;
                    this.timer = setTimeout((function() {
                        t.running = !1, t.cb(t);
                    }), this.delay);
                }
            }, {
                key: "cancel",
                value: function() {
                    this.running = !1, clearTimeout(this.timer);
                }
            }, {
                key: "pause",
                value: function() {
                    this.running && (this.delay -= (new Date).getTime() - this.startTime, this.cancel());
                }
            }, {
                key: "resume",
                value: function() {
                    this.running || (this.running = !0, this.startTime = (new Date).getTime(), this._start());
                }
            }, {
                key: "reset",
                value: function() {
                    this.cancel(), this.delay = this.initialDelay, this._start();
                }
            }, {
                key: "add",
                value: function(t) {
                    this.pause(), this.delay += t, this.resume();
                }
            } ]), r);
        }, {} ]
    }, {}, [ 1 ]);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", appHeight);
    appHeight();
    if (document.querySelector(".game")) {
        document.querySelector("html").classList.add("_game");
        document.querySelector("body").classList.add("_game");
    }
    const dots = document.querySelector(".preloader__dots");
    const preloader = document.querySelector(".preloader");
    const preloader_txt_hide = document.querySelectorAll(".acces-preloader__text-hide");
    const button_preloader = document.querySelector(".acces-preloader__button");
    const button_preloader_back = document.querySelector(".acces-preloader__button_back");
    const wrapper = document.querySelector(".wrapper");
    const pause_button = document.querySelector(".header-wrapper__pause");
    const game = document.querySelector(".game");
    const pause_item = document.querySelector(".pause");
    let monets = document.querySelector(".header-wrapper__count_points");
    let diamonds = document.querySelector(".header-wrapper__count_time");
    let bomb_count = document.querySelector(".weapons__count_bomb");
    let ball_count = document.querySelector(".weapons__count_ball");
    let rocket_count = document.querySelector(".weapons__count_rocket");
    if (sessionStorage.getItem("monets")) monets.textContent = sessionStorage.getItem("monets");
    if (sessionStorage.getItem("coins")) diamonds.textContent = sessionStorage.getItem("coins");
    if (sessionStorage.getItem("rocket") > 0) if (document.querySelector(".weapons__rocket")) {
        document.querySelector(".weapons__rocket").classList.remove("_no-active");
        rocket_count.textContent = sessionStorage.getItem("rocket");
    }
    if (sessionStorage.getItem("bomb") > 0) if (document.querySelector(".weapons__bomb")) {
        document.querySelector(".weapons__bomb").classList.remove("_no-active");
        bomb_count.textContent = sessionStorage.getItem("bomb");
    }
    if (sessionStorage.getItem("ball") > 0) if (document.querySelector(".weapons__ball")) {
        document.querySelector(".weapons__ball").classList.remove("_no-active");
        ball_count.textContent = sessionStorage.getItem("ball");
    }
    if (game) pause_button.classList.add("_visible");
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".acces-preloader__button")) {
            preloader.classList.add("_hide");
            sessionStorage.setItem("preloader", true);
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".preloader__dots-target")) {
            dots.classList.add("_hide");
            preloader_txt_hide.forEach((el => {
                el.classList.add("_visible");
            }));
            button_preloader.classList.add("_hide");
            button_preloader_back.classList.add("_visible");
        }
        if (targetElement.closest(".acces-preloader__button_back")) {
            dots.classList.remove("_hide");
            preloader_txt_hide.forEach((el => {
                el.classList.remove("_visible");
            }));
            button_preloader.classList.remove("_hide");
            button_preloader_back.classList.remove("_visible");
        }
        if (targetElement.closest(".bonus__button")) {
            document.querySelector(".bonus__image").classList.add("_anim");
            document.querySelector(".bonus__button").classList.add("_hide");
            setTimeout((() => {
                create_elem();
            }), 1e3);
        }
        if (targetElement.closest(".shop__item_ball")) if (+monets.innerHTML >= 9e4) {
            document.querySelector(".shop__icon_ball").classList.add("_anim");
            document.querySelector(".shop__item_ball").classList.add("_hide");
            setTimeout((() => {
                document.querySelector(".shop__icon_ball").classList.remove("_anim");
                document.querySelector(".shop__item_ball").classList.remove("_hide");
            }), 1500);
            setTimeout((() => {
                monets.innerHTML = +monets.innerHTML - 9e4;
                sessionStorage.setItem("monets", monets.innerHTML);
                monets.classList.add("_buy");
                setTimeout((() => {
                    monets.classList.remove("_buy");
                }), 500);
            }), 200);
            if (sessionStorage.getItem("ball")) {
                let ball = +sessionStorage.getItem("ball");
                sessionStorage.setItem("ball", ball + 1);
            } else sessionStorage.setItem("ball", 1);
        } else {
            monets.classList.add("_no-money");
            setTimeout((() => {
                monets.classList.remove("_no-money");
            }), 1e3);
        }
        if (targetElement.closest(".shop__item_bomb")) if (+diamonds.innerHTML >= 50) {
            document.querySelector(".shop__icon_bomb").classList.add("_anim");
            document.querySelector(".shop__item_bomb").classList.add("_hide");
            setTimeout((() => {
                document.querySelector(".shop__icon_bomb").classList.remove("_anim");
                document.querySelector(".shop__item_bomb").classList.remove("_hide");
            }), 1500);
            setTimeout((() => {
                diamonds.innerHTML = +diamonds.innerHTML - 50;
                sessionStorage.setItem("coins", diamonds.innerHTML);
                diamonds.classList.add("_buy");
                setTimeout((() => {
                    diamonds.classList.remove("_buy");
                }), 500);
            }), 200);
            if (sessionStorage.getItem("bomb")) {
                let bomb = +sessionStorage.getItem("bomb");
                sessionStorage.setItem("bomb", bomb + 1);
            } else sessionStorage.setItem("bomb", 1);
        } else {
            diamonds.classList.add("_no-money");
            setTimeout((() => {
                diamonds.classList.remove("_no-money");
            }), 1e3);
        }
        if (targetElement.closest(".shop__item_rocket")) if (+monets.innerHTML >= 200) {
            document.querySelector(".shop__icon_rocket").classList.add("_anim");
            document.querySelector(".shop__item_rocket").classList.add("_hide");
            setTimeout((() => {
                document.querySelector(".shop__icon_rocket").classList.remove("_anim");
                document.querySelector(".shop__item_rocket").classList.remove("_hide");
            }), 1500);
            setTimeout((() => {
                monets.innerHTML = +monets.innerHTML - 200;
                sessionStorage.setItem("monets", monets.innerHTML);
                monets.classList.add("_buy");
                setTimeout((() => {
                    monets.classList.remove("_buy");
                }), 500);
            }), 200);
            if (sessionStorage.getItem("rocket")) {
                let rocket = +sessionStorage.getItem("rocket");
                sessionStorage.setItem("rocket", rocket + 1);
            } else sessionStorage.setItem("rocket", 1);
        } else {
            monets.classList.add("_no-money");
            setTimeout((() => {
                monets.classList.remove("_no-money");
            }), 1e3);
        }
        if (targetElement.closest(".header-wrapper__pause")) if (pause_button.classList.contains("_active")) {
            pause_button.classList.remove("_active");
            game.classList.remove("_hide");
            pause_item.classList.remove("_active");
            timerId = setInterval((() => {
                moveBall();
            }), 30);
        } else {
            pause_button.classList.add("_active");
            game.classList.add("_hide");
            pause_item.classList.add("_active");
            clearInterval(timerId);
        }
        if (targetElement.closest(".pause__item_continue")) {
            pause_button.classList.remove("_active");
            game.classList.remove("_hide");
            pause_item.classList.remove("_active");
            timerId = setInterval((() => {
                moveBall();
            }), 30);
        }
        if (targetElement.closest(".button_start")) if (sessionStorage.getItem("game-one") || sessionStorage.getItem("game-two") || sessionStorage.getItem("game-three")) location.href = "levels.html"; else location.href = "game.html";
        if (targetElement.closest(".game__ball")) {
            timerId = setInterval((() => {
                moveBall();
            }), 30);
            document.querySelector(".game__ball").classList.add("_anim");
        }
        if (targetElement.closest(".weapons__rocket")) if (sessionStorage.getItem("rocket") > 0) {
            document.querySelector(".weapons__rocket").classList.add("_no-active");
            move_rocket();
            setTimeout((() => {
                get_active_blocks();
            }), 1500);
        }
        if (targetElement.closest(".weapons__bomb")) {
            document.querySelector(".weapons__bomb").classList.add("_no-active");
            move_bomb();
            setTimeout((() => {
                get_active_blocks();
            }), 1500);
        }
        if (targetElement.closest(".weapons__ball")) {
            document.querySelector(".weapons__ball").classList.add("_no-active");
            move_ball_two();
            setTimeout((() => {
                get_active_blocks();
            }), 1500);
        }
    }));
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
    const window_width = document.documentElement.clientWidth;
    document.documentElement.clientHeight;
    let platform_cord_x = null;
    let platform_cord_y = null;
    const blockWidth = 47;
    const blockHeight = 52;
    const game_body = document.querySelector(".game__body");
    const game_ball = document.querySelector(".game__ball");
    const game_platform = document.querySelector(".game__platform");
    let platformStart = [ 16, 5 ];
    let currentPosition = platformStart;
    const platform_speed = 25;
    const platform_width = 270;
    let ballStart = [ 42, 10 ];
    let ballCurrentPosition = ballStart;
    const ball_diametr = 70;
    let xDirection = 1.2;
    let yDirection = 1.2;
    let timerId;
    function handleTouchStart(e) {
        let targetElement = e.target;
        if (targetElement.closest(".game__platform")) {
            let firstTouch = e.touches[0];
            platform_cord_x = firstTouch.clientX;
            platform_cord_y = firstTouch.clientY;
        }
    }
    function handleTouchMove(e) {
        if (!platform_cord_x || !platform_cord_y) return false;
        let platform_cord_x2 = e.touches[0].clientX;
        let xDiff = platform_cord_x2 - platform_cord_x;
        const element = document.querySelector(".game__platform");
        const style = window.getComputedStyle(element);
        let coord_left = parseInt(style.left, 10);
        if (xDiff > 0) {
            if (currentPosition[0] < window_width - platform_width) {
                currentPosition[0] += platform_speed;
                move_platform();
            }
        } else if (coord_left > 0) {
            currentPosition[0] -= platform_speed;
            move_platform();
        }
    }
    function move_platform() {
        document.querySelector(".game__platform").style.left = `${currentPosition[0]}px`;
    }
    let rocket_air_distance = 0;
    function move_rocket() {
        let game_element = document.querySelectorAll(".game__element");
        let rocket = document.createElement("div");
        rocket.classList.add("game__rocket");
        rocket.classList.add("_active");
        let image_rocket = document.createElement("img");
        image_rocket.setAttribute("src", "img/icons/rocket.svg");
        image_rocket.setAttribute("alt", "Image");
        rocket.append(image_rocket);
        game_platform.append(rocket);
        let timer_rocket = setInterval((() => {
            rocket_air_distance += -10;
            rocket.style.top = `${rocket_air_distance}px`;
            if (rocket_air_distance < -1200) {
                clearInterval(timer_rocket);
                rocket.style.top = `0%`;
                rocket_air_distance = 0;
                rocket.remove();
            }
            for (let i = 0; i < game_element.length; i++) {
                let rocket_left = rocket.getBoundingClientRect().left;
                let rocket_right = rocket.getBoundingClientRect().left + 10;
                let rocket_top = rocket.getBoundingClientRect().top;
                let rocket_bottom = rocket.getBoundingClientRect().top + 10;
                let element_left = game_element[i].getBoundingClientRect().left;
                let element_right = game_element[i].getBoundingClientRect().left + blockWidth;
                let element_top = game_element[i].getBoundingClientRect().top;
                let element_bottom = game_element[i].getBoundingClientRect().top + blockHeight;
                if (rocket_right > element_left && rocket_top < element_bottom && rocket_left < element_right && rocket_bottom > element_top) {
                    game_element[i].classList.add("_hide");
                    game_element[i].dataset.destroy = 1;
                }
            }
        }), 10);
        let rockets_memory = +sessionStorage.getItem("rocket");
        rockets_memory--;
        sessionStorage.setItem("rocket", rockets_memory);
        rocket_count.textContent = sessionStorage.getItem("rocket");
        setTimeout((() => {
            if (sessionStorage.getItem("rocket") > 0) document.querySelector(".weapons__rocket").classList.remove("_no-active");
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function move_bomb() {
        let game_element = document.querySelectorAll(".game__element");
        let bomb = document.createElement("div");
        bomb.classList.add("game__bomb");
        bomb.classList.add("_active");
        let image_bomb = document.createElement("img");
        image_bomb.setAttribute("src", "img/icons/bomb.svg");
        image_bomb.setAttribute("alt", "Image");
        bomb.append(image_bomb);
        let left_bomb = get_random(5, 80);
        let top_bomb = get_random(5, 50);
        bomb.style.left = `${left_bomb}%`;
        bomb.style.top = `${top_bomb}%`;
        game_body.append(bomb);
        for (let i = 0; i < game_element.length; i++) {
            let bomb_left = bomb.getBoundingClientRect().left;
            let bomb_right = bomb.getBoundingClientRect().left + 50;
            let bomb_top = bomb.getBoundingClientRect().top;
            let bomb_bottom = bomb.getBoundingClientRect().top + 70;
            let element_left = game_element[i].getBoundingClientRect().left;
            let element_right = game_element[i].getBoundingClientRect().left + blockWidth;
            let element_top = game_element[i].getBoundingClientRect().top;
            let element_bottom = game_element[i].getBoundingClientRect().top + blockHeight;
            if (bomb_right > element_left && bomb_top < element_bottom && bomb_left < element_right && bomb_bottom > element_top) {
                game_element[i].classList.add("_hide");
                game_element[i].dataset.destroy = 1;
            }
        }
        let bomb_memory = +sessionStorage.getItem("bomb");
        bomb_memory--;
        sessionStorage.setItem("bomb", bomb_memory);
        bomb_count.textContent = sessionStorage.getItem("bomb");
        setTimeout((() => {
            if (sessionStorage.getItem("bomb") > 0) document.querySelector(".weapons__bomb").classList.remove("_no-active");
            bomb.remove();
        }), 1e3);
    }
    let ball_air_distance = 0;
    function move_ball_two() {
        let game_element = document.querySelectorAll(".game__element");
        let ball = document.createElement("div");
        ball.classList.add("game__ball-two");
        ball.classList.add("_active");
        let image_ball = document.createElement("img");
        image_ball.setAttribute("src", "img/icons/ball-2.svg");
        image_ball.setAttribute("alt", "Image");
        ball.append(image_ball);
        let ball_top = get_random(5, 50);
        ball.style.top = `${ball_top}%`;
        game_body.append(ball);
        let timer_ball = setInterval((() => {
            ball_air_distance += 10;
            ball.style.right = `${ball_air_distance}px`;
            if (ball_air_distance > 500) {
                clearInterval(timer_ball);
                ball.style.right = `0%`;
                ball_air_distance = 0;
                ball.remove();
            }
            for (let i = 0; i < game_element.length; i++) {
                let left = ball.getBoundingClientRect().left;
                let right = ball.getBoundingClientRect().left + 10;
                let top = ball.getBoundingClientRect().top;
                let bottom = ball.getBoundingClientRect().top + 10;
                let element_left = game_element[i].getBoundingClientRect().left;
                let element_right = game_element[i].getBoundingClientRect().left + blockWidth;
                let element_top = game_element[i].getBoundingClientRect().top;
                let element_bottom = game_element[i].getBoundingClientRect().top + blockHeight;
                if (right > element_left && top < element_bottom && left < element_right && bottom > element_top) {
                    game_element[i].classList.add("_hide");
                    game_element[i].dataset.destroy = 1;
                }
            }
        }), 10);
        let ball_memory = +sessionStorage.getItem("ball");
        ball_memory--;
        sessionStorage.setItem("ball", ball_memory);
        ball_count.textContent = sessionStorage.getItem("ball");
        setTimeout((() => {
            if (sessionStorage.getItem("ball") > 0) document.querySelector(".weapons__ball").classList.remove("_no-active");
        }), 1e3);
    }
    function draw_ball() {
        game_ball.style.left = ballCurrentPosition[0] + "%";
        game_ball.style.bottom = ballCurrentPosition[1] + "%";
    }
    function change_direction() {
        let ball_coordinate = document.querySelector(".game__ball");
        let ball_left = ball_coordinate.getBoundingClientRect().left;
        let ball_top = ball_coordinate.getBoundingClientRect().top;
        if (ball_left + ball_diametr + 10 >= window_width) xDirection = -1.2; else if (ball_left <= 0) xDirection = 1.2; else if (ball_top <= 50) yDirection = -1.2;
    }
    if (sessionStorage.getItem("game-two")) document.querySelectorAll(".levels__button").forEach((el => {
        if (el.classList.contains("_hide")) el.classList.remove("_hide");
    }));
    function get_active_blocks() {
        let all_blocks = document.querySelectorAll(".game__element");
        let active_blocks = 0;
        all_blocks.forEach((el => {
            if (0 == el.dataset.destroy) active_blocks++;
        }));
        if (active_blocks <= 0) {
            clearInterval(timerId);
            if (document.querySelector(".game_one")) setTimeout((() => {
                monets.textContent = +monets.innerHTML + 1e3;
                diamonds.textContent = +diamonds.innerHTML + 50;
                sessionStorage.setItem("monets", monets.innerHTML);
                sessionStorage.setItem("coins", diamonds.innerHTML);
                monets.classList.add("_anim");
                diamonds.classList.add("_anim");
                setTimeout((() => {
                    monets.classList.remove("_anim");
                    diamonds.classList.remove("_anim");
                }), 1e3);
            }), 500); else if (document.querySelector(".game_two")) setTimeout((() => {
                monets.textContent = +monets.innerHTML + 5e3;
                diamonds.textContent = +diamonds.innerHTML + 150;
                sessionStorage.setItem("monets", monets.innerHTML);
                sessionStorage.setItem("coins", diamonds.innerHTML);
                monets.classList.add("_anim");
                diamonds.classList.add("_anim");
                setTimeout((() => {
                    monets.classList.remove("_anim");
                    diamonds.classList.remove("_anim");
                }), 1e3);
            }), 500);
            if (document.querySelector(".game_three")) setTimeout((() => {
                monets.textContent = +monets.innerHTML + 1e4;
                diamonds.textContent = +diamonds.innerHTML + 250;
                sessionStorage.setItem("monets", monets.innerHTML);
                sessionStorage.setItem("coins", diamonds.innerHTML);
                monets.classList.add("_anim");
                diamonds.classList.add("_anim");
                setTimeout((() => {
                    monets.classList.remove("_anim");
                    diamonds.classList.remove("_anim");
                }), 1e3);
            }), 500);
            setTimeout((() => {
                document.querySelector(".play").classList.add("_active");
            }), 1e3);
            if (document.querySelector(".game_one")) sessionStorage.setItem("game-one", true); else if (document.querySelector(".game_two")) sessionStorage.setItem("game-two", true); else if (document.querySelector(".game_three")) sessionStorage.setItem("game-three", true);
        }
    }
    function checkForCollisions() {
        let ball_coordinate = document.querySelector(".game__ball");
        let ball_left = ball_coordinate.getBoundingClientRect().left;
        let ball_top = ball_coordinate.getBoundingClientRect().top;
        let platform_coordinate = document.querySelector(".game__platform");
        let platform_left = platform_coordinate.getBoundingClientRect().left;
        let fruit = document.querySelectorAll(".game__element_fruit");
        let flower = document.querySelectorAll(".game__element_flower");
        let lemon = document.querySelectorAll(".game__element_lemon");
        let orange = document.querySelectorAll(".game__element_orange");
        let bag = document.querySelectorAll(".game__element_bag");
        get_active_blocks();
        if (fruit) for (let i = 0; i < fruit.length; i++) {
            let fruit_left = fruit[i].getBoundingClientRect().left;
            let fruit_right = fruit[i].getBoundingClientRect().left + blockWidth;
            let fruit_top = fruit[i].getBoundingClientRect().top;
            let fruit_bottom = fruit[i].getBoundingClientRect().top + blockHeight;
            if (ball_left + ball_diametr > fruit_left && ball_top < fruit_bottom && ball_left < fruit_right && ball_top + ball_diametr > fruit_top) {
                fruit[i].classList.add("_hide");
                fruit[i].dataset.destroy = 1;
                if (1.2 == yDirection && ball_top <= fruit_bottom) yDirection = -1.2; else if (1.2 == yDirection && ball_left <= fruit_right && ball_top + ball_diametr > fruit_top || -1.2 == yDirection && ball_left <= fruit_right && ball_top + ball_diametr) xDirection = 1.2; else if (-1.2 == yDirection && ball_top + ball_diametr + 10 >= fruit_top) yDirection = 1.2; else if (1.2 == yDirection && ball_left + ball_diametr > fruit_left || -1.2 == yDirection && ball_left + ball_diametr > fruit_left) xDirection = -1.2;
            }
        }
        if (flower) for (let i = 0; i < flower.length; i++) {
            let flower_left = flower[i].getBoundingClientRect().left;
            let flower_right = flower[i].getBoundingClientRect().left + blockWidth;
            let flower_top = flower[i].getBoundingClientRect().top;
            let flower_bottom = flower[i].getBoundingClientRect().top + blockHeight;
            if (ball_left + ball_diametr > flower_left && ball_top < flower_bottom && ball_left < flower_right && ball_top + ball_diametr > flower_top) {
                flower[i].classList.add("_hide");
                flower[i].dataset.destroy = 1;
                if (1.2 == yDirection && ball_top <= flower_bottom) yDirection = -1.2; else if (1.2 == yDirection && ball_top <= flower_bottom) yDirection = -1.2; else if (-1.2 == xDirection && 1.2 == yDirection && ball_left <= flower_right) xDirection = 1.2; else if (-1.2 == xDirection && -1.2 == yDirection && ball_left <= flower_right) xDirection = 1.2; else if (-1.2 == yDirection && ball_top + ball_diametr >= flower_top) yDirection = 1.2; else if (1.2 == xDirection && ball_left + ball_diametr > flower_left) xDirection = -1.2;
            }
        }
        if (lemon) for (let i = 0; i < lemon.length; i++) {
            let lemon_left = lemon[i].getBoundingClientRect().left;
            let lemon_right = lemon[i].getBoundingClientRect().left + blockWidth;
            let lemon_top = lemon[i].getBoundingClientRect().top;
            let lemon_bottom = lemon[i].getBoundingClientRect().top + blockHeight;
            if (ball_left + ball_diametr > lemon_left && ball_top < lemon_bottom && ball_left < lemon_right && ball_top + ball_diametr > lemon_top) {
                lemon[i].style.opacity = "0";
                lemon[i].dataset.destroy = 1;
                lemon[i].classList.add("_hide");
                if (1.2 == yDirection && ball_top <= lemon_bottom) yDirection = -1.2; else if (1.2 == yDirection && ball_left <= lemon_right || -1.2 == yDirection && ball_left <= lemon_right) xDirection = 1.2; else if (-1.2 == yDirection && ball_top + ball_diametr + 10 >= lemon_top) yDirection = 1.2; else if (1.2 == yDirection && ball_left + ball_diametr > lemon_left || -1.2 == yDirection && ball_left + ball_diametr > lemon_left) xDirection = -1.2;
            }
        }
        if (orange) for (let i = 0; i < orange.length; i++) {
            let orange_left = orange[i].getBoundingClientRect().left;
            let orange_right = orange[i].getBoundingClientRect().left + blockWidth;
            let orange_top = orange[i].getBoundingClientRect().top;
            let orange_bottom = orange[i].getBoundingClientRect().top + blockHeight;
            if (ball_left + ball_diametr > orange_left && ball_top < orange_bottom && ball_left < orange_right && ball_top + ball_diametr > orange_top) {
                orange[i].style.opacity = "0";
                orange[i].dataset.destroy = 1;
                orange[i].classList.add("_hide");
                if (1.2 == yDirection && ball_top <= orange_bottom) yDirection = -1.2; else if (1.2 == yDirection && ball_left <= orange_right || -1.2 == yDirection && ball_left <= orange_right) xDirection = 1.2; else if (-1.2 == yDirection && ball_top + ball_diametr + 10 >= orange_top) yDirection = 1.2; else if (1.2 == yDirection && ball_left + ball_diametr > orange_left || -1.2 == yDirection && ball_left + ball_diametr > orange_left) xDirection = -1.2;
            }
        }
        if (bag) for (let i = 0; i < bag.length; i++) {
            let bag_left = bag[i].getBoundingClientRect().left;
            let bag_right = bag[i].getBoundingClientRect().left + blockWidth;
            let bag_top = bag[i].getBoundingClientRect().top;
            let bag_bottom = bag[i].getBoundingClientRect().top + blockHeight;
            if (ball_left + ball_diametr > bag_left && ball_top < bag_bottom && ball_left < bag_right && ball_top + ball_diametr > bag_top) {
                bag[i].style.opacity = "0";
                bag[i].dataset.destroy = 1;
                bag[i].classList.add("_hide");
                if (1.2 == yDirection && ball_top <= bag_bottom) yDirection = -1.2; else if (1.2 == yDirection && ball_left <= bag_right || -1.2 == yDirection && ball_left <= bag_right) xDirection = 1.2; else if (-1.2 == yDirection && ball_top + ball_diametr + 10 >= bag_top) yDirection = 1.2; else if (1.2 == yDirection && ball_left + ball_diametr > bag_left || -1.2 == yDirection && ball_left + ball_diametr > bag_left) xDirection = -1.2;
            }
        }
        if (ball_left + ball_diametr + 10 >= window_width || ball_left <= 0 || ball_top <= 50) change_direction();
        if (ballCurrentPosition[1] <= 0) {
            clearInterval(timerId);
            game_ball.classList.add("_hide");
            let lifes = +document.querySelector(".header-wrapper_lifes").innerHTML;
            if (lifes <= 0) {
                setTimeout((() => {
                    document.querySelector(".loose").classList.add("_active");
                }), 600);
                setTimeout((() => {
                    monets.textContent = +monets.innerHTML + 500;
                    sessionStorage.setItem("monets", monets.innerHTML);
                    monets.classList.add("_anim");
                    setTimeout((() => {
                        monets.classList.remove("_anim");
                    }), 1e3);
                }), 500);
            } else {
                lifes--;
                setTimeout((() => {
                    document.querySelector(".header-wrapper_lifes").textContent = lifes;
                    game_ball.style.left = "42%";
                    game_ball.style.bottom = "10%";
                    ballCurrentPosition = [ 42, 10 ];
                    setTimeout((() => {
                        game_ball.classList.remove("_hide");
                    }), 500);
                    setTimeout((() => {
                        timerId = setInterval((() => {
                            moveBall();
                        }), 30);
                    }), 1e3);
                }), 500);
            }
        }
        if (ball_left + ball_diametr >= platform_left + 50 && ball_left + ball_diametr <= platform_left + platform_width && ballCurrentPosition[1] <= 10) yDirection = 1.2;
    }
    function moveBall() {
        ballCurrentPosition[0] += xDirection;
        ballCurrentPosition[1] += yDirection;
        draw_ball();
        checkForCollisions();
    }
    function create_elem() {
        let arrBonuses = get_random_bonus();
        let item_one = document.createElement("div");
        item_one.classList.add("bonus__item");
        let item_two = document.createElement("div");
        item_two.classList.add("bonus__item");
        item_two.classList.add("bonus__item_two");
        let item_three = document.createElement("div");
        item_three.classList.add("bonus__item");
        item_three.classList.add("bonus__item_three");
        let image_one = document.createElement("img");
        let image_two = document.createElement("img");
        let image_three = document.createElement("img");
        let text_one = document.createElement("div");
        let text_two = document.createElement("div");
        let text_three = document.createElement("div");
        if (0 == arrBonuses[0]) {
            add_ball();
            create_item(image_one, "ball-2", item_one, "one");
        } else if (1 == arrBonuses[0]) {
            add_bomb();
            create_item(image_one, "bomb", item_one, "one");
        } else if (2 == arrBonuses[0]) {
            text_one.classList.add("bonus__text");
            let num = get_random_monet();
            text_one.textContent = `+${num}`;
            add_money(num);
            create_item(image_one, "dot", item_one, "one", text_one);
        } else if (3 == arrBonuses[0]) {
            add_rocket();
            create_item(image_one, "rocket", item_one, "one");
        } else if (4 == arrBonuses[0]) {
            text_one.classList.add("bonus__text");
            let num = get_random_coins();
            text_one.textContent = `+${num}`;
            add_coins(num);
            create_item(image_one, "romb", item_one, "one", text_one);
        }
        if (0 == arrBonuses[1]) {
            add_ball();
            create_item(image_two, "ball-2", item_two, "two");
        } else if (1 == arrBonuses[1]) {
            add_bomb();
            create_item(image_two, "bomb", item_two, "two");
        } else if (2 == arrBonuses[1]) {
            text_two.classList.add("bonus__text");
            text_two.classList.add("bonus__text_small");
            let num = get_random_monet();
            text_two.textContent = `+${num}`;
            add_money(num);
            create_item(image_two, "dot", item_two, "two", text_two);
        } else if (3 == arrBonuses[1]) {
            add_rocket();
            create_item(image_two, "rocket", item_two, "two");
        } else if (4 == arrBonuses[1]) {
            text_two.classList.add("bonus__text");
            text_two.classList.add("bonus__text_small");
            let num = get_random_coins();
            text_two.textContent = `+${num}`;
            add_coins(num);
            create_item(image_two, "romb", item_two, "two", text_two);
        }
        if (0 == arrBonuses[2]) {
            add_ball();
            create_item(image_three, "ball-2", item_three, "three");
        } else if (1 == arrBonuses[2]) {
            add_bomb();
            create_item(image_three, "bomb", item_three, "three");
        } else if (2 == arrBonuses[2]) {
            text_three.classList.add("bonus__text");
            text_three.classList.add("bonus__text_small");
            let num = get_random_monet();
            text_three.textContent = `+${num}`;
            add_money(num);
            create_item(image_three, "dot", item_three, "three", text_three);
        } else if (3 == arrBonuses[2]) {
            add_rocket();
            create_item(image_three, "rocket", item_three, "three");
        } else if (4 == arrBonuses[2]) {
            text_three.classList.add("bonus__text");
            text_three.classList.add("bonus__text_small");
            let num = get_random_coins();
            text_three.textContent = `+${num}`;
            add_coins(num);
            create_item(image_three, "romb", item_three, "three", text_three);
        }
    }
    function create_item(image, path, item, block, text = "") {
        image.setAttribute("src", `img/icons/${path}.svg`);
        image.setAttribute("alt", "Image");
        item.append(image, text);
        document.querySelector(`.bonus__prize_${block}`).append(item);
    }
    function add_money(num) {
        setTimeout((() => {
            monets.textContent = +monets.innerHTML + num;
            sessionStorage.setItem("monets", monets.innerHTML);
            monets.classList.add("_anim");
            setTimeout((() => {
                monets.classList.remove("_anim");
            }), 1e3);
        }), 500);
    }
    function add_coins(num) {
        setTimeout((() => {
            diamonds.textContent = +diamonds.innerHTML + num;
            sessionStorage.setItem("coins", diamonds.innerHTML);
            diamonds.classList.add("_anim");
            setTimeout((() => {
                diamonds.classList.remove("_anim");
            }), 1e3);
        }), 500);
    }
    function add_ball() {
        if (sessionStorage.getItem("ball")) {
            let ball = +sessionStorage.getItem("ball");
            sessionStorage.setItem("ball", ball + 1);
        } else sessionStorage.setItem("ball", 1);
    }
    function add_bomb() {
        if (sessionStorage.getItem("bomb")) {
            let bomb = +sessionStorage.getItem("bomb");
            sessionStorage.setItem("bomb", bomb + 1);
        } else sessionStorage.setItem("bomb", 1);
    }
    function add_rocket() {
        if (sessionStorage.getItem("rocket")) {
            let rocket = +sessionStorage.getItem("rocket");
            sessionStorage.setItem("rocket", rocket + 1);
        } else sessionStorage.setItem("rocket", 1);
    }
    let arrRandomNumbers = [];
    function get_random_bonus() {
        let random = Math.floor(Math.random() * (5 - 0) + 0);
        arrRandomNumbers.push(random);
        if (arrRandomNumbers.length < 3) return get_random_bonus();
        return arrRandomNumbers;
    }
    function get_random_monet() {
        let arr = [ 10, 50, 30, 10, 200, 100 ];
        let random = Math.floor(Math.random() * (6 - 0) + 0);
        return arr[random];
    }
    function get_random_coins() {
        let arr = [ 1, 1, 2, 6, 5, 3 ];
        let random = Math.floor(Math.random() * (6 - 0) + 0);
        return arr[random];
    }
    var minTime = 500;
    var maxTime = 2e3;
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    var casino1 = document.querySelector("#slot1");
    var casino2 = document.querySelector("#slot2");
    var casino3 = document.querySelector("#slot3");
    if (casino1 && casino2 && casino3) {
        let a, b, c;
        var mcasino1 = new SlotMachine(casino1, {
            active: 0,
            delay: 100,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    add_money(500);
                    add_coins(50);
                }
            }
        });
        var mcasino2 = new SlotMachine(casino2, {
            active: 2,
            delay: 100,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    add_money(500);
                    add_coins(50);
                }
            }
        });
        var mcasino3 = new SlotMachine(casino3, {
            active: 1,
            delay: 100,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) {
                    add_money(500);
                    add_coins(50);
                }
            }
        });
        function gameSlotTwo() {
            mcasino1.shuffle(9999);
            mcasino2.shuffle(9999);
            mcasino3.shuffle(9999);
            setTimeout((() => mcasino1.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino2.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino3.stop()), getRandomArbitrary(minTime, maxTime));
        }
        var casinoAutoSpin;
        if (document.querySelector(".casino__button-play")) document.querySelector(".casino__button-play").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            if (casino1 && casino2 && casino3) {
                clearInterval(casinoAutoSpin);
                gameSlotTwo();
            }
            document.querySelector(".casino__button-play").classList.add("_hold");
            setTimeout((() => {
                document.querySelector(".casino__button-play").classList.remove("_hold");
            }), 2e3);
        }));
    }
    window["FLS"] = true;
    isWebp();
})();