export const RouterEnum = {
    MAIN: '/',
}

export type RouterEnum = typeof RouterEnum[keyof typeof RouterEnum]