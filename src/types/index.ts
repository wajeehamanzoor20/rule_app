export type Comparator = 'is' | '>=' | '<';
export type Action = 'Normal' | 'Reflux';
export type Status = 'new' | 'editing' | "saved";

export interface Rule {
  id: string;
  measurement: string;
  comparator: Comparator;
  comparedValue: string | number;
  unitName: string;
  findingName: string;
  action: Action;
  status?: Status; 
}

export interface Ruleset {
  id: string;
  name: string;
  rules: Rule[];
}

export type Mode = 'view' | 'edit';