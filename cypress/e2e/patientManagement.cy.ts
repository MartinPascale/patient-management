describe('Patient Management', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/users', { fixture: 'patients.json' }).as(
      'getPatients',
    );
    cy.visit('/');
    cy.wait('@getPatients');
  });

  it('should retrieve and display a list of patient records', () => {
    cy.getById('patient-card').should('have.length.at.least', 1);
  });

  it('should display patient records individually in cards', () => {
    cy.getById('patient-card').each(($el) => {
      cy.wrap($el).within(() => {
        cy.getById('patient-name').should('exist');
        cy.getById('patient-avatar').should('exist');
      });
    });
  });

  it('should allow users to expand patient details', () => {
    cy.getById('patient-card')
      .first()
      .within(() => {
        cy.getById('expand-button').click();
        cy.getById('patient-details').should('be.visible');
      });
  });

  it('should open a modal to edit patient information', () => {
    cy.getById('patient-card')
      .first()
      .within(() => {
        cy.getById('edit-button').click();
      });
    cy.getById('modal').should('be.visible');
    cy.getById('modal')
      .find('input[name="name"]')
      .should('have.value', 'John Doe');
  });

  it('should allow editing of existing patient data', () => {
    cy.getById('patient-card')
      .first()
      .within(() => {
        cy.getById('edit-button').click();
      });
    cy.getById('modal').find('input[name="name"]').clear().type('Jane Doe');
    cy.getById('modal').find('button[type="submit"]').click();
    cy.getById('patient-card')
      .first()
      .within(() => {
        cy.getById('patient-name').should('contain', 'Jane Doe');
      });
  });

  it('should allow adding a new patient', () => {
    cy.getById('add-patient-button').click();
    cy.getById('modal').find('input[name="name"]').type('New Patient');
    cy.getById('modal')
      .find('input[name="avatar"]')
      .type('https://example.com/avatar-new.jpg');
    cy.getById('modal')
      .find('textarea[name="description"]')
      .type('New patient description');
    cy.getById('modal')
      .find('input[name="website"]')
      .type('https://newpatient.com');
    cy.getById('modal').find('button[type="submit"]').click();
    cy.getById('patient-card').should('contain', 'New Patient');
  });

  it('should disable the submit button if the form is invalid', () => {
    cy.getById('add-patient-button').click();
    cy.getById('modal').find('button[type="submit"]').should('be.disabled');
  });

  it('should display validation errors for invalid form data', () => {
    cy.getById('add-patient-button').click();
    cy.getById('modal').find('input[name="name"]').type(' ');
    cy.getById('modal').find('input[name="avatar"]').type('invalid-url');
    cy.getById('modal').find('input[name="website"]').type('invalid-url');
    cy.getById('modal').find('textarea[name="description"]').focus();
    cy.getById('error-message').should('have.length', 3);
  });

  it.only('should display a success notification on successful data modification', () => {
    cy.getById('patient-card')
      .first()
      .within(() => {
        cy.getById('edit-button').click();
      });
    cy.getById('modal').find('input[name="name"]').clear().type('Jane Doe');
    cy.getById('modal').find('button[type="submit"]').click();
    cy.getById('toast-notification').should(
      'contain',
      'Patient saved successfully',
    );
  });
});
