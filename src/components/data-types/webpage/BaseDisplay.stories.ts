// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// TODO: storybook not completed 
import type { Story } from 'storybook/vue'
import BaseDisplay from './BaseDisplay.vue'

export default {
  title: 'DataType/webpage',
  component: BaseDisplay,
  argTypes: {
    dataObject: {
      control: { type: 'object' },
    },
  },
}

const Template: Story = (args: any, { argTypes }: any) => ({
  props: Object.keys(argTypes),
  components: { BaseDisplay },
  template: '<BaseDisplay v-bind="$props" />',
})

export const Wiki = Template.bind({})
Wiki.args = {
  dataObject: { value: 'https://commons.wikimedia.org/wiki/File:Nightingale-mortality.jpg' },
}
