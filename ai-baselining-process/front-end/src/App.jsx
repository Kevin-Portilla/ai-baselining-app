import { useMemo, useState } from "react";

import { initialForm } from "@/data/formConfig";
import { getCurrentSection, calculateLevel } from "@/logic/maturity";

import { Header } from "@/components/Header";
import { ViewNav } from "@/components/ViewNav";
import { SurveyView } from "@/views/SurveyView";
import { DashboardView } from "@/views/DashboardView";

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [activeView, setActiveView] = useState("survey");

  const currentSection = useMemo(() => getCurrentSection(form), [form]);
  const recommendedLevel = useMemo(() => calculateLevel(form), [form]);

  const completion = useMemo(() => {
    const fields = [
      form.tribe,
      form.role,
      form.processName,
      form.aiUsage,
      form.processDescription,
      form.frequency,
      form.criticality,

      form.processType,
      form.clientData,
      form.mainSystems,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  const arr = (v) => (Array.isArray(v) ? v : []);
  const domainActive = useMemo(() => ({
    clientCentric: !!(arr(form.ccaAlignPrioritiesL0).length || arr(form.ccaAlignPrioritiesL1).length || arr(form.ccaAlignPrioritiesL2).length || arr(form.ccaAlignPrioritiesL3).length || arr(form.ccaAlignPrioritiesL4).length || arr(form.ccaIdentifyOppsL0).length || arr(form.ccaIdentifyOppsL1).length || arr(form.ccaIdentifyOppsL2).length || arr(form.ccaIdentifyOppsL3).length || arr(form.ccaIdentifyOppsL4).length || arr(form.ccaCodesignL0).length || arr(form.ccaCodesignL1).length || arr(form.ccaCodesignL2).length || arr(form.ccaCodesignL3).length || arr(form.ccaCodesignL4).length || arr(form.ccaIpAssetsL0).length || arr(form.ccaIpAssetsL1).length || arr(form.ccaIpAssetsL2).length || arr(form.ccaIpAssetsL3).length || arr(form.ccaIpAssetsL4).length || arr(form.ccaDeliveryL0).length || arr(form.ccaDeliveryL1).length || arr(form.ccaDeliveryL2).length || arr(form.ccaDeliveryL3).length || arr(form.ccaDeliveryL4).length),
    operatingModel: !!(arr(form.omtBarriersL0).length || arr(form.omtBaselineL0).length || arr(form.omtGovernanceL0).length || arr(form.omtSecureL0).length || arr(form.omtAutoWorkflowsL0).length || arr(form.omtPerformanceL0).length || arr(form.omtPlatformsL0).length || arr(form.omtTribesL0).length || arr(form.omtToolsUsedL1).length || arr(form.omtStandardL1).length || arr(form.omtBaselineL1).length || arr(form.omtGovernanceL1).length || arr(form.omtSecureL1).length || arr(form.omtStandardL2).length || arr(form.omtBaselineL2).length || arr(form.omtGovernanceL2).length || arr(form.omtAutoWorkflowsL2).length || arr(form.omtPerformanceL2).length || arr(form.omtReusableAssetsL2).length || arr(form.omtStandardL3).length || arr(form.omtGovernanceL3).length || arr(form.omtConnectedSystemsL3).length || arr(form.omtAutoWorkflowsL3).length || arr(form.omtPerformanceL3).length || arr(form.omtTechCapL4).length || arr(form.omtGovernanceL4).length || arr(form.omtAutoWorkflowsL4).length),
    people: !!(form.aiAwareness || arr(form.adoptionBarriers).length || form.aiLiteracy || arr(form.broaderAdoptionBarriers).length || form.automationMaturity || form.evaluatingQuality || arr(form.remainingBarriersL2).length || form.operationalAiCapability || form.limitationsRiskEval || form.preparednessAdaptive || form.improvingAiDecisions),
  }), [form]);


  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

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
