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
  
module.exports = {
dummy,
totalLikes,
favoriteBlog
}

