import axios from 'axios'

export default async (email: string, key: string): Promise<{ [key: string]: string }> => {
  const authData = {
    'grant_type': 'client_credentials',
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET,
  }
  const sendMailData = {
    email: {
      html: '',
      text: `Открытый ключ администратора: \n${key}\n Пожалуйста, сохраните его для дальнейшего использования.`,
      subject: 'Открытый ключ',
      from: {
        name: '',
        email: process.env.SENDER_EMAIL,
      },
      to: [
        {
          name: '',
          email,
        }
      ],
    }
  }

  try {
    const authRes = await axios.post('https://api.sendpulse.com/oauth/access_token', authData)
    const token = authRes.data.access_token
    const sendMailRes = await axios({
      url: 'https://api.sendpulse.com/smtp/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: sendMailData,
    })
    return {
      result: sendMailRes.data.result,
      messageId: sendMailRes.data.id,
    }
  } catch (error) {
    return {
      error: error.message,
    }
  }
}
