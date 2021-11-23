import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Ganesh vategaonkar',
        email: 'ganesh@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'Pranav Tikone',
        email: 'pranav@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },

]

export default users;