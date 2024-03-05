const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    let totalCount = 0
    for (let obj of blogs) {
        totalCount += obj.likes
    }
    return totalCount
}

const favoriteBlog = (blogs) => {
    let favLikes = 0
    let return_obj = null
    for (let obj of blogs) {
        if (obj.likes >= favLikes){
            favLikes = obj.likes
            return_obj = obj
        }
    }
    return return_obj
}

const mostBlogs = (blogs) => {
    let mostBlogsAuthor = null
    let mostBlogsAmount = 0
    const authorCount = {}

    for (let obj of blogs) {
        const author = obj.author
        authorCount[author] = (authorCount[author] || 0) + 1
        if (authorCount[author] > mostBlogsAmount) {
            mostBlogsAmount = authorCount[author]
            mostBlogsAuthor = author
        }
    }
    return {author: mostBlogsAuthor, blogs: mostBlogsAmount}
}
  
module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs
}

