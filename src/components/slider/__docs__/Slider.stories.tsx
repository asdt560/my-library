import type { Meta, StoryObj } from "@storybook/react";
import Example from "./Example";
import { userEvent, within, expect } from "@storybook/test";

const meta: Meta<typeof Example> = {
  title: "Slider",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Primary: Story = {
  args: {
    max: 100,
    min: 0,
    step: 0.01,
  },
};

export const Test: Story = {
  args: {
    max: 100,
    min: 0,
    step: 0.01,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};
