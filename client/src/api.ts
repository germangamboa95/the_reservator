import axios, { AxiosInstance } from 'axios'




class Api {

    protected client: AxiosInstance;

    public constructor() {
        this.client = axios.create({
            baseURL: "http://localhost:3333/"
        })
    }

    public async login() {

        const { data } = await this.client.post("auth/login");

        this.client = axios.create({
            baseURL: "http://localhost:3333/",
            headers: {
                Authorization: `Bearer ${data.jwt}`,
            },
        });

    }

    public getReservations() {
        return this.client.get('reservations')
    }

    public createReservatgion(data: any) {
        return this.client.post('reservations', data)
    }

    public getAvailableTimes(date: string) {
        return this.client.get(`reservations/times?date=${date}`)
    }

    public getTimeBlocks() {
        return this.client.get('availabilities')
    }

    public createTimeBlocks(data: any) {
        return this.client.post('availabilities', data)
    }



}


export const api = new Api()