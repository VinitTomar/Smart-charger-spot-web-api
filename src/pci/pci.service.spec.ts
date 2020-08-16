import { Test, TestingModule } from '@nestjs/testing';
import { PciService } from './pci.service';

describe('PciService', () => {
  let service: PciService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PciService],
    }).compile();

    service = module.get<PciService>(PciService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
