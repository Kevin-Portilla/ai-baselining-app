import { useMemo, useState } from "react";

import { initialForm } from "@/data/formConfig";
import { getDirectorByTribe, getServicesProductsByTribe } from "@/data/aiBaselineCatalog";
import { getCurrentSection, calculateLevel, computeDomainActive } from "@/logic/maturity";
import { computeAssessmentCompletion } from "@/logic/assessmentTarget";

import { Header } from "@/components/Header";
import { ViewNav } from "@/components/ViewNav";
import { SurveyView } from "@/views/SurveyView";
import { DashboardView } from "@/views/DashboardView";

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [activeView, setActiveView] = useState("survey");

  const currentSection = useMemo(() => getCurrentSection(form), [form]);
  const recommendedLevel = useMemo(() => calculateLevel(form), [form]);

  const completion = useMemo(() => computeAssessmentCompletion(form), [form]);

  const domainActive = useMemo(() => computeDomainActive(form), [form]);


  const updateField = (field, value) =>
    setForm((prev) => {
      if (field !== "tribe") {
        return { ...prev, [field]: value };
      }

      const serviceProductOptions = getServicesProductsByTribe(value);
      const serviceProduct = serviceProductOptions.includes(prev.serviceProduct)
        ? prev.serviceProduct
        : "";

      return {
        ...prev,
        tribe: value,
        director: getDirectorByTribe(value),
        serviceProduct,
      };
    });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#020617" }}>
      <Header completion={completion} />
      <ViewNav activeView={activeView} onViewChange={setActiveView} />

      {activeView === "survey" ? (
        <SurveyView
          form={form}
          updateField={updateField}
          currentSection={currentSection}
          recommendedLevel={recommendedLevel}
          domainActive={domainActive}
        />
      ) : (
        <DashboardView
          form={form}
          recommendedLevel={recommendedLevel}
          currentSection={currentSection}
          completion={completion}
        />
      )}
    </div>
  );
}
