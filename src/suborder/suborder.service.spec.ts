import { Test, TestingModule } from '@nestjs/testing';
import { SuborderService } from './suborder.service';

describe('SuborderService', () => {
  let service: SuborderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuborderService],
    }).compile();

    service = module.get<SuborderService>(SuborderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
