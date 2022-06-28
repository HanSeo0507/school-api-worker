import { NEIS_API_BASE_URL } from "src/constant";
import { ISchool, NeisAPIOptions, NeisAPIResponse } from "./types";

export const getSchoolInfoByName = async (schoolName: string, options?: NeisAPIOptions) => {
	const query = new URLSearchParams({
		KEY: options?.KEY || NEIS_API_KEY,
		Type: options?.Type || "json",
		pIndex: options?.pIndex || "1",
		pSize: options?.pSize || "1",
		SCHUL_NM: schoolName,
	});

	const data: {
		schoolInfo: NeisAPIResponse<ISchool>;
	} = await fetch(`${NEIS_API_BASE_URL}/schoolInfo?` + query, {}).then((res) => res.json());
	return data.schoolInfo[1].row;
};
