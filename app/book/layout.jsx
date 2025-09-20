import { Suspense } from "react";
import BookLayoutClient from "./BookLayoutClient";

export default function BookLayout({ children }) {
  return (
    <Suspense>
      <BookLayoutClient>{children}</BookLayoutClient>
    </Suspense>
  );
}
