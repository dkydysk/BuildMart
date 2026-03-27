const filters_button_text = document.getElementById("filters_button_text");
const filters_div = document.getElementById("filters_div");
const filters_button = document.getElementById("filters_button");

const clear_filters_button = document.getElementById("clear_filters_button");

const minSlider = document.getElementById('min-price');
const maxSlider = document.getElementById('max-price');
const sliderRange = document.getElementById('slider-range');
const minValueText = document.getElementById('min-value');
const maxValueText = document.getElementById('max-value');
const minValue = 0;
const maxValue = 400;

filters_button.addEventListener("click", function() {
    if (filters_div.style.display === "none") {
        filters_button_text.textContent = "Hide Filters";
        filters_div.style.display = "block";
    } else {
        filters_button_text.textContent = "Show Filters";
        filters_div.style.display = "none";
    }
});

clear_filters_button.addEventListener("click", function() {
    clearFilters();
});

minSlider.addEventListener('input', e => {
    updateSlider(e);
});

maxSlider.addEventListener('input', e => {
    updateSlider(e);
});

function updateSlider(e) {
    let minVal = parseInt(minSlider.value);
    let maxVal = parseInt(maxSlider.value);

    if (e.target.id === "min-price") {
        if (minVal > maxVal) {
            minVal = maxVal;
            minSlider.value = minVal;
        }
    } else if (e.target.id === "max-price") {
        if (minVal > maxVal) {
            maxVal = minVal;
            maxSlider.value = maxVal;
        }
    }

    minValueText.textContent = '$' + minVal;
    maxValueText.textContent = '$' + maxVal;
    sliderRange.style.left = (minVal / maxValue) * 100 + '%';
    sliderRange.style.right = (100 - (maxVal / maxValue) * 100) + '%';
}

function clearFilters(){
    const activeSelected = document.querySelector('[id^="rating-"][data-state="checked"]');
    if(activeSelected){
        activeSelected.setAttribute("data-state", "unchecked");
        activeSelected.setAttribute("aria-checked", "false");
        const activeSelectedSpan = activeSelected.querySelector('span');
        activeSelectedSpan.setAttribute("data-state", "unchecked");
    }

    minSlider.value = minValue;
    maxSlider.value = maxValue;
    minValueText.textContent = '$' + minValue;
    maxValueText.textContent = '$' + maxValue;
    sliderRange.style.left = 0 + '%';
    sliderRange.style.right = 0 + '%';
}

