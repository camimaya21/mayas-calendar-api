import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const eventMarch = await prisma.event.create({
    data: {
      title: 'Fathers Day ',
      description: 'Great this year is on friday',
      start_date: '2021-03-19T10:00:00.000Z',
      end_date: '2021-03-19T11:00:00.000Z'
    }
  });

  const eventApril = await prisma.event.create({
    data: {
      title: 'April Fools',
      description: 'Just kiding...',
      start_date: '2021-04-01T10:00:00.000Z',
      end_date: '2021-04-01T11:00:00.000Z'
    }
  });

  const eventMay = await prisma.event.create({
    data: {
      title: 'May the 4th',
      description: 'Release the friki version of yourself',
      start_date: '2021-05-04T10:00:00.000Z',
      end_date: '2021-05-04T11:00:00.000Z'
    }
  });

  const eventJune = await prisma.event.create({
    data: {
      title: 'Pride Day',
      description: 'All you need is love',
      start_date: '2021-06-28T07:00:00.000Z',
      end_date: '2021-06-28T23:00:00.000Z'
    }
  });

  console.log({ eventMarch, eventApril, eventMay, eventJune });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
