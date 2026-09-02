import type { CSSProperties } from "react";

/**
 * A handful of decorative elements (hero orbit dots, the animated map's
 * arrival pulses) are driven by inline CSS custom properties, exactly as
 * in the original templates (style="--r:150px; ..."). @types/react's
 * CSSProperties doesn't declare arbitrary `--foo` keys, so this widened
 * type is used at those call sites instead of sprinkling `any` around.
 */
export type CSSVars = CSSProperties & Record<string, string | number>;
