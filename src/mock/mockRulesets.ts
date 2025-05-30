import type { Ruleset } from '../types';
import { v4 as uuid } from 'uuid';

const mockRulesets: Ruleset[] = [
  {
    id: uuid(),
    name: 'GT M2 Size',
    rules: [
      {
        id: uuid(),
        measurement: 'GT M2 Size',
        comparator: 'is',
        comparedValue: 'Not Present',
        unitName: 'mm',
        findingName: 'GT M2 Size Not Present',
        action: 'Normal',

      },
      {
        id: uuid(),
        measurement: 'DIV M2 Flow Size',
        comparator: '>=',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIV M2 Flow Size Greater Than 500',
        action: 'Normal'
      },
      {
        id: uuid(),
        measurement: 'DIVC M2 Flow Size',
        comparator: '<',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIVC M2 Flow Size Less Than 500',
        action: 'Normal'
      }, {
        id: uuid(),
        measurement: 'GT M2 Size',
        comparator: 'is',
        comparedValue: 'Not Present',
        unitName: 'mm',
        findingName: 'GT M2 Size Not Present',
        action: 'Normal',

      },
      {
        id: uuid(),
        measurement: 'DIV M2 Flow Size',
        comparator: '>=',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIV M2 Flow Size Greater Than 500',
        action: 'Normal'
      },
      {
        id: uuid(),
        measurement: 'DIVC M2 Flow Size',
        comparator: '<',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIVC M2 Flow Size Less Than 500',
        action: 'Normal'
      }, {
        id: uuid(),
        measurement: 'GT M2 Size',
        comparator: 'is',
        comparedValue: 'Not Present',
        unitName: 'mm',
        findingName: 'GT M2 Size Not Present',
        action: 'Normal',

      },
      {
        id: uuid(),
        measurement: 'DIV M2 Flow Size',
        comparator: '>=',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIV M2 Flow Size Greater Than 500',
        action: 'Normal'
      },
      {
        id: uuid(),
        measurement: 'DIVC M2 Flow Size',
        comparator: '<',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIVC M2 Flow Size Less Than 500',
        action: 'Normal'
      }, {
        id: uuid(),
        measurement: 'GT M2 Size',
        comparator: 'is',
        comparedValue: 'Not Present',
        unitName: 'mm',
        findingName: 'GT M2 Size Not Present',
        action: 'Normal',

      },
      {
        id: uuid(),
        measurement: 'DIV M2 Flow Size',
        comparator: '>=',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIV M2 Flow Size Greater Than 500',
        action: 'Normal'
      },
      {
        id: uuid(),
        measurement: 'DIVC M2 Flow Size',
        comparator: '<',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIVC M2 Flow Size Less Than 500',
        action: 'Normal'
      }, {
        id: uuid(),
        measurement: 'GT M2 Size',
        comparator: 'is',
        comparedValue: 'Not Present',
        unitName: 'mm',
        findingName: 'GT M2 Size Not Present',
        action: 'Normal',

      },
      {
        id: uuid(),
        measurement: 'DIV M2 Flow Size',
        comparator: '>=',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIV M2 Flow Size Greater Than 500',
        action: 'Normal'
      },
      {
        id: uuid(),
        measurement: 'DIVC M2 Flow Size',
        comparator: '<',
        comparedValue: 500,
        unitName: 'mm',
        findingName: 'DIVC M2 Flow Size Less Than 500',
        action: 'Normal'
      }
    ]
  },
  {
    id: uuid(),
    name: 'Flow Analysis Rules',
    rules: [
      {
        id: uuid(),
        measurement: 'Flow Rate 1',
        comparator: '<',
        comparedValue: 1000,
        unitName: 'mm',
        findingName: 'Flow Rate Less Than 1000',
        action: 'Reflux'
      },
      {
        id: uuid(),
        measurement: 'Flow Rate 2',
        comparator: '<',
        comparedValue: 1000,
        unitName: 'mm',
        findingName: 'Flow Rate Less Than 1000',
        action: 'Reflux'
      },
      {
        id: uuid(),
        measurement: 'Flow Rate 3',
        comparator: '<',
        comparedValue: 1000,
        unitName: 'mm',
        findingName: 'Flow Rate Less Than 1000',
        action: 'Reflux'
      },
      {
        id: uuid(),
        measurement: 'Flow Rate 4',
        comparator: '<',
        comparedValue: 1000,
        unitName: 'mm',
        findingName: 'Flow Rate Less Than 1000',
        action: 'Reflux'
      }
    ]
  }
];

export default mockRulesets;
