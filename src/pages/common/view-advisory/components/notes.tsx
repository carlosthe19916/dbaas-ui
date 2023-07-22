import {
  Card,
  CardBody,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Label,
} from '@patternfly/react-core';
import React from 'react';
import { AdvisoryDetails } from 'src/api/models';

interface NotesProps {
  advisoryDetails: AdvisoryDetails;
}

export const Notes: React.FC<NotesProps> = ({ advisoryDetails }) => {
  return (
    <Card isFullHeight>
      <CardBody>
        <DescriptionList>
          {advisoryDetails.document.notes.map((e, index) => (
            <DescriptionListGroup key={index}>
              <DescriptionListTerm>
                {e.title} <Label color='blue'>{e.category}</Label>
              </DescriptionListTerm>
              <DescriptionListDescription>{e.text}</DescriptionListDescription>
            </DescriptionListGroup>
          ))}
        </DescriptionList>
      </CardBody>
    </Card>
  );
};
