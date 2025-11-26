"use client";
import {
  EmptyView,
  EntityContainer,
  EntityHeaders,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import { formatDistanceToNow } from "date-fns";
import {
  useCreateWorkflows,
  useRemoveWorkflow,
  useSuspenceWorkflows,
} from "../hooks/user-workflows";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { UseEntitySearch } from "@/hooks/use-entity-search";
import type { Workflow } from "@/generated/prisma/client";
import { WorkflowIcon } from "lucide-react";
export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = UseEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search workflows"
    />
  );
};
export const WorkflowsList = () => {
  const workflows = useSuspenceWorkflows();

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItems={(workflow) => <WorkflowItem data={workflow} />}
      emptyView={<WorkflowEmpty />}
    />
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
export const WorkflowsPagination = () => {
  const workflows = useSuspenceWorkflows();
  const [params, setParams] = useWorkflowsParams();
  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
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
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};

export const WorkflowsLoading = () => {
  return <LoadingView message="Loadding workflows..." />;
};
export const WorkflowsError = () => {
  return <ErrorView message=" Error Loadding workflows..." />;
};

export const WorkflowEmpty = () => {
  const createWorkflow = useCreateWorkflows();
  const router = useRouter();
  const { handelError, modal } = useUpgradeModel();
  const handelCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handelError(error);
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
    });
  };
  return (
    <>
      {modal}
      <EmptyView
        onNew={handelCreate}
        message="you haven't created any workflows yet.Get started by creating your first workflow"
      />
    </>
  );
};

export const WorkflowItem = ({ data }: { data: Workflow }) => {
  const removeWorkflow = useRemoveWorkflow();
  const handleRemove = () => {
    removeWorkflow.mutate({ id: data.id });
  };
  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}
          {""}
          &bull; Created{""}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
