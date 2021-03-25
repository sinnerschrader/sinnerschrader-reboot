export function filterCheckboxHandler(checkboxId) {
	var checkbox = document.querySelector("#" + checkboxId);
	if (checkbox.checked) {
		checkbox.classList.add("filter-checkbox--checked");
	} else {
		checkbox.classList.remove("filter-checkbox--checked");
	}
}
