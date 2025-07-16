export const enum TypeTextAlert  {
    FAILED = "Erro!",
    SUCCESS = "Scuesso!"
}

export const enum TaskActivities {
    UPDATE = "Tarefa Atualizada com Sucesso!",
    DELETE = "Tarefa Removida"
}

export const enum LoginActivities {
    SUCCESS = "Usuário Logado!",
    EMAIL_NOT_FOUND = "Usário não encontrado com esse Email",
    PASSWORD_NOT_USER = "Senha não confere com Email digitado"
}

export const enum RegisterNewUser {
    EMAIL_EXISTS_USER = "Usário já encontrado com este Email",
    NEW_SUCCESS_USER = "Novo Usuário cadastrado com Sucesso"
}

export const enum ETypeStatus {
    PENDING = "Pendente",
    COMPLETED = "Concluído",
    IN_PROGRESS = "Em Progresso"
}

export const enum ETypeCategory {
    WORK = "Trabalho",
    GUYS = "Pessoal",
    STUDY = "Estudo",
    FINANCES = "Finanças",
    TASK_DOMESTIC = "Tarefas Domésticas",
    TRIP = "Viagem",
    OTHERS = "Outros"
}

export const enum ETypeUser {
    USER_NOT_FOUND = "Usuário não encontrado"
}

export const enum ETypeAuthenticate {
    AUTH = "autenticado"
}