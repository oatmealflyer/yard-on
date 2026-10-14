export const mockOrders = [
  {
    orderId: "ORD-001", // 접수번호: 접수마다 다른 고유한 값
    companyId: "1234567890", // 거래처 ID: mockUsers의 companyId와 연결
    companyName: "한빛물류", // 업체명
    containerNo: "HLBU1234567", // 컨테이너번호
    operationType: "반입", // 작업 구분: 반입 또는 반출
    inDate: "2026-10-12", // 야드 입고일
    inVehicleNo: "서울80가1234", // 입고 차량번호
    terminalAvailableDate: null, // 터미널 반입 가능일: 미정이면 null
    arrivalDate: null, // 선박 접안일
    outVehicleNo: null, // 반출 차량번호: 아직 없으면 null
    shippingLine: "HLC", // 선사코드
    bookingNo: "BOOK-001", // Booking 번호
    sealNo: "SEAL-001", // 컨테이너 봉인에 사용하는 씰 번호
    containerType: "40HC", // 컨테이너 타입
    weight: 18000, // 총중량: 이 예제에서는 kg 단위
    podCode: "USLAX", // 양하항(POD) 코드
    vesselVoyage: "MOCK STAR / 001E", // 선박명과 항차
    terminal: "부산신항", // 반입할 터미널
    yardStatus: "보관 중", // 현재 작업 상태
    exportSortNum: null, // 반출 예정 순번: 아직 없으면 null
    memo: "반입 후 보관", // 메모
    remarks: "", // 비고: 내용이 없으면 빈 문자열
  },
  {
    orderId: "ORD-002",
    companyId: "1234567890",
    companyName: "한빛물류",
    containerNo: "MSCU2345678",
    operationType: "반출",
    inDate: "2026-10-11",
    inVehicleNo: "부산80나2345",
    terminalAvailableDate: "2026-10-16",
    arrivalDate: "2026-10-18",
    outVehicleNo: "부산81다3456",
    shippingLine: "MSC",
    bookingNo: "BOOK-002",
    sealNo: "SEAL-002",
    containerType: "20GP",
    weight: 12000,
    podCode: "SGSIN",
    vesselVoyage: "MOCK OCEAN / 002W",
    terminal: "부산신항",
    yardStatus: "반출 예정",
    exportSortNum: 1,
    memo: "배차 완료",
    remarks: "",
  },
  {
    orderId: "ORD-003",
    companyId: "0987654321",
    companyName: "바다운송",
    containerNo: "MAEU3456789",
    operationType: "반입",
    inDate: "2026-10-13",
    inVehicleNo: "인천80라4567",
    terminalAvailableDate: null,
    arrivalDate: null,
    outVehicleNo: null,
    shippingLine: "MAE",
    bookingNo: "BOOK-003",
    sealNo: "SEAL-003",
    containerType: "40HC",
    weight: 21000,
    podCode: "NLRTM",
    vesselVoyage: "MOCK BLUE / 003E",
    terminal: "인천터미널",
    yardStatus: "반입 완료",
    exportSortNum: null,
    memo: "",
    remarks: "외관 확인 완료",
  },
  {
    orderId: "ORD-004",
    companyId: "0987654321",
    companyName: "바다운송",
    containerNo: "COSU4567890",
    operationType: "반출",
    inDate: "2026-10-09",
    inVehicleNo: "인천81마5678",
    terminalAvailableDate: "2026-10-12",
    arrivalDate: "2026-10-14",
    outVehicleNo: "인천82바6789",
    shippingLine: "COS",
    bookingNo: "BOOK-004",
    sealNo: "SEAL-004",
    containerType: "20GP",
    weight: 15000,
    podCode: "CNSHA",
    vesselVoyage: "MOCK GREEN / 004W",
    terminal: "인천터미널",
    yardStatus: "반출 완료",
    exportSortNum: null,
    memo: "반출 작업 완료",
    remarks: "",
  },
];