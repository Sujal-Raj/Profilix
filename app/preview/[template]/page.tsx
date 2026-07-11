import { notFound } from "next/navigation";
import { TEMPLATE_REGISTRY } from "@/lib/template-registry";
import { MOCK_PORTFOLIO } from "@/lib/mock-portfolio";


export default async function PreviewPage({
    params,
}: {
    params: Promise<{ template: string }>;
}) {
    const { template } = await params;

    const TemplateComponent =
        TEMPLATE_REGISTRY[template as keyof typeof TEMPLATE_REGISTRY];

    if (!TemplateComponent) {
        notFound();
    }

    return <TemplateComponent portfolio={MOCK_PORTFOLIO} />;
}