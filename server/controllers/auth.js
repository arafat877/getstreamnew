const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;

const login = async (req, res) => {
    try {
        const { userId, username, password } = req.body;

        const hashedPassword = `HASHED ${password} HASHED`;

        // Define values. 
        const api_key = 'e6nfz3p5c2qb' 
        const api_secret = 'rfus6h6xq2y5gf9m9jkf4gqrcm282y9efzqtyw2a5r37targmuf9zgp764hasqe9' 
        // const user_id = 'john' 
        
        // Initialize a Server Client 
        const serverClient = connect(api_key, api_secret); 
        const client = StreamChat.getInstance(api_key, api_secret); 
        
        // const response = await serverClient.queryUsers({ id: userId }); 
        const users = await client.queryUsers({ id: userId });
        console.log(users)
        // console.log(response);
        // Create User Token 
        const token = serverClient.createUserToken(userId); 
                
        res.status(200).json({ user: { username, userId, password: hashedPassword }, token, message: 'Login successful.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const signup = async (req, res) => { 
    try {
        const { userId, username, password } = req.body;

        // Define values. 
        const api_key = 'e6nfz3p5c2qb' 
        const api_secret = 'rfus6h6xq2y5gf9m9jkf4gqrcm282y9efzqtyw2a5r37targmuf9zgp764hasqe9' 
        // const user_id = 'john' 
        
        // Initialize a Server Client 
        const serverClient = connect(api_key, api_secret); 
        // Create User Token 
        const token = serverClient.createUserToken(userId); 
                
        res.status(200).json({ token, message: 'Signup successful.' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


module.exports = { signup, login };