export type Action = {
    type: string,
    payload: any
}

export type InitialState = {
    preview: Boolean,
    time: Time,
}

export type Time = "before" | "during" | "after"