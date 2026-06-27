import MinimalTemplate from "@/components/templates/Minimal";
import { MOCK_PORTFOLIO } from "@/lib/mock-portfolio";

export default function Page() {
  return <MinimalTemplate portfolio={MOCK_PORTFOLIO} />;
}