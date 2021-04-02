// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// This component renders the help cards shown below the survey

import * as React from 'react';
import { useId } from '@fluentui/react-hooks';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  IconButton,
  IIconProps,
} from '@fluentui/react';
import { surveyModel } from '../App'
import { ConditionRunner } from 'survey-react'

interface HelpProps {
  name: string,
  examples: Array<any>
  show: boolean,
  onClose: () => void
}

const cancelIcon: IIconProps = { iconName: 'Cancel' };

function filterExamples(examples: Array<any>) {
  if (surveyModel) {
    const values = surveyModel.getAllValues();
    const properties = surveyModel.getFilteredProperties();
    return examples.filter(ex => new ConditionRunner(ex.visibleIf ?? "true").run(values, properties));
  } else {
    console.log("Could not filter examples because surveyModel is null");
    return examples;
  }
}

export const HelpDialog: React.FunctionComponent<HelpProps> = ({ name, examples, show, onClose }) => {

  // Use useId() to ensure that the IDs are unique on the page.
  const titleId = useId('title');

  const visibleExamples = filterExamples(examples);
  console.debug(`Filtered ${visibleExamples.length} visible examples out of ${examples.length} total examples for help=${name}`);
  const body = visibleExamples?.map((example, i) => {
    return (
      <>
        <h5>{example.name}</h5>
        <div dangerouslySetInnerHTML={{ __html: example.details }}></div>
        {i < visibleExamples.length-1 ? (<hr style={{ width: "100%", marginTop: "1.5em", marginBottom: "1.5em" }}/>) : null}
      </>
    )
  });

  return (
    <div>
      <Modal
        titleAriaId={titleId}
        isOpen={show}
        onDismiss={onClose}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
          <span id={titleId}>{name} - Examples</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={onClose}
          />
        </div>
        <div className={contentStyles.body}>
          {body}
        </div>
      </Modal>
    </div>
  );
};

// Fluent UI theme setup
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

export default HelpDialog;