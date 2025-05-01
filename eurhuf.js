var convertValue = 0;

function forceMinWidth() {
    document.body.style.minWidth = "0px";
}

window.addEventListener('resize', forceMinWidth);

window.onload = forceMinWidth;

function openPopup() {
    const url = "./eurhufpopup.html"; 
    const windowFeatures = "width=300,height=200";
    window.convertValue = document.getElementById('myeur').value;
    window.open(url, "_blank", windowFeatures);
}

document.getElementById("eurBtN").addEventListener("click", openPopup);
