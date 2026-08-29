"use client";

import "./threeui-background.css";
import {
  EmeraldHorizonBackground,
  type EmeraldHorizonBackgroundProps,
} from "./emerald-horizon/EmeraldHorizonBackground";

/**
 * The `<StructureFlowCollection />` entry point from the configured usage.
 *
 * The collection dispatches on `variant`; only "emerald-horizon" is registered
 * here, since that is the variant this project installed. Adding another means
 * fetching its own registered bundle rather than guessing at its shaders.
 */
export type StructureFlowVariant = "emerald-horizon";

export type StructureFlowCollectionProps = EmeraldHorizonBackgroundProps & {
  variant: StructureFlowVariant;
};

export function StructureFlowCollection({
  variant,
  ...props
}: StructureFlowCollectionProps) {
  switch (variant) {
    case "emerald-horizon":
    default:
      return <EmeraldHorizonBackground {...props} />;
  }
}
