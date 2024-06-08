const { default: mongoose } = require('mongoose')

const dbConnect = () => {
    try {
        const conn = mongoose.connect("mongodb+srv://hoangkimchi0590:kim123456@cluster0.ncvmlqs.mongodb.net/")
        console.log("Database connect successfully")
    } catch (error) {
        console.log("Database error")
    }
}
module.exports = dbConnect