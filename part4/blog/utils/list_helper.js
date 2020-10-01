const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((sum, current)=>sum + current.likes,0)
}
const favouriteBlog = (blogs) => {
    let mostLikes = 0;
    let favouriteBlog = {};
    blogs.map(blog => {
        if(blog.likes >= mostLikes){
            favouriteBlog = {
                title:blog.title,
                author:blog.author,
                likes:blog.likes
            }
        }
    })
    return favouriteBlog;
}

const mostBlogs = (blogs) => {
    let authorMap = {

    }
    let mostPopular = {

    }
    let mostPopularNumber = 0
    blogs.map(blog => {
        if(Object.keys(authorMap).indexOf(blog.author) === -1){
            authorMap[blog.author] = 1
        } else{
            authorMap[blog.author] = authorMap[blog.author] + 1
        }
    })

    Object.keys(authorMap).map(author => {
        if(authorMap[author] >= mostPopularNumber){
            if(Object.keys(mostPopular) > 0){
                delete mostPopular[Object.keys(mostPopular)[0]]
            }
            mostPopular[author] = authorMap[author]
            mostPopularNumber = mostPopular[author]
        }
    })

    return mostPopular
}

const mostLikes = (blogs) => {
    let authorMap = {
    }
    blogs.map(blog => {
        if(Object.keys(authorMap).indexOf(blog.author) === -1){
            authorMap[blog.author] = blog.likes
        } else{
            authorMap[blog.author] = authorMap[blog.author] + blog.likes
        }
    })
    let mostLikes = 0;
    let authorWithMostLikes = {};
    Object.keys(authorMap).map(author => {
        if(authorMap[author] >= mostLikes){
            authorWithMostLikes = {};
            authorWithMostLikes[author] = authorMap[author]
            mostLikes = authorMap[author]
        }
    })
    return authorWithMostLikes
}
module.exports = {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes}