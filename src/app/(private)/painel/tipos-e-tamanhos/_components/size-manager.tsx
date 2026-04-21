"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SizeGroup } from "@/@types/Size";
import { FormModal } from "@/components/form-modal";
import { SizeGroupFormData } from "../_validation/size-group.schema";
import { createSizeGroup } from "../_actions/create-size-group";
import { SizeFormData } from "../_validation/size.schema";
import { SizeGroupForm } from "./size-group-form";
import { List } from "@/components/list";
import { SizeGroupItem } from "./size-group-item";
import { SizeForm } from "./size-form";
import { SizeItem } from "./size-item";
import { createSize } from "../_actions/create-size";
import { EmptySizeGroup } from "./empty-size-group";

interface SizeManagerProps {
  sizeGroups: SizeGroup[];
}
export function SizeManager({ sizeGroups }: SizeManagerProps) {
  const [openModalGroup, setOpenModalGroup] = useState<boolean>(false);
  const [openModalSize, setOpenModalSize] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<string | undefined>(
    sizeGroups[0]?.id,
  );
  const selectedGroup =
    sizeGroups.find((g) => g.id === selectedId) || sizeGroups[0];

  async function onLinkSizeGroup(data: SizeGroupFormData) {
    const result = await createSizeGroup(data);
    if (result.success) {
      setOpenModalGroup(false);
      setSelectedId(result.data.id);
      toast.success(`Grupo "${result.data.name}" criado.`);
    } else {
      toast.error(result.error || "Erro ao criar grupo.");
    }
  }

  async function onLinkSize(data: SizeFormData) {
    const result = await createSize(data);
    if (result.success) {
      setOpenModalSize(false);
      toast.success("Tamanho adicionado com sucesso.");
    } else {
      toast.error(result.error || "Erro ao adicionar tamanho.");
    }
  }

  if (!selectedId)
    return (
      <FormModal
        title="Novo tipo de produto"
        open={openModalGroup}
        onOpenChange={setOpenModalGroup}
        trigger={<EmptySizeGroup onAction={() => setOpenModalGroup(true)} />}
      >
        <SizeGroupForm onSubmit={onLinkSizeGroup} submitText="Salvar" />
      </FormModal>
    );
  return (
    <div className="flex">
      <section className="flex flex-col sm:max-w-3xs sm:w-full w-fit p-2 gap-2">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-lg font-semibold">Tipos de Produto</h2>

          <FormModal
            title="Novo tipo de produto"
            open={openModalGroup}
            onOpenChange={setOpenModalGroup}
            trigger={
              <Button variant={"link"} size={"icon-sm"}>
                <Plus />
              </Button>
            }
          >
            <SizeGroupForm onSubmit={onLinkSizeGroup} submitText="Salvar" />
          </FormModal>
        </div>
        <div className="flex flex-col gap-2">
          <List
            items={sizeGroups}
            keyExtractor={({ id }) => id}
            renderItem={(item) => (
              <SizeGroupItem
                sizeGroup={item}
                isSelected={selectedGroup.id === item.id}
                onSelect={() => setSelectedId(item.id)}
              />
            )}
          />
        </div>
      </section>

      <section className="flex flex-col w-full p-2 gap-2">
        {selectedGroup && (
          <>
            <div className="flex w-full justify-between items-center">
              <h2 className="text-lg font-semibold text-primary">
                {selectedGroup.name}
              </h2>
              <div className="w-full sm:w-fit">
                <FormModal
                  title="Novo tamanho"
                  open={openModalSize}
                  onOpenChange={setOpenModalSize}
                  trigger={
                    <Button size={"sm"}>
                      <Plus /> Adicionar Tamanho
                    </Button>
                  }
                >
                  <SizeForm
                    selectedSizeGroup={selectedGroup}
                    onSubmit={onLinkSize}
                    submitText="Salvar"
                    sizeGroups={sizeGroups}
                  />
                </FormModal>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <List
                items={selectedGroup.sizes}
                keyExtractor={({ id }) => id}
                renderItem={(item) => <SizeItem size={item} />}
                emptyComponent={
                  <p className="text-sm text-foreground/70 py-2">
                    Este tipo de produto ainda não possui tamanhos.
                  </p>
                }
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
