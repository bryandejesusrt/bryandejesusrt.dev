
import jwt from 'jsonwebtoken';

const secret = 'absdvjabvahgeuabsekjvaioeauio4894644sevakpveiasbvauiegbuiabsvakb46516865as4d';

export function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1h' }); 
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        return null;
    }
}
