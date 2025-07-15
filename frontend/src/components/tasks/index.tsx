import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import React from "react"

interface ITask {
    id: string,
    title: string,
    description: string,
    priority: string,
    category: string,
    status: string,
    refUser: string
}

interface ITaskComponent {
    id: string,
    key: string | number,
    title: string,
    description: string,
    category: string,
    refUser: string,
    status: string,
    priority: string,
    onDelete: (idTask: string) => void
    onPut: (idTask: string, task: ITask) => void
}

const TasksComponent = (props: ITaskComponent) => {
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('')
    const [category, setCategory] = React.useState<string>('')
    const [status, setStatus] = React.useState<string>('');
    const [priority, setPriority] = React.useState<string>('');

    return (
        <div className="flex flex-col gap-3">
            <Card className="flex flex-col p-6 rounded-2xl gap-4 w-80 bg-card">
                <div className="w-full flex flex-col gap-2">
                    <Label className="text-white" htmlFor="title">Título</Label>
                    <Input placeholder={props.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} className=" text-white placeholder:text-white" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Label className="text-white" htmlFor="description">Descrição</Label>
                    <Textarea placeholder={props.description} className="max-h-7 text-white placeholder:text-white" name="description" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
                </div>
                <div className="flex flex-row flex-wrap gap-4">
                    <div className="flex flex-col gap-2">
                        <Label className="text-white" htmlFor="category">Categoria</Label>
                        <Input placeholder={props.category} className="text-white placeholder:text-white" name="category" value={category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-white" htmlFor="priority">Prioridade</Label>
                        <Select value={priority && priority != props.priority ? priority : props.priority} onValueChange={(value: string) => setPriority(value)}>
                            <SelectTrigger className="w-[180px] text-white">
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
            </Card>
            <div className="flex flex-row gap-4 items-center justify-center">
                <div onClick={() => props.onDelete(props.id)} className="w-10 h-10 rounded-3xl flex items-center justify-center bg-sidebar-accent cursor-pointer">
                    <FaTrash color="#D66B6B" />
                </div>
                <div onClick={() => props.onPut(props.id, {
                    title: title && title != props.title ? title : props.title,
                    description: description && description != props.description ? description : props.description,
                    category: category && category != props.category ? category : props.category,
                    priority: priority && priority != props.priority ? priority : props.priority,
                    status: status && status != props.status ? status : props.status,
                    id: props.id,
                    refUser: props.refUser
                })} className="w-10 h-10 rounded-3xl flex items-center justify-center bg-sidebar-accent cursor-pointer">
                    <FaCheck color="#6B7FD6" />
                </div>
            </div>
        </div>
    )
}

export default TasksComponent