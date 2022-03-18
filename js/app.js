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
            image_one.setAttribute("src", "img/icons/ball-2.svg");
            image_one.setAttribute("alt", "Image");
            item_one.append(image_one);
            document.querySelector(".bonus__prize_one").append(item_one);
            if (sessionStorage.getItem("ball")) {
                let ball = +sessionStorage.getItem("ball");
                sessionStorage.setItem("ball", ball + 1);
            } else sessionStorage.setItem("ball", 1);
        } else if (1 == arrBonuses[0]) {
            image_one.setAttribute("src", "img/icons/bomb.svg");
            image_one.setAttribute("alt", "Image");
            item_one.append(image_one);
            document.querySelector(".bonus__prize_one").append(item_one);
            if (sessionStorage.getItem("bomb")) {
                let bomb = +sessionStorage.getItem("bomb");
                sessionStorage.setItem("bomb", bomb + 1);
            } else sessionStorage.setItem("bomb", 1);
        } else if (2 == arrBonuses[0]) {
            text_one.classList.add("bonus__text");
            let num = get_random_monet();
            text_one.textContent = `+${num}`;
            setTimeout((() => {
                monets.textContent = +monets.innerHTML + num;
                sessionStorage.setItem("monets", monets.innerHTML);
                monets.classList.add("_anim");
                setTimeout((() => {
                    monets.classList.remove("_anim");
                }), 1e3);
            }), 500);
            image_one.setAttribute("src", "img/icons/dot.svg");
            image_one.setAttribute("alt", "Image");
            item_one.append(image_one, text_one);
            document.querySelector(".bonus__prize_one").append(item_one);
        } else if (3 == arrBonuses[0]) {
            image_one.setAttribute("src", "img/icons/rocket.svg");
            image_one.setAttribute("alt", "Image");
            item_one.append(image_one);
            document.querySelector(".bonus__prize_one").append(item_one);
            if (sessionStorage.getItem("rocket")) {
                let rocket = +sessionStorage.getItem("rocket");
                sessionStorage.setItem("rocket", rocket + 1);
            } else sessionStorage.setItem("rocket", 1);
        } else if (4 == arrBonuses[0]) {
            text_one.classList.add("bonus__text");
            let num = get_random_coins();
            text_one.textContent = `+${num}`;
            setTimeout((() => {
                diamonds.textContent = +diamonds.innerHTML + num;
                sessionStorage.setItem("coins", diamonds.innerHTML);
                diamonds.classList.add("_anim");
                setTimeout((() => {
                    diamonds.classList.remove("_anim");
                }), 1e3);
            }), 500);
            image_one.setAttribute("src", "img/icons/romb.svg");
            image_one.setAttribute("alt", "Image");
            item_one.append(image_one, text_one);
            document.querySelector(".bonus__prize_one").append(item_one);
        }
        if (0 == arrBonuses[1]) {
            image_two.setAttribute("src", "img/icons/ball-2.svg");
            image_two.setAttribute("alt", "Image");
            item_two.append(image_two);
            document.querySelector(".bonus__prize_two").append(item_two);
            if (sessionStorage.getItem("ball")) {
                let ball = +sessionStorage.getItem("ball");
                sessionStorage.setItem("ball", ball + 1);
            } else sessionStorage.setItem("ball", 1);
        } else if (1 == arrBonuses[1]) {
            image_two.setAttribute("src", "img/icons/bomb.svg");
            image_two.setAttribute("alt", "Image");
            item_two.append(image_two);
            document.querySelector(".bonus__prize_two").append(item_two);
            if (sessionStorage.getItem("bomb")) {
                let bomb = +sessionStorage.getItem("bomb");
                sessionStorage.setItem("bomb", bomb + 1);
            } else sessionStorage.setItem("bomb", 1);
        } else if (2 == arrBonuses[1]) {
            text_two.classList.add("bonus__text");
            text_two.classList.add("bonus__text_small");
            let num = get_random_monet();
            text_two.textContent = `+${num}`;
            setTimeout((() => {
                monets.textContent = +monets.innerHTML + num;
                sessionStorage.setItem("monets", monets.innerHTML);
                monets.classList.add("_anim");
                setTimeout((() => {
                    monets.classList.remove("_anim");
                }), 1e3);
            }), 500);
            image_two.setAttribute("src", "img/icons/dot.svg");
            image_two.setAttribute("alt", "Image");
            item_two.append(image_two, text_two);
            document.querySelector(".bonus__prize_two").append(item_two);
        } else if (3 == arrBonuses[1]) {
            image_two.setAttribute("src", "img/icons/rocket.svg");
            image_two.setAttribute("alt", "Image");
            item_two.append(image_two);
            document.querySelector(".bonus__prize_two").append(item_two);
            if (sessionStorage.getItem("rocket")) {
                let rocket = +sessionStorage.getItem("rocket");
                sessionStorage.setItem("rocket", rocket + 1);
            } else sessionStorage.setItem("rocket", 1);
        } else if (4 == arrBonuses[1]) {
            text_two.classList.add("bonus__text");
            text_two.classList.add("bonus__text_small");
            let num = get_random_coins();
            text_two.textContent = `+${num}`;
            setTimeout((() => {
                diamonds.textContent = +diamonds.innerHTML + num;
                sessionStorage.setItem("coins", diamonds.innerHTML);
                diamonds.classList.add("_anim");
                setTimeout((() => {
                    diamonds.classList.remove("_anim");
                }), 1e3);
            }), 500);
            image_two.setAttribute("src", "img/icons/romb.svg");
            image_two.setAttribute("alt", "Image");
            item_two.append(image_two, text_two);
            document.querySelector(".bonus__prize_two").append(item_two);
        }
        if (0 == arrBonuses[2]) {
            image_three.setAttribute("src", "img/icons/ball-2.svg");
            image_three.setAttribute("alt", "Image");
            item_three.append(image_three);
            document.querySelector(".bonus__prize_three").append(item_three);
            if (sessionStorage.getItem("ball")) {
                let ball = +sessionStorage.getItem("ball");
                sessionStorage.setItem("ball", ball + 1);
            } else sessionStorage.setItem("ball", 1);
        } else if (1 == arrBonuses[2]) {
            image_three.setAttribute("src", "img/icons/bomb.svg");
            image_three.setAttribute("alt", "Image");
            item_three.append(image_three);
            document.querySelector(".bonus__prize_three").append(item_three);
            if (sessionStorage.getItem("bomb")) {
                let bomb = +sessionStorage.getItem("bomb");
                sessionStorage.setItem("bomb", bomb + 1);
            } else sessionStorage.setItem("bomb", 1);
        } else if (2 == arrBonuses[2]) {
            text_three.classList.add("bonus__text");
            text_three.classList.add("bonus__text_small");
            let num = get_random_monet();
            text_three.textContent = `+${num}`;
            setTimeout((() => {
                monets.textContent = +monets.innerHTML + num;
                sessionStorage.setItem("monets", monets.innerHTML);
                monets.classList.add("_anim");
                setTimeout((() => {
                    monets.classList.remove("_anim");
                }), 1e3);
            }), 500);
            image_three.setAttribute("src", "img/icons/dot.svg");
            image_three.setAttribute("alt", "Image");
            item_three.append(image_three, text_three);
            document.querySelector(".bonus__prize_three").append(item_three);
        } else if (3 == arrBonuses[2]) {
            image_three.setAttribute("src", "img/icons/rocket.svg");
            image_three.setAttribute("alt", "Image");
            item_three.append(image_three);
            document.querySelector(".bonus__prize_three").append(item_three);
            if (sessionStorage.getItem("rocket")) {
                let rocket = +sessionStorage.getItem("rocket");
                sessionStorage.setItem("rocket", rocket + 1);
            } else sessionStorage.setItem("rocket", 1);
        } else if (4 == arrBonuses[2]) {
            text_three.classList.add("bonus__text");
            text_three.classList.add("bonus__text_small");
            let num = get_random_coins();
            text_three.textContent = `+${num}`;
            setTimeout((() => {
                diamonds.textContent = +diamonds.innerHTML + num;
                sessionStorage.setItem("coins", diamonds.innerHTML);
                diamonds.classList.add("_anim");
                setTimeout((() => {
                    diamonds.classList.remove("_anim");
                }), 1e3);
            }), 500);
            image_three.setAttribute("src", "img/icons/romb.svg");
            image_three.setAttribute("alt", "Image");
            item_three.append(image_three, text_three);
            document.querySelector(".bonus__prize_three").append(item_three);
        }
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
    window["FLS"] = true;
    isWebp();
})();