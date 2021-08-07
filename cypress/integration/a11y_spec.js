describe("Accesibility tests", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.injectAxe();
	});
	it("Has no detectable a11y violations on load", () => {
		// Test the page at initial load
		cy.checkA11y();
	});
});
