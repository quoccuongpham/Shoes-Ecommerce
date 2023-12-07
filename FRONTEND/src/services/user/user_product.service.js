import createClient from "../api.service";
import axios from "axios";

class ProductService {
    constructor(baseUrl = "/api/users/hanghoa") {
        this.api = createClient(baseUrl);
    }

    async getAll() {
        return (await axios.get('http://localhost:3000/users/hanghoa')).data;
        // return (await this.api.get("/"));
    }

    async getDetail(id) {
        return (await axios.get(`http://localhost:3000/users/hanghoa/${id}`)).data;
    }

    // async create(data) {
    //     return (await this.api.post("/", data)).data;
    // }
    //
    // async deleteAll() {
    //     return (await this.api.delete("/")).data;
    // }
    //
    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
    //
    // async update(id, data) {
    //     return (await this.api.put(`/${id}`, data)).data;
    // }
    //
    // async delete(id) {
    //     return (await this.api.delete(`/${id}`)).data;
    // }
}

export default new ProductService();