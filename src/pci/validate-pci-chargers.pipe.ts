import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { PciChargerOptionService } from 'src/schema';
import { Pci } from './pci.schema';
import { PciChargerValidatorErr } from './pci-charger-validator-err';

@Injectable()
export class ValidatePciChargersPipe implements PipeTransform {

  constructor(
    private readonly _pciChargerOption: PciChargerOptionService
  ) { }

  async transform(value: Pci, metadata: ArgumentMetadata) {

    const chargerOptions = await this._pciChargerOption.list();

    const chargers = value.chargers;

    const errFields: PciChargerValidatorErr[] = chargers.map((chrg, i) => {
      const err: PciChargerValidatorErr = {
        msg: '',
        path: ''
      };

      const found = !!chargerOptions.find(optn => {
        const isMatched = (
          optn.type === chrg.type
          && optn.connector === chrg.connector
          && optn.voltageRange === chrg.voltageRange
        );

        return isMatched;
      });

      err.path = `chargers.${i}`;

      if (found) {
        if (chargers.map(chrg => chrg.connector).lastIndexOf(chrg.connector) !== i) {
          err.msg = ` has duplicate entry.`;
        }
      } else {
        err.msg = ` has invalid configuration.`;
      }

      return err;
    });

    const filteredErrFileld = errFields.filter(err => !!err.msg);

    if (filteredErrFileld && filteredErrFileld.length > 0) {
      const invalidFields = filteredErrFileld.map(err => {
        return {
          "field": err.path,
          "type": 'Invalid charger',
          "message": `Path \`${err.path}\` ${err.msg}`
        }
      });

      throw new BadRequestException({ statusCode: 400, error: "Bad Request", invalidFields });
    }

    return value;
  }
}
