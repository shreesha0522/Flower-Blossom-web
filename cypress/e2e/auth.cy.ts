describe("Authentication Flow", () => {
  it("should load the home page", () => {
    cy.visit("/");
    cy.url().should("include", "/");
  });

  it("should navigate to login page", () => {
    cy.visit("/login");
    cy.get("input[type='email']").should("exist");
    cy.get("input[type='password']").should("exist");
  });

  it("should show error on invalid login", () => {
    cy.visit("/login");
    cy.get("input[type='email']").type("wrong@example.com");
    cy.get("input[type='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();
    cy.get("p.text-red-600", { timeout: 5000 }).should("exist");
  });

  it("should navigate to register page", () => {
    cy.visit("/register");
    cy.get("input#firstName").should("exist");
    cy.get("input#lastName").should("exist");
    cy.get("input#username").should("exist");
    cy.get("input#email").should("exist");
    cy.get("input#password").should("exist");
    cy.get("input#confirmPassword").should("exist");
  });

  it("should show error on mismatched passwords", () => {
    cy.visit("/register");
    cy.get("input#firstName").type("Shreesha");
    cy.get("input#lastName").type("Shrestha");
    cy.get("input#username").type("shreesha123");
    cy.get("input#email").type("shreesha@example.com");
    cy.get("input#password").type("password123");
    cy.get("input#confirmPassword").type("differentpassword");
    cy.get("button[type='submit']").click();
    cy.get("p.text-red-600", { timeout: 5000 }).should("exist");
  });

  it("should navigate from login to register page", () => {
    cy.visit("/login");
    cy.contains("Sign up").click();
    cy.url().should("include", "/register");
  });

  it("should navigate from register to login page", () => {
    cy.visit("/register");
    cy.contains("Log in").click();
    cy.url().should("include", "/login");
  });

  it("should navigate to forgot password page", () => {
    cy.visit("/login");
    cy.contains("Forgot Password").click();
    cy.url().should("include", "/forgot-password");
  });

  it("should show validation error when login form is submitted empty", () => {
    cy.visit("/login");
    cy.get("button[type='submit']").click();
    cy.get("p.text-red-600", { timeout: 5000 }).should("exist");
  });

  it("should show validation error when register form is submitted empty", () => {
    cy.visit("/register");
    cy.get("button[type='submit']").click();
    cy.get("p.text-red-600", { timeout: 5000 }).should("exist");
  });

  it("should retain typed values in login fields after failed submission", () => {
    cy.visit("/login");
    cy.get("input[type='email']").type("test@example.com");
    cy.get("input[type='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();
    cy.get("input[type='email']").should("have.value", "test@example.com");
  });

  it("should retain typed values in register fields after failed submission", () => {
    cy.visit("/register");
    cy.get("input#firstName").type("Shreesha");
    cy.get("input#lastName").type("Shrestha");
    cy.get("input#username").type("shreesha123");
    cy.get("input#email").type("shreesha@example.com");
    cy.get("input#password").type("password123");
    cy.get("input#confirmPassword").type("differentpassword");
    cy.get("button[type='submit']").click();
    cy.get("input#email").should("have.value", "shreesha@example.com");
  });

  it("should have login page title or heading visible", () => {
    cy.visit("/login");
    cy.get("h1, h2").should("be.visible");
  });

  it("should have register page title or heading visible", () => {
    cy.visit("/register");
    cy.get("h1, h2").should("be.visible");
  });
});