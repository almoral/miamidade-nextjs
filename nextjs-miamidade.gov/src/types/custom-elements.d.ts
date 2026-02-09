import type * as React from "react";

type MdcCardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    description?: string;
  },
  HTMLElement
>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ds-mdc-card": MdcCardProps;
    }
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "ds-mdc-card": MdcCardProps;
    }
  }
}

declare module "react/jsx-dev-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "ds-mdc-card": MdcCardProps;
    }
  }
}
