import api from "@/api/api"
import NavBard from "@/components/navbar"
import TasksComponent from "@/components/tasks"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TaskActivities, TypeTextAlert } from "@/enums/GenericData"
import Typography from "@mui/material/Typography"
import { Terminal } from "lucide-react"
import React from "react"
import { useEffect } from "react"

interface ITask {
    id: string,
    title: string,
    description: string,
    priority: string,
    category: string,
    status: string,
    refUser: string
}

const Tasks = () => {
    const [tasks, setTasks] = React.useState<ITask[]>()
    const [title, setTitle] = React.useState<string>('')
    const [priority, setPriority] = React.useState<string>('')
    const [status, setStatus] = React.useState<string>('')
    const [category, setCategory] = React.useState<string>('')
    const [alert, setAlert] = React.useState<boolean>(false);
    const [typeAlert, setTypeAlert] = React.useState<string>('');
    const [alertMsg, setAlertMsg] = React.useState<string>('');

    useEffect(() => {
        getListTaks()
    }, [])

    const getListTaks = async () => {
        const { data } = await api.get(`/tasks?refUser=a5fd`)
        if (data && data.length) setTasks(data)
    }

    const handleAddNewTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            await api.post(`/tasks`, {
                refUser: "a5fd",
                title: "",
                description: "",
                category: "",
                priority: "",
                status: ""
            })
        } catch (err: unknown) {
            if (typeof err == 'string')
                setAlertMsg(err)
            setAlert(true)
            setTypeAlert(TypeTextAlert.FAILED)
            timer()
        }
    }

    const handleDeleteTask = async (idTask: string) => {
        try {
            const { data } = await api.delete(`/tasks/${idTask}`)
            if (data) {
                setAlertMsg(TaskActivities.DELETE)
                setAlert(true)
                setTypeAlert(TypeTextAlert.SUCCESS)
                timer()
            }
        } catch (err: unknown) {
            if (typeof err == 'string')
                setAlertMsg(err)
            setAlert(true)
            setTypeAlert(TypeTextAlert.FAILED)
            timer()
        }
    }

    const handleUpdateTask = async (idTask: string, task: ITask) => {
        try {
            const { data } = await api.put(`/tasks/${idTask}`, task)

            if (data) {
                setAlertMsg(TaskActivities.UPDATE)
                setAlert(true)
                setTypeAlert(TypeTextAlert.SUCCESS)
                timer()
            }

        } catch (err: unknown) {
            if (typeof err == 'string')
                setAlertMsg(err)
            setAlert(true)
            setTypeAlert(TypeTextAlert.FAILED)
            timer()
        }
    }

    const applyFilterListTask = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const { data } = await api.get(`/tasks?title=${title}&priority=${priority}&category=${category}&status=${status}`);
            if (data && data.length >= 1) {
                setTasks(data)
            } else {
                setTasks(data)
            }
        } catch (err: unknown) {
            if (typeof err == 'string')
                setAlertMsg(err)
            setAlert(true)
            setTypeAlert(TypeTextAlert.FAILED)
            timer()
        }
    }

    const clearFilterListTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            setTitle('');
            setPriority('');
            setCategory('');
            setStatus('');

            getListTaks();
        } catch (err: unknown) {
            if (typeof err == 'string')
                setAlertMsg(err)
            setAlert(true)
            setTypeAlert(TypeTextAlert.FAILED)
            timer()
        }
    }

    const timer = () => {
        setTimeout(() => {
            setAlert(false);
        }, 3000)
    }

    return (
        <div className="w-full flex flex-row gap-5">
            <div className='flex flex-row'>
                <NavBard />
            </div>
            <div className="w-full h-screen mt-20 flex flex-col gap-2 pr-4 overflow-auto">
                <Typography variant="h5" className="text-white font-bold">Gerenciamento de Tarefas</Typography>
                <form onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => applyFilterListTask(e)} className="w-full flex flex-row gap-7 p-4 rounded-2xl flex-wrap items-center text-center">
                    <div className="flex flex-col items-start gap-2 flex-wrap">
                        <Label className="text-white" htmlFor="Titulo">Titulo</Label>
                        <Input className="text-white bg-sidebar-accent" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                    </div>
                    <div className="flex flex-col items-start gap-2 flex-wrap">
                        <Label className="text-white" htmlFor="Prioridade">Prioridade</Label>
                        <Select value={priority} onValueChange={(value: string) => setPriority(value)}>
                            <SelectTrigger className="w-[180px] text-white bg-sidebar-accent">
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
                    <div className="flex flex-col items-start gap-2 flex-wrap">
                        <Label className="text-white" htmlFor="Status">Status</Label>
                        <Select value={status} onValueChange={(value: string) => setStatus(value)}>
                            <SelectTrigger className="w-[180px] text-white bg-sidebar-accent">
                                <SelectValue placeholder="Selecione uma opçao" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Selecione</SelectLabel>
                                    <SelectItem value="Pendente">Pendente</SelectItem>
                                    <SelectItem value="Em Progresso">Em Progresso</SelectItem>
                                    <SelectItem value="Concluído">Concluído</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col items-start gap-2 flex-wrap">
                        <Label className="text-white" htmlFor="Categoria">Categoria</Label>
                        <Select value={category} onValueChange={(value: string) => setCategory(value)}>
                            <SelectTrigger className="w-[180px] text-white bg-sidebar-accent">
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
                    <div className="flex gap-3 flex-row-reverse items-center justify-center text-center flex-wrap-reverse">
                        <Button onClick={(e) => handleAddNewTask(e)} className="bg-sidebar-accent text-white hover:text-white cursor-pointer mt-5">Adicionar Nova Tarefa</Button>
                        <Button className="bg-sidebar-accent text-white mt-5 cursor-pointer hover:text-white" type="submit">Filtrar</Button>
                        <Button className="bg-sidebar-accent text-white mt-5 cursor-pointer hover:text-white" type="button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => clearFilterListTask(e)}>X</Button>
                    </div>
                </form>
                <div className="w-full flex flex-col gap-8 flex-wrap justify-start items-start">
                    
                    <div className="w-full flex flex-row gap-8 flex-wrap">
                        {
                            tasks && tasks.length ? (
                                tasks.map(task =>
                                    <TasksComponent
                                        id={task.id}
                                        key={task.id}
                                        title={task.title}
                                        description={task.description}
                                        category={task.category}
                                        refUser={task.refUser}
                                        status={task.status}
                                        priority={task.priority}
                                        onDelete={() => handleDeleteTask(task.id)}
                                        onPut={handleUpdateTask}
                                    />
                                )
                            ) : (
                                <Typography variant="h6" className="text-white">Você não tem nenhuma tarefa no momento</Typography>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center absolute bottom-5">
                {
                    alert ? (
                        <Alert className="max-w-2/12" variant={typeAlert == TypeTextAlert.FAILED ? 'destructive' : typeAlert == TypeTextAlert.SUCCESS ? 'default' : 'default'} >
                            <Terminal />
                            <AlertTitle>{typeAlert}</AlertTitle>
                            <AlertDescription>
                                {alertMsg}
                            </AlertDescription>
                        </Alert>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Tasks