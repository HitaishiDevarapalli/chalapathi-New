import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, email, phone, program } = req.body;
      
      const application = await prisma.application.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          program,
          status: 'PENDING',
        },
      });

      return res.status(201).json({ success: true, applicationId: `CU-2026-${application.id}` });
    } catch (error) {
      console.error('Error submitting application:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
