class ApiRes<T = unknown> {
    status: number;
    success: boolean;
    message: string;
    data?: T;

    constructor(status = 404, success = false, message = "", data?: T) {
        this.status = status;
        this.success = success;
        this.message = message;
        if (data) {
            this.data = data;
        }
    }
}

export default ApiRes;