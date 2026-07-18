import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message } = req.body;
      
      const inquiry = await prisma.contactInquiry.create({
        data: {
          name,
          email,
          phone,
          subject,
          message,
        },
      });

      return res.status(201).json({ success: true, inquiry });
    } catch (error) {
      console.error('Error creating contact inquiry:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
