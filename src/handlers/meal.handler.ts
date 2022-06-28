import { Request } from "itty-router";
import { getMealBySchoolCode, getSchoolInfoByName } from "src/api";
import { HttpException } from "src/exceptions";

const getMeal = async (req: Request) => {
	if (!req.params || !req.params.schoolName) throw new HttpException(400, "잘못된 요청이에요");
	const schoolName = decodeURI(req.params.schoolName);

	try {
		const school = await getSchoolInfoByName(schoolName);
		if (school.length <= 0) throw new HttpException(404, "학교 정보를 찾는데 실패했어요");

		const mealInfo = await getMealBySchoolCode(school[0].ATPT_OFCDC_SC_CODE, school[0].SD_SCHUL_CODE);
		if (mealInfo.length <= 0) throw new HttpException(404, "급식 정보를 찾는데 실패했어요");
		const mealDate = mealInfo[0].MLSV_YMD;

		return new Response(
			JSON.stringify({
				school: mealInfo[0].SCHUL_NM,
				date: `${mealDate.slice(0, 4)}-${mealDate.slice(4, 6)}-${mealDate.slice(6, 8)}`,
				meal: mealInfo[0].DDISH_NM,
				mealSerialized: mealInfo[0].DDISH_NM.replaceAll(/\(([^)]+)\)/g, "").replaceAll(" <br/>", ", "),
			})
		);
	} catch (error) {
		if (error instanceof HttpException) throw error;
		throw new HttpException();
	}
};

export const mealHandlers = {
	getMeal,
};
