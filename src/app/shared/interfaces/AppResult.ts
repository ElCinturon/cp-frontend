export interface AppResult extends AppResultGeneric<any> { }

export interface AppResultGeneric<T> {
    success: Boolean,
    data?: T,
    error: any
}