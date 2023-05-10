export enum Paggination{
    count = 3
}

export enum difficultyLevel{
    "easy" = 1,
    "medium" = 2,
    "hard" = 3
}


export enum status{
    pending = 1,
    active = 2,
    inactive = 3,
    rejected = 4,
    in_review = 5,
    unknown = 6
}

export const roles = {
    ADMIN : 1,
    MODERATOR : 2,
    USER : 3
}

export const rolesInString = {
    ADMIN : 'admin',
    MODERATOR : 'moderator',
    USER : 'user'
}


export const adminData = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: "12345",
        username : 'admin123',
        role: roles.ADMIN
    }
]

export const moderatorData = [
    {
        name: "moderator",
        email: "moderator@gmail.com",
        password: "12345",
        username : "moderator123",
        role: roles.MODERATOR
    }
]

export const roleData = [
    {
        _id: roles.ADMIN,
        name: "admin"
    },
    {
        _id: roles.MODERATOR,
        name: "moderator"
    },
    {
        _id: roles.USER,
        name: "user"
    }
]