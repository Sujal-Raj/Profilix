import SwissStyle from "@/components/templates/SwissStyle";
import { MOCK_PORTFOLIO } from "@/lib/mock-portfolio";

export default function Page() {
  return <SwissStyle portfolio={MOCK_PORTFOLIO} />;
}