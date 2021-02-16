import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions/dist/preview/action';
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Changed value editable span '
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value to editable span'
        }
    },


} as Meta;

const Template: Story<EditableSpanPropsType>= (args) => <EditableSpan {...args} />;

export const EditableSpanStoryExample = Template.bind({});
EditableSpanStoryExample.args = {
    onChangeTitle: action('Value was changed')
}