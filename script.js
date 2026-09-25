function persianNumber(number) {

    return new Intl.NumberFormat(
        "fa-IR",
        {
            maximumFractionDigits: 2
        }
    ).format(number);

}


/* گرفتن ساعت فعلی */

function setNow(inputId) {

    const now = new Date();

    const hours =
        String(now.getHours())
        .padStart(2, "0");

    const minutes =
        String(now.getMinutes())
        .padStart(2, "0");

    document.getElementById(inputId).value =
        hours + ":" + minutes;

}


/* تبدیل ساعت به دقیقه */

function timeToMinutes(time) {

    const parts = time.split(":");

    const hours =
        Number(parts[0]);

    const minutes =
        Number(parts[1]);

    return (
        hours * 60 +
        minutes
    );

}


/* محاسبه قیمت */

function calculate() {

    const hourPrice =
        Number(
            document.getElementById(
                "hourPrice"
            ).value
        );


    const start =
        document.getElementById(
            "start"
        ).value;


    const end =
        document.getElementById(
            "end"
        ).value;


    const price =
        document.getElementById(
            "price"
        );


    const duration =
        document.getElementById(
            "duration"
        );


    const minutePrice =
        document.getElementById(
            "minutePrice"
        );


    const error =
        document.getElementById(
            "error"
        );


    error.innerText = "";


    /* بررسی قیمت */

    if (
        !Number.isFinite(hourPrice) ||
        hourPrice <= 0
    ) {

        error.innerText =
            "⚠️ قیمت هر ساعت را وارد کن.";

        return;

    }


    /* بررسی ساعت */

    if (!start || !end) {

        error.innerText =
            "⚠️ ساعت شروع و پایان را وارد کن.";

        return;

    }


    let startMinutes =
        timeToMinutes(start);


    let endMinutes =
        timeToMinutes(end);


    /*
       اگر پایان از شروع کمتر باشد،
       یعنی بازی از نیمه‌شب رد شده.
    */

    if (
        endMinutes <
        startMinutes
    ) {

        endMinutes += 1440;

    }


    const totalMinutes =
        endMinutes -
        startMinutes;


    if (totalMinutes <= 0) {

        error.innerText =
            "⚠️ زمان بازی معتبر نیست.";

        return;

    }


    /* قیمت هر دقیقه */

    const pricePerMinute =
        hourPrice / 60;


    /* قیمت نهایی */

    const totalPrice =
        totalMinutes *
        pricePerMinute;


    /* ساعت */

    const hours =
        Math.floor(
            totalMinutes / 60
        );


    /* دقیقه */

    const minutes =
        totalMinutes % 60;


    /* نمایش قیمت */

    price.innerText =
        persianNumber(totalPrice) +
        " تومان";


    /* نمایش مدت */

    duration.innerText =
        "مدت بازی: " +
        persianNumber(hours) +
        " ساعت و " +
        persianNumber(minutes) +
        " دقیقه";


    /* نمایش قیمت دقیقه */

    minutePrice.innerText =
        "قیمت هر دقیقه: " +
        persianNumber(pricePerMinute) +
        " تومان";

}


/* پاک کردن */

function clearAll() {

    document.getElementById(
        "hourPrice"
    ).value = "";


    document.getElementById(
        "start"
    ).value = "";


    document.getElementById(
        "end"
    ).value = "";


    document.getElementById(
        "price"
    ).innerText =
        "۰ تومان";


    document.getElementById(
        "duration"
    ).innerText =
        "مدت بازی: —";


    document.getElementById(
        "minutePrice"
    ).innerText =
        "قیمت هر دقیقه: —";


    document.getElementById(
        "error"
    ).innerText = "";

}


/* محاسبه با دکمه Enter */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            calculate();

        }

    }
);