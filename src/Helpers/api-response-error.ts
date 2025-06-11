import { EnumErrorCode } from "../Enum/ErrorEnum";
import { ResponseErrorAPI } from "../Interface/ResponseErrorAPI";

export async function handleApiError(response: Response): Promise<void> {
  if (response.ok) return;

  let apiMessage = "Lỗi không xác định";

  try {
    const json = await response.json();

    apiMessage = json.message || JSON.stringify(json);
  } catch {
    apiMessage = await response.text();
  }

  let customMessage = "";

  switch (response.status) {
    // case 200:
    //   customMessage = "Hợp lệ.";
    case 400:
      customMessage = "Yêu cầu không hợp lệ. Vui lòng kiểm tra dữ liệu.";
      break;
    case 401:
      customMessage = "Chưa đăng nhập hoặc token đã hết hạn.";
      break;
    case 403:
      customMessage = "Bạn không có quyền truy cập."; //
      break;
    case 404:
      customMessage = "Không tìm thấy tài nguyên.";
      break;
    case 500:
      customMessage = "Lỗi máy chủ. Vui lòng thử lại sau.";
      break;
    case 504:
      customMessage = "Yêu cầu quá thời gian xử lý(timeout).";
      break;
    default:
      customMessage = `Lỗi không xác định (status ${response.status})`;
  }

  var rs = new ResponseErrorAPI(); // extend error

  (rs.statusCode = response.status),
    (rs.apiErrorMessage = apiMessage),
    (rs.message = customMessage);

  return Promise.reject(rs);
}

export function mapErrorToResponseError(error: unknown) {
  const rs = new ResponseErrorAPI();

  if (error instanceof TypeError) {
    rs.statusCode = EnumErrorCode.FetchError;
    rs.apiErrorMessage = error.message;
    rs.message =
      "Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng.";

    return rs;
  }

  if (error instanceof SyntaxError) {
    rs.statusCode = EnumErrorCode.AsJsonError;
    rs.apiErrorMessage = error.message;
    rs.message = "Lỗi phản hồi không hợp lệ. Vui lòng thông báo quản trị viên.";

    return rs;
  }

  // Nếu đã là ResponseErrorAPI thì ném lại
  if (error instanceof ResponseErrorAPI) {
    return error;
  }

  // Trường hợp lỗi khác không xác định
  rs.statusCode = EnumErrorCode.Unknown;
  rs.apiErrorMessage = error instanceof Error ? error.message : "Unknown error";
  rs.message = "Lỗi không xác định. Vui lòng thử lại hoặc báo quản trị viên.";

  return Promise.reject(rs);
}
