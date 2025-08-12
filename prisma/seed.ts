import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: 'user_1',
        email: 'alice@example.com',
        name: 'Alice',
        gender: 'female',
        genderPreference: 'male',
        birthDate: new Date('1995-01-01'),
        photos: ['https://example.com/alice.jpg'],
        location: { lat: 40.7128, lng: -74.0060 },
      },
      {
        id: 'user_2',
        email: 'bob@example.com',
        name: 'Bob',
        gender: 'male',
        genderPreference: 'female',
        birthDate: new Date('1992-03-15'),
        photos: ['https://example.com/bob.jpg'],
        location: { lat: 40.7589, lng: -73.9851 },
      },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });