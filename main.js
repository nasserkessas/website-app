import config from './config.json' assert { type: 'json' };
import axios from 'axios';
import $ from "jquery";
import emailjs from '@emailjs/browser';

// TODO: Change HTTP requests to use Jquery

/**
 * DATA FETCHING
 */

const getData = async () => {
    try {
        const res = await axios.get(config["API_URL"]);

        // let years_coding = new Date().getFullYear() - 2016;

        // $("#years").get(0).style.setProperty('--tonum', years_coding)

        $("#rep").get(0).style.setProperty('--tonum', res.data.stats.reputation)

        $("#repos").get(0).style.setProperty('--tonum', res.data.stats.repos.repoCount)

        $("#hours").get(0).style.setProperty('--tonum', res.data.stats.time.minutes >= 30 ? res.data.stats.time.hours + 1 : res.data.stats.time.hours);

        const langsSection = $("#langs").get(0);

        let langs = Object.keys(res.data.stats.repos.languages).map((key) => [key, res.data.stats.repos.languages[key]]);
        langs.sort((first, second) => second[1] - first[1]);

        let elems = [];
        let lengths = [];
        let i = 1;
        for (let lang of langs) {
            if (lang[1] > 2) {
                langsSection.innerHTML += `
                <div class="lang">
                    <div class="lang-label">${lang[0]}</div>
                    <div class="lang-box-full">
                        <div class="lang-box" id="lang-box-${i}">
                            <div class="lang-box-percent">${Math.round(lang[1])}%</div>
                        </div>
                    </div>
                </div>`
                elems.push(i);
                lengths.push(lang[1]);
                i++
            }
        }
        return [elems, lengths];

    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        return;
    }
};

/**
 * LANGUAGE BAR OBSERVERS
 */

(async () => {
let [elems, lengths] = await getData();

let bar_options = {
    root: null,
    threshold: 0.2
}

let bar_observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            for (let i of elems) {
                if (lengths[i - 1] > 4) {
                    $(`#lang-box-${i}`).get(0).style.width = `${lengths[i - 1] * 2}%`;
                } else {
                    $(`#lang-box-${i}`).get(0).style.width = `${4 * 2}%`;
                }
            }
            observer.unobserve(entry.target)
        }
    })
}, bar_options);

bar_observer.observe($(`#langs`).get(0));
})();

/**
 * STAT COUNTER OBSERVERS
 */

let targets = $(".counter").get()

targets.forEach.call(targets, (target) => {
    target.classList.add("zero");
});

let counter_options = {
    root: null,
    threshold: [0.5]
};

let counter_observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
        }
    });
}, counter_options);

targets.forEach.call(targets, (target) => {
    counter_observer.observe(target);
});


/**
 * PORTFOLIO CAROUSEL
 */

let delay = 5000;
let pic = 1;

document.getElementById(pic).className = "active";
setInterval(() => {
    document.getElementById(pic).className = "end";
    let oldpic = pic;
    setTimeout(() => { document.getElementById(oldpic).className = "start"; }, 1000)

    if (pic < 7) pic++;
    else pic = 1;

    document.getElementById(pic).className = "active";
}, delay)


/**
 * Contact form
 */


document.forms.contact_form.onsubmit = function () {

    let templateParams = {
        subject: $("input[name=subject]").val(),
        name: $("input[name=name]").val(),
        email: $("input[name=email]").val(),
        message: $("textarea[name=message]").val()
    }
    console.log(templateParams);
    return false;
    emailjs.send(config["EMAILJS_SERVICE_ID"], config["EMAILJS_TEMPLATE_ID"], templateParams, config["EMAILJS_PUBLIC_KEY"])
	    .then((response) => {
	        console.log('SUCCESS!', response.status, response.text);
	    }, (err) => {
	        console.log('FAILED...', err);
        })
        .catch((e) => {
            console.log(e);
        });

    return false;
};
