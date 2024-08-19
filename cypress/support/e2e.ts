import '@testing-library/cypress/add-commands';

export {};

// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.getByTestId('greeting')
       */
      getByTestId(selector: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('getByTestId' as any, (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by id attribute.
       * @example cy.getById('greeting')
       */
      getById(selector: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('getById' as any, (selector) => {
  return cy.get(`[id=${selector}]`);
});
