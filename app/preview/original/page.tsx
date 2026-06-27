import OriginalTemplate from "@/components/templates/Original";
import { MOCK_PORTFOLIO } from "@/lib/mock-portfolio";

export default function Page() {
  return <OriginalTemplate portfolio={MOCK_PORTFOLIO} />;
}