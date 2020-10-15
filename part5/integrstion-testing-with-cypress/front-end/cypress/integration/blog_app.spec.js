
before(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    const user = {
        name: 'Sandro Tsereteli',
        username: 'sandro',
        password: 'sandro'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')


})
describe('Blog app', function () {

    it('front page can be opened', function () {
        cy.contains('blogs')
    })

    it('login form can be opened', function () {
        cy.contains('submit')
    })

    it('can click login button', function () {
        cy.contains('submit')
    })

    it('login fails with wrong data', function () {
        cy.contains('submit')
        cy.get('#username').type('wrong username')
        cy.get('#password').type('wrong pw')
        cy.get('#login-button').click()
        cy.contains('invalid username or password')
    })

    describe('when logged in', function () {

        before(function () {
            cy.get('#username').clear()
            cy.get('#password').clear()
            cy.contains('submit').click()
            cy.get('#username').type('sandro')
            cy.get('#password').type('sandro')
            cy.get('#login-button').click()
            cy.contains('welcome user: sandro')
        })

        it('a new note can be created', function () {
            cy.contains('create blog').click()
            cy.get('.blog-create-title').type('a blog created by cypress')
            cy.get('.blog-create-author').type('Cypress')
            cy.get('.blog-create-url').type('localhost:3000')
            cy.get('#submit-create-blog').click()
            cy.contains('a blog created by cypress')
        })

        it('new note can be liked', function () {
            cy.get('.0-blog-show-button').click()
            cy.get('.blog-likes').contains("Likes: 0")
            cy.get('.blog-like-button').click()
            cy.get('.blog-likes').contains("Likes: 1")
        })
        it("blog is deleted", function () {
            cy.get('.blog-delete-button').click()

            cy.get('.all-blogs').should('not.contain', 'a blog created by cypress')
        }) 

        
    })
})


