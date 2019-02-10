from graphene import Enum


class MutationTypes(Enum):
    CREATE = 'CREATE'
    UPDATE = 'UPDATE'
    DELETE = 'DELETE'


class SpecialMutationTypes(Enum):
    REGISTER = 'REGISTER'
    LOGIN = 'LOGIN'
    LOGOUT = 'LOGOUT'
