import api from "@/api/api"
import BarCharComponent from "@/components/chartBar"
import NavBard from "@/components/navbar"
import PieChartComponent from "@/components/pieChart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ETypeCategory, ETypeErrorServer, ETypeStatus, TypeTextAlert } from "@/enums/GenericData"
import type { ITaskList } from "@/models/interfaces/ITask"
import { getStorage } from "@/services/storage"
import Typography from "@mui/material/Typography"
import { Terminal } from "lucide-react"
import React, { useCallback } from "react"
import { useEffect } from "react"

const DashBoard = () => {
    const [taskListStatus, setTaskListStatus] = React.useState<ITaskList[]>([]);
    const [taskListCategory, setTaskListCategory] = React.useState<ITaskList[]>([]);
    const [totalTaskPending, setTotalTaskPending] = React.useState<number>(0);
    const [totalTaskCompleted, setTotalTaskCompleted] = React.useState<number>(0);
    const [alert, setAlert] = React.useState<boolean>(false);
    const [typeAlert, setTypeAlert] = React.useState<string>('');
    const [alertMsg, setAlertMsg] = React.useState<string>('');

    const getTasksToStatus = useCallback(async () => {
        try {
            const idUser = getStorage("user")

            let totalTaskPending: number = 0;
            let totalTaskCompleted: number = 0;
            let totalTaskInProgress: number = 0;

            const dataPending = await api.get(`/tasks?refUser=${idUser}&status=${ETypeStatus.PENDING}`)
            if (dataPending && dataPending.data && dataPending.data.length >= 1) totalTaskPending = dataPending.data.length

            const dataProgress = await api.get(`/tasks?refUser=${idUser}&status=${ETypeStatus.IN_PROGRESS}`)
            if (dataProgress && dataProgress.data && dataProgress.data.length >= 1) totalTaskInProgress = dataProgress.data.length

            const dataCompleted = await api.get(`/tasks?refUser=${idUser}&status=${ETypeStatus.COMPLETED}`)
            if (dataCompleted && dataCompleted.data && dataCompleted.data.length >= 1) totalTaskCompleted = dataCompleted.data.length

            setTaskListStatus([
                { fieldname: ETypeStatus.PENDING, total: totalTaskPending, fill: 'var(--color-chart-2)' },
                { fieldname: ETypeStatus.IN_PROGRESS, total: totalTaskInProgress, fill: 'var(--color-chart-1)' },
                { fieldname: ETypeStatus.COMPLETED, total: totalTaskCompleted, fill: 'var(--color-chart-6)' }
            ])

            setTotalTaskCompleted(totalTaskCompleted)
            setTotalTaskPending(totalTaskPending)
        } catch (err) {
            setAlertMsg(`${err + ETypeErrorServer.ERROR_SERVER}`)
            setAlert(true)
            setTypeAlert(TypeTextAlert.FAILED)
            timer()
        }
    }, [setTotalTaskPending, setTotalTaskCompleted, setTaskListStatus, setAlert, setAlertMsg, setTypeAlert])

    const getTasksToCategory = useCallback(async () => {
        try {
            const idUser = getStorage("user")

            let totalTaskWork: number = 0;
            let totalTaskTrip: number = 0;
            let totalTaskDomestic: number = 0;
            let totalTaskStudy: number = 0;
            let totalTaskOthers: number = 0;
            let totalTaskGuys: number = 0;
            let totalTaskFinances: number = 0;

            const dataWork = await api.get(`/tasks?refUser=${idUser}&category=${ETypeCategory.WORK}`)
            if (dataWork && dataWork.data && dataWork.data.length >= 1) totalTaskWork = dataWork.data.length

            const dataTrip = await api.get(`/tasks?refUser=${idUser}&category=${ETypeCategory.TRIP}`)
            if (dataTrip && dataTrip.data && dataTrip.data.length >= 1) totalTaskTrip = dataTrip.data.length

            const dataDomestic = await api.get(`/tasks?refUser=${idUser}&category=${ETypeCategory.TASK_DOMESTIC}`)
            if (dataDomestic && dataDomestic.data && dataDomestic.data.length >= 1) totalTaskDomestic = dataDomestic.data.length

            const dataStudy = await api.get(`/tasks?refUser=${idUser}&category=${ETypeCategory.STUDY}`)
            if (dataStudy && dataStudy.data && dataStudy.data.length >= 1) totalTaskStudy = dataStudy.data.length

            const dataOthers = await api.get(`/tasks?refUser=${idUser}&category=${ETypeCategory.OTHERS}`)
            if (dataOthers && dataOthers.data && dataOthers.data.length >= 1) totalTaskOthers = dataOthers.data.length

            const dataGuys = await api.get(`/tasks?refUser=${idUser}&category=${ETypeCategory.GUYS}`)
            if (dataGuys && dataGuys.data && dataGuys.data.length >= 1) totalTaskGuys = dataGuys.data.length

            const dataFinances = await api.get(`/tasks?refUser=${idUser}&category=${ETypeCategory.FINANCES}`)
            if (dataFinances && dataFinances.data && dataFinances.data.length >= 1) totalTaskFinances = dataFinances.data.length

            setTaskListCategory([
                { fieldname: ETypeCategory.WORK, total: totalTaskWork, fill: 'var(--color-chart-1)' },
                { fieldname: ETypeCategory.TRIP, total: totalTaskTrip, fill: 'var(--color-chart-2)' },
                { fieldname: ETypeCategory.TASK_DOMESTIC, total: totalTaskDomestic, fill: 'var(--color-chart-3)' },
                { fieldname: ETypeCategory.STUDY, total: totalTaskStudy, fill: 'var(--color-chart-4)' },
                { fieldname: ETypeCategory.OTHERS, total: totalTaskOthers, fill: 'var(--color-chart-5)' },
                { fieldname: ETypeCategory.GUYS, total: totalTaskGuys, fill: 'var(--color-chart-6)' },
                { fieldname: ETypeCategory.FINANCES, total: totalTaskFinances, fill: 'var(--color-chart-7)' },
            ])
        } catch (err) {
            setAlertMsg(`${err + ETypeErrorServer.ERROR_SERVER}`)
            setAlert(true)
            setTypeAlert(TypeTextAlert.FAILED)
            timer()
        }
    }, [setTaskListCategory, setAlert, setAlertMsg, setTypeAlert])

    const timer = () => {
        setTimeout(() => {
            setAlert(false);
        }, 5000)
    }

    useEffect(() => {
        getTasksToStatus()
        getTasksToCategory()
    }, [totalTaskCompleted, totalTaskPending, getTasksToStatus, getTasksToCategory])

    return (
        <div className="w-full flex flex-row gap-5">
            <div className='flex flex-row'>
                <NavBard />
            </div>
            <div className="w-full mt-20 flex flex-col gap-2 pr-4 overflow-hidden">
                <div className="w-full">
                    <Typography variant="h5" className="text-white font-bold">Dashboard Analítico</Typography>
                </div>
                <div className="w-full flex flex-col gap-20 flex-wrap">
                    <BarCharComponent title="Tarefas por Status" list={taskListStatus} listKeyName="fieldname" keyBarName="total" description="Grafico com analise de Tarefas por Status" />
                    <div className="w-full flex flex-row justify-center items-center flex-wrap gap-20">
                        <PieChartComponent title="Tarefas por Categoria" list={taskListCategory} listKeyName="fieldname" keyBarName="total" description="Grafico com analise de Tarefas por Categoria" />
                        <Card className="w-full min-w-52 max-w-1/5 flex flex-col items-center justify-center text-center">
                            <CardHeader className="w-full h-full flex flex-col items-center gap-5">
                                <CardTitle className="text-white">Contador de Tarefas Concluidas</CardTitle>
                                <Typography className="text-white" style={{ fontSize: '50px' }}>{totalTaskCompleted}</Typography>
                            </CardHeader>
                        </Card>
                        <Card className="w-full min-w-52 max-w-1/5 flex flex-col">
                            <CardHeader className="w-full text-center flex flex-col items-center gap-5">
                                <CardTitle className="text-white">Contador de Tarefas Pendentes</CardTitle>
                                <Typography className="text-white" style={{ fontSize: '50px' }}>{totalTaskPending}</Typography>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center absolute bottom-5">
                {
                    alert ? (
                        <Alert className="max-w-2/12" variant={typeAlert == TypeTextAlert.FAILED ? 'destructive' : 'default'} >
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

export default DashBoard