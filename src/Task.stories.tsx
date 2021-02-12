import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {Task, TaskPropsType} from "./Task";
import { action } from '@storybook/addon-actions/dist/preview/action';

export default {
  title: 'Todolist/Task',
  component: Task
} as Meta;

const Template: Story<TaskPropsType>= (args) => <Task {...args} />;


    const changeTaskStatus = action('Task status was changed inside task')
    const removeTask = action('Remove button was clicked inside task')
    const onChangeTaskTitle = action('Task title was changed inside task')

const baseArgs = {
     changeTaskStatus,
     removeTask,
     onChangeTaskTitle,
}


export const TaskIsDoneStoryExample = Template.bind({});
TaskIsDoneStoryExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'Html' },
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneStoryExample = Template.bind({});
TaskIsNotDoneStoryExample.args = {
    ...baseArgs,
    task: {id: '2', isDone: false, title: 'CSS' },
    todolistId: 'todolistId2'
}