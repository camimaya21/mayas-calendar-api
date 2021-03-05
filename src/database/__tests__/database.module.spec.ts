import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import { PrismaService } from '../prisma.service';

jest.mock('../prisma.service');

describe('DatabaseModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule]
    }).compile();
  });

  it('DatabaseModule should have PrismaService as provider', () => {
    expect(module).toBeDefined();
    expect(module.get(PrismaService)).toBeDefined();
  });
});
