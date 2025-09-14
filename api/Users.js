let users = [];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return all users
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    try {
      let data = req.body;

      // Handle raw body (in case req.body is empty on Vercel)
      if (!data || Object.keys(data).length === 0) {
        data = await new Promise((resolve, reject) => {
          let body = '';
          req.on('data', chunk => (body += chunk));
          req.on('end', () => {
            try {
              resolve(body ? JSON.parse(body) : {});
            } catch (err) {
              reject(err);
            }
          });
          req.on('error', reject);
        });
      }

      const { name, email, password } = data;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const newUser = {
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      return res.status(201).json(newUser);
    } catch (err) {
      console.error('Error parsing body', err);
      return res.status(400).json({ error: 'Invalid request body' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ error: `Method ${req.method} not allowed` });
}
