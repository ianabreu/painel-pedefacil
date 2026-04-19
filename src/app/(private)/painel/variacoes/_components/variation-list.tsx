"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Variation } from "@/@types/Variation";
import { useState } from "react";
import { VariationOption } from "./variation-option";
import { VariationRow } from "./variation-row";
import { VariationForm } from "./variation-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VariationFormData } from "../_validation/variation.schema";
import { createVariation } from "../_actions/create-variation";
import { toast } from "sonner";
import { VariationOptionForm } from "./variation-option-form";
import { VariationOptionFormData } from "../_validation/variation-option.schema";
import { createVariationOption } from "../_actions/create-variation-option";

interface VariationListProps {
  variations: Variation[];
}
export function VariationList({ variations }: VariationListProps) {
  const [openModalType, setOpenModalType] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation>(
    variations[0],
  );
  function handleSelectVariation(id: string) {
    if (variations.length === 0) return;
    const filtredList = variations.filter((item) => item.id === id);
    if (filtredList.length === 0) return;
    setSelectedVariation(filtredList[0]);
  }
  async function handleCreateVariationType(data: VariationFormData) {
    const result = await createVariation(data);
    if (result.success) {
      setOpenModalType(false);
      toast.success(`Variação "${result.data.name}" criada com sucesso`);
    } else {
      toast.error(`Erro ao criar variação.`);
    }
  }
  async function handleCreateVariationOption(data: VariationOptionFormData) {
    const result = await createVariationOption(data);
    if (result.success) {
      setOpenModalType(false);
      toast.success(`Opção "${result.data.description}" criada com sucesso`);
    } else {
      toast.error(result.error || `Erro ao criar opção de variação.`);
    }
  }

  return (
    <div className="flex">
      <div className="flex flex-col sm:max-w-3xs sm:w-full w-fit p-2 gap-2">
        <div className="flex w-full justify-between">
          <h2 className="text-xl font-semibold">Tipos</h2>

          <Dialog open={openModalType} onOpenChange={setOpenModalType}>
            <DialogTrigger asChild>
              <Button variant={"link"} size={"icon"}>
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Novo Tipo</DialogTitle>
              </DialogHeader>
              <VariationForm
                onSubmit={handleCreateVariationType}
                submitText="Salvar"
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-2">
          {variations.length > 0 &&
            variations.map((item, index) => (
              <VariationRow
                onClick={handleSelectVariation}
                key={index}
                selected={item.id === selectedVariation.id}
                variation={item}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col w-full p-2 gap-2">
        <div className="flex w-full justify-between">
          <h2 className="text-xl font-semibold">{selectedVariation.name}</h2>
          <div className="w-full sm:w-fit">
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"}>
                  <Plus /> Adicionar Variação
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle>Novo Tipo</DialogTitle>
                </DialogHeader>
                <VariationOptionForm
                  onSubmit={handleCreateVariationOption}
                  submitText="Salvar"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/*Lista*/}
          {selectedVariation.variations.length > 0 &&
            selectedVariation.variations.map((item, index) => (
              <VariationOption onClick={() => {}} key={index} option={item} />
            ))}
        </div>
      </div>
    </div>
  );
}
