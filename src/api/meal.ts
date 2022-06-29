import { NEIS_API_BASE_URL } from "src/constant";
import { formatDate } from "src/utils";
import { IMeal, NeisAPIOptions, NeisAPIResponse } from "./types";

export const getMealBySchoolCode = async (
  officeDistrictCode: string,
  schoolCode: string,
  options?: NeisAPIOptions & {
    MLSV_YMD: string;
    MLSV_FROM_YMD: string;
    MLSV_TO_YMD: string;
  }
) => {
  const query = new URLSearchParams({
    KEY: options?.KEY || NEIS_API_KEY,
    Type: options?.Type || "json",
    pIndex: options?.pIndex || "1",
    pSize: options?.pSize || "1",
    ATPT_OFCDC_SC_CODE: officeDistrictCode,
    SD_SCHUL_CODE: schoolCode,

    MLSV_YMD:
      options?.MLSV_YMD ||
      formatDate(
        new Date().toLocaleString("en", { timeZone: "Asia/Seoul" }),
        true
      ),
    MLSV_FROM_YMD: options?.MLSV_FROM_YMD || "",
    MLSV_TO_YMD: options?.MLSV_TO_YMD || "",
  });

  const data: {
    mealServiceDietInfo: NeisAPIResponse<IMeal>;
  } = await fetch(`${NEIS_API_BASE_URL}/mealServiceDietInfo?${query}`, {}).then(
    (res) => res.json()
  );
  return data.mealServiceDietInfo[1].row;
};
