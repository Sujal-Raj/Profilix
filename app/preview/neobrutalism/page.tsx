import NeoBrutalism from "@/components/templates/NeoBrutalism";
import { MOCK_PORTFOLIO } from "@/lib/mock-portfolio";

export default function Page() {
  return <NeoBrutalism portfolio={MOCK_PORTFOLIO} />;
}