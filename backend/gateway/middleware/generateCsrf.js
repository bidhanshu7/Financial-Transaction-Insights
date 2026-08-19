const csrf = require('csrf');
const csrfProtection = csrf();

const generateCsrf = async (req, resp, next) => {
  try {
    const secret= process.env.CSRF_SECRET; 
    const token = csrfProtection.create(secret); 

    resp.cookie('csrfToken', token, {
      httpOnly: true,  
      sameSite: 'Strict', 
    });


    resp.status(200).json({ message: "CSRF token set successfully", csrfToken: token });

  } catch (error) {
    console.error('Error generating CSRF token:', error);
    next(error); 
  }
};

module.exports = { generateCsrf };
