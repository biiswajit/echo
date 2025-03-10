import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button"; // Adjust the import path based on your project structure

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	argTypes: { onClick: { action: "clicked" } },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: "Primary Button", variant: "primary" } };

export const Secondary: Story = { args: { children: "Secondary Button", variant: "secondary" } };

export const Disabled: Story = { args: { children: "Disabled Button", disabled: true } };
