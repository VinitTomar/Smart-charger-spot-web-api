import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { PciChargerOptionService } from 'src/schema';
import { Pci } from './pci.schema';

@Injectable()
export class ValidatePciChargersPipe implements PipeTransform {

  constructor(
    private readonly _pciChargerOption: PciChargerOptionService
  ) { }

  async transform(value: Pci, metadata: ArgumentMetadata) {

    const chargerOptions = await this._pciChargerOption.list();

    const chargers = value.chargers;

    const errFields = chargers.map((chrg, i) => {
      const found = !!chargerOptions.find(optn => {
        const isMatched = (
          optn.type === chrg.type
          && optn.connector === chrg.connector
          && optn.voltageRange === chrg.voltageRange
        );

        return isMatched;
      });

      if (found) {
        return '';
      } else {
        return `chargers.${i}`;
      }
    });

    const filteredErrFileld = errFields.filter(msg => !!msg);

    if (filteredErrFileld && filteredErrFileld.length > 0) {
      const invalidFields = filteredErrFileld.map(msg => {
        return {
          "field": msg,
          "type": 'Invalid charger',
          "message": `Path \`${msg}\` is has invalid configuration.`
        }
      });

      throw new BadRequestException({ statusCode: 400, error: "Bad Request", invalidFields });
    }

    return value;
  }
}
