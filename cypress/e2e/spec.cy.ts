describe("Formulario de nombre y navegación", () => {
  let name = "Juan";
  it("llena el nombre y navega al dashboard", () => {
    cy.visit("http://localhost:3000");

    // Escribir el nombre en el input
    cy.get('[data-testid="input-name"]').type(name);

    // Hacer clic en el botón
    cy.get('[data-testid="button-send"]').click();

    // Verificar que estamos en la página /dashboard
    cy.url().should("include", "/dashboard");

    // Verificar que el título esté presente
    cy.get('[data-testid="title-dashboard"]')
      .should("be.visible")
      .and("contain", name);
  });
});
