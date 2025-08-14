// Netlify function: send-email
const nodemailer = require('nodemailer');
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  const data = JSON.parse(event.body||'{}');
  const {
    type='contact', name='', email='', message='', module='', score='', details=''
  } = data;
  const to = process.env.TO_EMAIL;
  if(!to) return { statusCode: 500, body: 'Missing TO_EMAIL env var' };
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT||'587',10),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  const subject = type==='quiz' ? `BMO Quiz Result: ${module} – ${score}` :
                  type==='training-question' ? `BMO Training question from ${name}` :
                  `BMO Contact from ${name}`;
  const text = JSON.stringify(data, null, 2);
  try {
    await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, text });
    return { statusCode: 200, body: JSON.stringify({ ok:true }) };
  } catch (e) {
    return { statusCode: 500, body: e.toString() };
  }
};
