describe("Checking jobs", () => {
	it("Check jobs filter", () => {
		cy.visit("/jobs.html");

		cy.url().should("include", "/jobs.html");

		cy.get("#js-toggle-filter-bar").click();

		cy.get(".job-filter-bar__filter-item").should("contain", " Frankfurt");
	});
});
