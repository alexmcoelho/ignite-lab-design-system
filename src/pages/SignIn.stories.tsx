import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from "msw";
import { SignIn } from "./SignIn";
import { setupServer } from "msw/node";

// beforeAll(() => {
//   // Establish requests interception layer before all tests.
//   server.listen();
// });
// afterAll(() => {
//   // Clean up after all tests are done, preventing this
//   // interception layer from affecting irrelevant tests.
//   server.close();
// });
// test("renders a book data", () => {
//   // Render components, perform requests, API communication is covered.
// });

export default {
  title: "Pages/Sign in",
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post("https://my-api.com/session", (req, res, ctx) => {
          return res(
            ctx.json({
              message: "Login realizado!",
            })
          );
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.type(
      canvas.getByPlaceholderText("Digite seu e-mail"),
      "alex@exemplo.com.br"
    );
    userEvent.type(canvas.getByPlaceholderText("********"), "12345678");

    userEvent.click(
      canvas.getByRole("button", { name: "Entrar na plataform" })
    );

    await waitFor(() => {
      expect(canvas.getByText("Login realizado!")).toBeInTheDocument();
    });
  },
};
