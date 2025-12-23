import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Textarea } from "../../../components/ui/textarea";
import type { OcorrenciaInfoDTO } from "../../../interface/interface";
import { api } from "../../../lib/api";
import { cn, handleError } from "../../../lib/utils";
interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ocoId: number;
  onSaveSuccess: (newData: OcorrenciaInfoDTO) => void;
}

const DialogDetailsCard = ({
  isOpen,
  onOpenChange,
  ocoId,
  onSaveSuccess,
}: LoginDialogProps) => {
  const formSchema = z.object({
    informacao: z.string().min(5, {
      message: "Mensagem deve ter pelo menos 5 caracteres.",
    }),
    data: z.date({
      message: "Por favor, selecione uma data",
    }),
    files: z
      .array(z.instanceof(File))
      .max(
        2,
        "Você só pode enviar até 2 arquivos, se possui mais de um arquivo word ou pdf, tente juntar todos em um arquivo só para enviar somente ele.",
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      informacao: "",
      data: undefined,
      files: [],
    },
  });

  const [openCalendar, setOpenCalendar] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      const params = new URLSearchParams({
        informacao: values.informacao,
        data: values.data.toISOString().split("T")[0],
        ocoId: ocoId.toString(),
      });

      if (values.files && values.files.length > 0) {
        values.files.forEach((file: File) => {
          formData.append("files", file);
        });
      }

      const response = await api.post(
        `/ocorrencias/informacoes-desaparecido?${params.toString()}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      onSaveSuccess(response.data);

      onOpenChange(false);
      form.reset();
      toast.success("Informação adicionada com sucesso!");
    } catch (error) {
      handleError(error);
      toast.error(
        "Erro interno no servidor. Verifique se os arquivos não são muito grandes ou estão em formato inválido.",
      );
      console.error("Erro inesperado:", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
        onOpenChange(open);
      }}
    >
      <Button className="cursor-pointer" variant="default" size="lg" asChild>
        <DialogTrigger>Adicionar mais informações</DialogTrigger>
      </Button>
      <DialogContent data-testid="dialog" className="max-w-fit">
        <DialogHeader className="text-left">
          <DialogTitle>Adicionar Informações</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar informações adicionais.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data do ocorrido</FormLabel>
                  <FormControl>
                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          data-testid="data-input"
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpenCalendar(false);
                          }}
                          locale={ptBR}
                          disabled={{ after: new Date() }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="informacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informações relevantes do ocorrido</FormLabel>
                  <FormControl>
                    <Textarea
                      data-testid="info-input"
                      className="pl-4 text-sm"
                      placeholder="Descreva detalhadamente as circunstâncias do desaparecimento, características físicas, vestimentas e qualquer informação que possa ajudar na localização."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="files"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Anexos (Opcional)</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="files-input"
                      {...fieldProps}
                      type="file"
                      multiple
                      accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(event) => {
                        if (event.target.files) {
                          onChange(Array.from(event.target.files));
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    O limite é de 2 arquivos por vez. <br />
                    Aceitamos arquivos de imagem (JPEG, PNG, etc.), documentos
                    (.doc, .docx e PDFs.)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-col gap-3 md:justify-between">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetailsCard;
