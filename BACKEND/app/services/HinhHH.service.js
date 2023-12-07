const { ObjectId } = require("mongodb");

class HinhHHService {
	constructor(client) {
		this.HinhHH = client.db().collection("hinhhanghoa");
	}
	extractData(payload) {
		const HinhHH = {
			TenHinh: payload.TenHH,
			Url: payload.Url,
			MSHH: payload.MSHH,
		};
		// remove underfile fields
		Object.keys(HinhHH).forEach(
			(key) => HinhHH[key] === undefined && delete HinhHH[key]
		);
		return HinhHH;
	}
	async find(filter) {
		try {
			const cursor = await this.HinhHH.find(filter);
			return await cursor.toArray();
		} catch (error) {
			return null;
		}
	}
	async create(data) {
		const result = this.HinhHH.insertMany(data);
		return result;
	}
	async findAllByMSHHId(id) {
		try {
			const cursor = await this.HinhHH.find({
				MSHH: id
			});
			return await cursor.toArray();
		} catch (e) {
			return null;
		}
	}
	async findById(id) {
		return await this.HinhHH.findOne({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
	}
	async delete(id) {
		const result = await this.HinhHH.findOneAndDelete({
			_id: ObjectId.isValid(id) ? new ObjectId(id) : null,
		});
		return result;
	}
	async deleteAll(id) {
		const result = await this.HinhHH.deleteMany({
			MSHH: id,
		});
		return result;
	}
}

module.exports = HinhHHService;
