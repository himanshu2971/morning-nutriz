// // src/components/ui/Container.tsx
// import type { ReactNode } from "react";

// export function Container({ children }: { children: ReactNode }) {
//   return <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">{children}</div>;
// }


// src/components/ui/Container.tsx
// src/components/ui/Container.tsx
import type { ReactNode } from "react";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
  fluid = false,
}: {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
}) {
  return (
    <div
      className={cx(
        "w-full px-4 sm:px-6 lg:px-10",
        fluid ? "mx-0 max-w-none" : "mx-auto max-w-[1440px]",
        className
      )}
    >
      {children}
    </div>
  );
}

