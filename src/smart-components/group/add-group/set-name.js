import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stack, StackItem } from '@patternfly/react-core';
import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import { TextInput } from '@patternfly/react-core/dist/esm/components/TextInput/TextInput';
import { TextArea } from '@patternfly/react-core/dist/esm/components/TextArea/TextArea';
import { FormGroup } from '@patternfly/react-core/dist/esm/components/Form/FormGroup';
import { debouncedAsyncValidator } from '../validators';

const groupNameValidated = (groupName, groupNameError) => (groupName === undefined || groupNameError ? 'error' : 'default');
const groupDescriptionValidated = (groupDescription) => (groupDescription?.length > 150 ? 'error' : 'default');

const SetName = (props) => {
  const { input } = useFieldApi(props);
  const formOptions = useFormApi();
  const { 'group-name': name, 'group-description': description } = formOptions.getState().values;
  const [groupName, setGroupName] = useState(name || '');
  const [groupNameError, setGroupNameError] = useState();
  const [groupDescription, setGroupDescription] = useState(description);

  const processGroupName = (value) => {
    input.onChange(undefined);
    debouncedAsyncValidator(value)
      .then(() => {
        input.onChange(value);
        setGroupNameError(undefined);
      })
      .catch((error) => {
        setGroupNameError(error);
      });
    setGroupName(value);
  };

  useEffect(() => {
    groupName?.length > 0 && processGroupName(groupName);
  }, []);

  return (
    <Stack hasGutter>
      <StackItem className="rbac-c-summary">
        <FormGroup
          label="Group name"
          helperTextInvalid={groupName ? groupNameError : 'Required'}
          isRequired
          validated={groupNameValidated(groupName, groupNameError)}
        >
          <TextInput
            value={groupName}
            type="text"
            validated={groupNameValidated(groupName, groupNameError)}
            onBlur={() => groupName === '' && setGroupName(undefined)}
            onChange={(value) => processGroupName(value)}
            aria-label="Group name"
          />
        </FormGroup>
      </StackItem>
      <StackItem>
        <FormGroup
          label="Group description"
          helperTextInvalid="Can have maximum of 150 characters."
          validated={groupDescriptionValidated(groupDescription)}
        >
          <TextArea
            value={groupDescription}
            validated={groupDescriptionValidated(groupDescription)}
            onChange={(value) => {
              setGroupDescription(value);
              formOptions.change('group-description', value);
            }}
            aria-label="Group description"
            resizeOrientation="vertical"
          />
        </FormGroup>
      </StackItem>
    </Stack>
  );
};

SetName.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  groups: PropTypes.array,
};

export default SetName;
