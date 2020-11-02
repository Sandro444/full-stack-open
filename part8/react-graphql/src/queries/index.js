import {gql} from "@apollo/client"

export const getAllAuthors = gql`
    query{
        getAllAuthors{
            name
            born
            id
            bookCount
        }
    }
    
`

export const getAllBooks = gql`
    query{
        getAllBooks{
            title
            published
            author
            genres
            id
        }
    }
`

export const editBornYear = gql`
    mutation editAuthorBornYear(
        $author: String!
        $bornYear: Int!
    ){
        editAuthorBornYear(
            author: $author
            bornYear: $bornYear
        ){
            name
            born
            id
        }
    }
`

export const addBook = gql`
    mutation addBook($title:String!
        $author:String!
        $published:Int
        $genres: [String!]){
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ){
            title
            author
            published
            genres
            id
        }
    }
`