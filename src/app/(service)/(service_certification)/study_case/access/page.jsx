import { Suspense } from "react";
import Access from "./Access"

export default function AccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Access />
    </Suspense>
  );
}