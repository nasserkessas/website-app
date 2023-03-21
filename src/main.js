/**
 * DATA FETCHING
 */

const getData = async () => {
    try {

        let ret;

        await $.ajax({
            url: "http://data.kessas.com.s3-website-ap-southeast-2.amazonaws.com/data.json",
            type: 'get',
            dataType: 'html',
            // async: false,
            success: (data) => {
                
                data = JSON.parse(data);

                // let years_coding = new Date().getFullYear() - 2016;

                // $("#years").get(0).style.setProperty('--tonum', years_coding)

                $("#rep").get(0).style.setProperty('--tonum', data.stats.reputation)

                $("#repos").get(0).style.setProperty('--tonum', data.stats.repos.repoCount)

                $("#hours").get(0).style.setProperty('--tonum', data.stats.time.minutes >= 30 ? data.stats.time.hours + 1 : data.stats.time.hours);

                const langsSection = $("#langs").get(0);

                let langs = Object.keys(data.stats.repos.languages).map((key) => [key, data.stats.repos.languages[key]]);
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
                        i++;
                    }
                }

                ret = [elems, lengths];
            }
        });

        return ret;

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
    emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, templateParams, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
	    .then((response) => {
	        console.log('SUCCESS!',dataponse.status,dataponse.text);
	    }, (err) => {
	        console.log('FAILED...', err);
        })
        .catch((e) => {
            console.log(e);
        });

    return false;
};
