import { Test, TestingModule } from '@nestjs/testing';
import { PciController } from './pci.controller';

describe('Pci Controller', () => {
  let controller: PciController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PciController],
    }).compile();

    controller = module.get<PciController>(PciController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
