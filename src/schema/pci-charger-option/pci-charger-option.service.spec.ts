import { Test, TestingModule } from '@nestjs/testing';
import { PciChargerOptionService } from './pci-charger-option.service';

describe('PciChargerOptionService', () => {
  let service: PciChargerOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PciChargerOptionService],
    }).compile();

    service = module.get<PciChargerOptionService>(PciChargerOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
