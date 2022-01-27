const login = (username, password) => {
    cy.get('#usernameInput').type(username)
    cy.get('#passwordInput').type(password)
    cy.get('#loginForm').submit()
}

const createBlog = () => {
    cy.get('#openToggleButton').click()
    cy.get('#blogTitleInput').type('title of the new blog')
    cy.get('#blogUrlInput').type('url')
    const form = cy.get('#createNewBlogForm')
    form.submit()
}

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'root',
            username: 'root',
            password: 'root'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        const form = cy.get('#loginForm').should('have.css', 'display', 'block')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            login('root', 'root')
            cy.get('html').contains('logged in as root')
        })
    
        it('fails with wrong credentials', function() {
            login('root', 'asdfs')
            cy.get('html').contains('Request failed with status code 401')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            login('root', 'root')
        })
    
        it('A blog can be created', function() {
            createBlog()

            cy.get('html').contains('title of the new blog added')
            cy.get('#blogsListDiv').contains('title of the new blog')
        })

        it('a blog can be liked', function() {
            createBlog()
            cy.contains('info').click()
            cy.get('#likeButton').click()
            cy.get('html').contains('likes: 1')
        })

        it.only('a blog can be deleted by the user that created it', function() {
            createBlog()

            cy.contains('delete').click()
            cy.get('#blogsListDiv').should('not.contain','title of the new blog')
        })
    })
})