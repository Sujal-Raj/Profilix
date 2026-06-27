"use client";


import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


import { TEMPLATE_REGISTRY } from "@/lib/template-registry";


import PortfolioSkeleton from "@/components/portfolio/PortfolioSkeleton";


interface Portfolio {
  name: string;
  title?: string;
  about?: string;
  selectedTemplate?: string;
}


export default function PortfolioPage() {
  const { slug } = useParams<{ slug: string }>();


  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (slug) {
      const readable = slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());


      document.title = `${readable} | Digital Portfolio`;
    }
  }, [slug]);


  useEffect(() => {
    if (portfolio?.name) {
      document.title = `${portfolio.name} | Digital Portfolio`;
    }
  }, [portfolio]);


  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const res = await fetch(`/api/v1/user/${slug}`, {
          method: "GET",
          cache: "no-store",
        });


        const data = await res.json();


        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch portfolio");
        }


        setPortfolio(data.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load portfolio");
        }
      } finally {
        setLoading(false);
      }
    };


    getPortfolio();
  }, [slug]);


  if (loading) {
    return <PortfolioSkeleton />;
  }


  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>Portfolio Not Found</h1>
      </div>
    );
  }


  // Read Template
  const templateKey = portfolio.selectedTemplate || "original";


  // Load Template
  const Template =
    TEMPLATE_REGISTRY[
      portfolio.selectedTemplate
    ] ||
    TEMPLATE_REGISTRY.original;


  // Render
  return (
    <Template
      portfolio={portfolio}
    />
  );
}