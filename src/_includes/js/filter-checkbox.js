export class FilterCheckbox {
	constructor() {}

	filterCheckboxHandler(checkboxId) {
		console.log(checkboxId);
		var checkbox = document.querySelector("#checkbox-" + checkboxId);
		var input = document.querySelector("#" + checkboxId);
		if (input.checked) {
			checkbox.classList.add("filter-checkbox--checked");
		} else {
			checkbox.classList.remove("filter-checkbox--checked");
		}
	}
}
