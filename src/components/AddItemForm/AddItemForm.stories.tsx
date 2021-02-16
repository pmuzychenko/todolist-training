import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from '@storybook/addon-actions/dist/preview/action';

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    onClick: {
        description: 'AddItemForm was clicked',
    }
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormStoryExample = Template.bind({});
AddItemFormStoryExample.args = {
    addItem: action('AddItemForm was clicked')
};