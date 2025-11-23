"use client";
import { EntityContainer, EntityHeaders } from "@/components/entity-components";
import {
  useCreateWorkflows,
  useSuspenceWorkflows,
} from "../hooks/user-workflows";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";

export const WorkflowsList = () => {
  const workflows = useSuspenceWorkflows();
  return (
    <div className="flex-1 flex justify-center items-center">
      <p>{JSON.stringify(workflows.data, null, 2)} </p>
    </div>
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflows();
  const router = useRouter();
  const { handelError, modal } = useUpgradeModel();
  const handelCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handelError(error);
      },
    });
  };
  return (
    <>
      {modal}
      <EntityHeaders
        title="workflows"
        description="Create and mange your workflows"
        onNew={handelCreate}
        newButtonLabel="New workflows"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowsContain = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
