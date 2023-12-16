import { Test, TestingModule } from '@nestjs/testing';
import { SuborderController } from './suborder.controller';
import { SuborderService } from './suborder.service';

describe('SuborderController', () => {
  let controller: SuborderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuborderController],
      providers: [SuborderService],
    }).compile();

    controller = module.get<SuborderController>(SuborderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
