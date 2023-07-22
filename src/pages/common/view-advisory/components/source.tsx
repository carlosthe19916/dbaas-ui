import { CodeEditor, Language } from '@patternfly/react-code-editor';
import React from 'react';
import { AdvisoryDetails } from 'src/api/models';

interface SourceProps {
  advisoryDetails: AdvisoryDetails;
}

export const Source: React.FC<SourceProps> = ({ advisoryDetails }) => {
  return (
    <>
      <CodeEditor
        isDarkTheme
        isLineNumbersVisible
        isReadOnly
        isMinimapVisible
        // isLanguageLabelVisible
        code={JSON.stringify(advisoryDetails, null, 2)}
        language={Language.json}
        height='650px'
      />
    </>
  );
};
