import ClayMorphism from "@/components/templates/ClayMorphism";
import { MOCK_PORTFOLIO } from "@/lib/mock-portfolio";

export default function Page() {
  return <ClayMorphism portfolio={MOCK_PORTFOLIO} />;
}