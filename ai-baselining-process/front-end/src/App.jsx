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
      form.evidence,
      form.processType,
      form.clientData,
      form.mainSystems,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  const domainActive = useMemo(() => ({
    clientCentric: !!(
      form.ccaAlignPrioritiesL0 || form.ccaAlignPrioritiesL1 || form.ccaAlignPrioritiesL2 || form.ccaAlignPrioritiesL3 || form.ccaAlignPrioritiesL4 ||
      form.ccaIdentifyOppsL0 || form.ccaIdentifyOppsL1 || form.ccaIdentifyOppsL2 || form.ccaIdentifyOppsL3 || form.ccaIdentifyOppsL4 ||
      form.ccaCodesignL0 || form.ccaCodesignL1 || form.ccaCodesignL2 || form.ccaCodesignL3 || form.ccaCodesignL4 ||
      form.ccaIpAssetsL0 || form.ccaIpAssetsL1 || form.ccaIpAssetsL2 || form.ccaIpAssetsL3 || form.ccaIpAssetsL4 ||
      form.ccaInfiniteLedL0 || form.ccaInfiniteLedL1 || form.ccaInfiniteLedL2 || form.ccaInfiniteLedL3 || form.ccaInfiniteLedL4 ||
      form.ccaAiDeliveryL0 || form.ccaAiDeliveryL1 || form.ccaAiDeliveryL2 || form.ccaAiDeliveryL3 || form.ccaAiDeliveryL4 ||
      form.ccaGovControlsL0 || form.ccaGovControlsL1 || form.ccaGovControlsL2 || form.ccaGovControlsL3 || form.ccaGovControlsL4 ||
      form.ccaToolingL0 || form.ccaToolingL1 || form.ccaToolingL2 || form.ccaToolingL3 || form.ccaToolingL4 ||
      form.ccaRolesOpsL0 || form.ccaRolesOpsL1 || form.ccaRolesOpsL2 || form.ccaRolesOpsL3 || form.ccaRolesOpsL4
    ),
    operatingModel: !!(form.outputValidationL1 || form.aiToolsUsed.length || form.infoSecurityClearance || form.governanceRisksL1.length || form.aiGovernanceL2 || form.sensitiveDataHandling || form.consistentValidation || form.reusableAssetsL2.length || form.measurableImpactL2 || form.connectedSystems.length || form.governanceControlsL3.length || form.auditableOutputs || form.riskManagementL3 || form.approvalCriteria || form.reusableCapabilitiesL3.length || form.environmentReliability || form.impactMetricsL3.length || form.performanceMonitoringL3 || form.missingForAdaptive.length || form.advancedTechCapabilities.length || form.humanOversightRequired.length || form.advancedGovernanceL4.length || form.continuousMonitoringL4 || form.humanOverrideMechanism || form.escalationPathsL4 || form.platformAdaptivity),
    people: !!(form.aiAwareness || form.adoptionBarriers.length || form.aiLiteracy || form.broaderAdoptionBarriers.length || form.automationMaturity || form.evaluatingQuality || form.remainingBarriersL2.length || form.operationalAiCapability || form.limitationsRiskEval || form.preparednessAdaptive || form.improvingAiDecisions),
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
