const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    let totalCount = 0
    for (let obj of blogs) {
        totalCount += obj.likes;
    }
    return totalCount
}
  
module.exports = {
dummy,
totalLikes
}

