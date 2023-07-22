import { Label, LabelProps } from '@patternfly/react-core';
import React from 'react';
import { BaseSeverity, Score } from 'src/api/models';

type BaseSeverityListType = {
  [key in BaseSeverity]: {
    labelProps: LabelProps;
  };
};
const baseSeverityList: BaseSeverityListType = {
  NONE: {
    labelProps: { color: 'grey' },
  },
  LOW: {
    labelProps: { color: 'orange' },
  },
  MEDIUM: {
    labelProps: { color: 'orange' },
  },
  HIGH: {
    labelProps: { color: 'red' },
  },
  CRITICAL: {
    labelProps: { color: 'purple' },
  },
};

interface ScoreProps {
  scores: Score[];
}

export const ScoresLabel: React.FC<ScoreProps> = ({ scores }) => {
  return (
    <>
      {scores
        .flatMap((item) => item.cvss_v3)
        .map((item, index) => (
          <Label
            key={index}
            {...baseSeverityList[item.baseSeverity].labelProps}
          >
            {item.baseScore}
          </Label>
        ))}
    </>
  );
};
