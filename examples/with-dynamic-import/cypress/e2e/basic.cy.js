/// <reference types="cypress" />

describe('HMR', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://127.0.0.1:3000/');
  });

  it('render local component', () => {
    cy.get('[data-test-id="local"]').should('exist');
  });

  it('renders dynamic loaded component', () => {
    cy.get('[data-test-id="dynamic-counter"]').should('exist');
  });

  it('respones to write updadte', () => {
    cy.get('[data-test-id="dynamic-counter"]').should(
      'contain.text',
      'count: 123',
    );

    cy.exec('cp -f lazy.tsx.txt lazy.tsx');

    cy.get('[data-test-id="dynamic-counter"]').should(
      'contain.text',
      'count: [123]',
    );

    cy.reload();

    cy.get('[data-test-id="dynamic-counter"]').should(
      'contain.text',
      'count: [123]',
    );
  });
});