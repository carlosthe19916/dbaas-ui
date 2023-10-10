import {
  Bullseye,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Label,
  LabelProps,
  List,
  ListItem,
  Spinner,
  Tooltip,
} from '@patternfly/react-core';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import React from 'react';
import { Advisory, BaseSeverity } from 'src/api/models';
import { useAdvisoryById } from 'src/queries/advisories';

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

interface AdvisoryDetailsProps {
  advisory: Advisory;
}

export const AdvisoryDetails: React.FC<AdvisoryDetailsProps> = ({
  advisory,
}) => {
  const { result, isFetching } = useAdvisoryById(advisory.id || '');

  // const branchToTreeViewDataItem = (branches: Branch[]) => {
  //   return branches.map((branch) => {
  //     let result: TreeViewDataItem = {
  //       name: (
  //         <Flex>
  //           <FlexItem spacer={{ default: "spacerSm" }}>{branch.name}</FlexItem>
  //           <FlexItem>
  //             <Label variant="outline" color="blue" isCompact>
  //               {branch.category}
  //             </Label>
  //           </FlexItem>
  //         </Flex>
  //       ),
  //       children: branch.branches
  //         ? branchToTreeViewDataItem(branch.branches)
  //         : undefined,
  //       defaultExpanded: true,
  //     };
  //     return result;
  //   });
  // };

  if (isFetching) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  return (
    <>
      <Table aria-label='CVEs table' variant='compact'>
        <Thead>
          <Tr>
            <Th>CVE ID</Th>
            <Th>Title</Th>
            <Th>Discovery</Th>
            <Th>Release</Th>
            <Th>Score</Th>
            <Th>CWE</Th>
            <Th>Products</Th>
          </Tr>
        </Thead>
        <Tbody>
          {result?.vulnerabilities.map((vulnerability) => (
            <Tr key={vulnerability.cve}>
              <Td>{vulnerability.cve}</Td>
              <Td>{vulnerability.title}</Td>
              <Td>{vulnerability.discovery_date}</Td>
              <Td>{vulnerability.release_date}</Td>
              <Td>
                {vulnerability.scores
                  .flatMap((item) => item.cvss_v3)
                  .map((item, index) => (
                    <Label
                      key={index}
                      {...baseSeverityList[item.baseSeverity].labelProps}
                    >
                      {item.baseScore}
                    </Label>
                  ))}
              </Td>
              <Td>
                {vulnerability.cwe ? (
                  <Tooltip content={vulnerability.cwe.name}>
                    <span>{vulnerability.cwe.id}</span>
                  </Tooltip>
                ) : (
                  'N/A'
                )}
              </Td>
              <Td>
                <DescriptionList>
                  {Object.entries(vulnerability.product_status).map(
                    ([key, value]) => (
                      <DescriptionListGroup key={key}>
                        <DescriptionListTerm>{key}</DescriptionListTerm>
                        <DescriptionListDescription>
                          <List>
                            {value.map((item, index) => (
                              <ListItem key={index}>{item}</ListItem>
                            ))}
                          </List>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    ),
                  )}
                </DescriptionList>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
