import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { FaRegCircleCheck } from "react-icons/fa6";
import React from "react"
import { TiDelete } from "react-icons/ti";
import { ETypeStatus } from "@/enums/GenericData"
import { TbProgressCheck } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import { Button } from "../ui/button"
import type { ITaskComponent } from "@/models/interfaces/ITask"

const TasksComponent = (props: ITaskComponent) => {
    const [title, setTitle] = React.useState<string>(props.title ?? '');
    const [description, setDescription] = React.useState<string>(props.description ?? '')
    const [category, setCategory] = React.useState<string>('')
    const [status, setStatus] = React.useState<string>(props.status ?? '');
    const [priority, setPriority] = React.useState<string>('');

    return (
        <div className="flex flex-col">
            <Card className="max-w-80 flex flex-col p-6 rounded-2xl gap-4 bg-card">
                <div className="w-full flex flex-row justify-between gap-14 relative">
                    <div className="w-full flex flex-col gap-2">
                        <Label className="text-white" htmlFor="Título">Título</Label>
                        <Input id="Título" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} value={title} className=" text-white placeholder:text-white w-full" />
                    </div>
                    <div data-testid="delete-icon-button" onClick={() => props.onDelete(props.id)} className="absolute -top-4 -right-4 cursor-pointer">
                        <TiDelete color="white" size={29} />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Label className="text-white" htmlFor="Descrição">Descrição</Label>
                    <Textarea id="Descrição" className="max-h-7 text-white placeholder:text-white" name="description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
                </div>
                <div className="flex flex-row flex-wrap gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-white" htmlFor="category">Categoria</Label>
                        <Select value={category && category != props.category ? category : props.category} onValueChange={(value: string) => setCategory(value)}>
                            <SelectTrigger className="w-full text-white">
                                <SelectValue placeholder="Selecione uma opçao" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Selecione</SelectLabel>
                                    <SelectItem value="Pessoal">Pessoal</SelectItem>
                                    <SelectItem value="Trabalho">Trabalho</SelectItem>
                                    <SelectItem value="Estudo">Estudo</SelectItem>
                                    <SelectItem value="Finanças">Finanças</SelectItem>
                                    <SelectItem value="Tarefas domésticas">Tarefas Domésticas</SelectItem>
                                    <SelectItem value="Viagem">Viagem</SelectItem>
                                    <SelectItem value="Outros">Outros</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-white" htmlFor="priority">Prioridade</Label>
                        <Select value={priority && priority != props.priority ? priority : props.priority} onValueChange={(value: string) => setPriority(value)}>
                            <SelectTrigger className="w-full text-white">
                                <SelectValue placeholder="Selecione uma opçao" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Selecione</SelectLabel>
                                    <SelectItem value="Alta">Alta</SelectItem>
                                    <SelectItem value="Média">Média</SelectItem>
                                    <SelectItem value="Baixa">Baixa</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex">
                        <RadioGroup onValueChange={(value: string) => setStatus(value)} defaultValue={props.status} className="flex flex-row flex-wrap text-white">
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="Pendente" id="r1" color="white" />
                                <Label className="text-white" htmlFor="r1">Pendente</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="Em Progresso" id="r2" color="white" />
                                <Label className="text-white" htmlFor="r2">Em Progresso</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="Concluído" id="r3" color="white" />
                                <Label className="text-white" htmlFor="r3">Concluído</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                 <Button onClick={() => props.onPut(props.id, {
                    title: title && title != props.title ? title : props.title,
                    description: description && description != props.description ? description : props.description,
                    category: category && category != props.category ? category : props.category,
                    priority: priority && priority != props.priority ? priority : props.priority,
                    status: status && status != props.status ? status : props.status,
                    id: props.id,
                    refUser: props.refUser
                })} className="w-full h-10 flex items-center justify-center cursor-pointer bg-white text-card hover:opacity-80 hover:bg-white">
                    Salvar
                </Button>
            </Card>
            <div className="flex flex-row gap-4 items-center justify-center">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center">
                    {status == ETypeStatus.COMPLETED ? (<FaRegCircleCheck data-testid="icon-completed" color="green" size={23} />) : null}
                    {status == ETypeStatus.IN_PROGRESS ? (<TbProgressCheck data-testid="icon-in-progress" color="white" size={23} />) : null}
                    {status == ETypeStatus.PENDING ? (<MdPendingActions data-testid="icon-pending" color="yellow" size={23} />) : null}
                </div>
               
            </div>
        </div>
    )
}

export default TasksComponent